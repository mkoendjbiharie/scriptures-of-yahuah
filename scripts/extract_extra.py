#!/usr/bin/env python3
"""
Extract extra-canonical books from the Matmonim collection (1758-page PDF).
Output: scriptures/extracted/extra_books.json
"""
import fitz, json, re, os
from pathlib import Path
from collections import defaultdict

FOLDER = Path("/sessions/friendly-magical-mccarthy/mnt/scriptures/scriptures/")
OUT    = FOLDER / "extracted" / "extra_books.json"

def find(prefix):
    for f in os.listdir(FOLDER):
        if f.startswith(prefix): return str(FOLDER / f)

MAT_PDF = find("53abf287")  # 1758-page Matmonim
print(f"Opening {MAT_PDF}")
mat = fitz.open(MAT_PDF)

# ── Book definitions: (slug, name_en, name_original, testament_order, page_start, page_end)
# Pages are 1-indexed (as in Matmonim)
EXTRA_BOOKS = [
    # Adam and Hawwah
    ("adam-hawwah-a",    "1 Adam and Hawwah",         "1 Aḏam and Ḥawwah",        67,   5,   95),
    ("adam-hawwah-b",    "2 Adam and Hawwah",         "2 Aḏam and Ḥawwah",        68,  96,  131),
    # Hanok / Enoch
    ("hanok",            "Enoch",                     "Ḥanoḵ",                    69, 133,  238),
    # Writings
    ("writings-abraham", "Writings of Abraham",       "Writings of Aḇraham",      70, 239,  336),
    ("writings-eliyahu", "Writings of Eliyahu",       "Writings of Ĕliyahu",      71, 337,  353),
    # Testaments of the 12 Patriarchs
    ("testament-reuben",   "Testament of Reuben",     "Re'uḇĕn",                  72, 354,  359),
    ("testament-simeon",   "Testament of Simeon",     "Shim'on",                  73, 360,  364),
    ("testament-levi",     "Testament of Levi",       "Lĕwi",                     74, 365,  377),
    ("testament-judah",    "Testament of Judah",      "Yahuḏah T",                75, 378,  391),
    ("testament-dan",      "Testament of Dan",        "Dan",                      76, 392,  396),
    ("testament-naphtali", "Testament of Naphtali",   "Naphtali",                 77, 397,  402),
    ("testament-gad",      "Testament of Gad",        "Gaḏ",                      78, 403,  407),
    ("testament-asher",    "Testament of Asher",      "Ashĕr",                    79, 408,  412),
    ("testament-issachar", "Testament of Issachar",   "Yissaḵar",                 80, 413,  417),
    ("testament-zebulun",  "Testament of Zebulun",    "Zeḇulun",                  81, 418,  423),
    ("testament-joseph",   "Testament of Joseph",     "Yosĕph",                   82, 424,  435),
    ("testament-benjamin", "Testament of Benjamin",   "Binyamin",                 83, 436,  442),
    # Yobelim / Jubilees
    ("yobelim",          "Jubilees",                  "Yoḇelim",                  84, 443,  588),
    # Yashar / Jasher
    ("yashar",           "Jasher",                    "Yashar",                   85, 589, 1056),
    # Additions to Psalms
    ("tehillim-add",     "Additions to Psalms",       "Tehillim Additions",       86,1057, 1066),
    # Wisdom / Sirach
    ("hakmah",           "Wisdom of Solomon",         "Ḥaḵmah",                  87,1067, 1107),
    ("sira",             "Sirach",                    "Sira",                     88,1108, 1218),
    # Historical / deuterocanonical
    ("yahudith",         "Judith",                    "Yahuḏith",                 89,1219, 1254),
    ("tobiyah",          "Tobit",                     "Toḇiyah",                  90,1255, 1275),
    ("baruk",            "Baruch",                    "Baruḵ",                    91,1276, 1288),
    ("letter-yirmeyahu", "Letter of Jeremiah",        "Letter of Yirmeyahu",      92,1289, 1294),
    ("prayer-menashsheh","Prayer of Manasseh",        "Menashsheh",               93,1295, 1296),
    ("prayer-azaryah",   "Prayer of Azariah",         "Azaryah",                  94,1297, 1301),
    ("bel-dragon",       "Bel and the Dragon",        "Bel and the Dragon",       95,1303, 1305),
    ("shoshannah",       "Susanna",                   "Shoshannah",               96,1306, 1310),
    ("hadassah-add",     "Additions to Esther",       "Haḏassah Additions",       97,1311, 1319),
    ("ezra-a",           "1 Esdras",                  "1 Ezra",                   98,1320, 1357),
    ("ezra-b",           "2 Esdras",                  "2 Ezra",                   99,1358, 1427),
    ("maqqabim-a",       "1 Maccabees",               "Maqqaḇim 1",              100,1428, 1508),
    ("maqqabim-b",       "2 Maccabees",               "Maqqaḇim 2",              101,1509, 1564),
]

NUM_RE = re.compile(r'^(\d{1,3})\s*(.*)', re.DOTALL)

def extract_book(slug, page_start, page_end):
    """Extract chapters/verses from a page range of the Matmonim PDF."""
    results  = []
    chapter  = 1
    last_vnum = 0
    cur_verses = []

    def flush():
        if cur_verses:
            results.append({"chapter": chapter, "verses": list(cur_verses)})

    for pg_idx in range(page_start - 1, page_end):  # convert to 0-indexed
        if pg_idx >= len(mat):
            break
        page = mat[pg_idx]
        blocks = page.get_text("blocks")

        for b in sorted(blocks, key=lambda x: x[1]):  # sort by y
            x0, y0, x1, y1 = b[0], b[1], b[2], b[3]
            raw = b[4].strip()
            if not raw:
                continue

            # Skip page numbers (bottom of page, small single number)
            if y0 > 680 and re.fullmatch(r'\d{1,4}', raw):
                continue
            # Skip running headers (near top, short)
            if y0 < 55 and len(raw) < 30:
                continue

            # Split block into lines and process each
            lines = [l.strip() for l in raw.splitlines() if l.strip()]
            for line in lines:
                m = NUM_RE.match(line)
                if not m:
                    # Continuation of previous verse
                    if cur_verses:
                        cur_verses[-1]['text'] += ' ' + line
                    continue

                num  = int(m.group(1))
                rest = m.group(2).strip()

                if num <= last_vnum and num >= 1:
                    # Chapter break
                    flush()
                    cur_verses = []
                    chapter += 1
                    last_vnum = 0

                last_vnum = num
                cur_verses.append({"verse": num, "text": rest})

    flush()
    return results


# ── Run extraction ─────────────────────────────────────────────────────────────
all_results = []

for (slug, name_en, name_original, order, p_start, p_end) in EXTRA_BOOKS:
    print(f"  Extracting {slug:25s} (pp {p_start:4d}–{p_end:4d}) ...", end=' ', flush=True)
    chapters = extract_book(slug, p_start, p_end)
    total_v  = sum(len(c['verses']) for c in chapters)

    for ch in chapters:
        all_results.append({
            "slug":         slug,
            "book_en":      name_en,
            "book_original":name_original,
            "testament":    "extra",
            "order":        order,
            "chapter":      ch["chapter"],
            "verses":       ch["verses"],
        })
    print(f"{len(chapters):3d} ch  {total_v:5d} v")

OUT.parent.mkdir(exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    json.dump(all_results, f, ensure_ascii=False, indent=2)

print(f"\nSaved {len(all_results)} chapter records → {OUT}")
