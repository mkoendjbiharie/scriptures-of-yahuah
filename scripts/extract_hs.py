"""
extract_hs.py — Hallelujah Scriptures PDF Extractor v3
=======================================================
Two-pass extraction:
  Pass 1: scan every page's running header (top-left or top-right) to build
          a book→page-range index.
  Pass 2: for each book's page range, extract verse text and detect chapters
          from verse-number resets.

Usage:
    python scripts/extract_hs.py
Output: scriptures/extracted/main_scripture.json
"""

import json, re, os, sys, unicodedata
try:
    import fitz
except ImportError:
    sys.exit("Install PyMuPDF: pip install pymupdf")

PDF = os.path.join(os.path.dirname(__file__), "..", "scriptures",
                   "7c0334dc-32e9-9315-6626-68db18d67dc7.pdf")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "scriptures", "extracted")
OUT     = os.path.join(OUT_DIR, "main_scripture.json")

# ── Book lookup table ─────────────────────────────────────────────────────────
# Maps ANY header text (English or Hebrew, with diacritics stripped) →
# (slug, hebrew_name, english_name, testament, order)
BOOKS = [
    # slug              hebrew              english            t    order  headers (normalised, no diacritics)
    ("bereshit",  "Bereshit",   "Genesis",         "old",  1,  ["BERESHIT","GENESIS"]),
    ("shemoth",   "Shemoth",    "Exodus",          "old",  2,  ["SHEMOTH","EXODUS"]),
    ("wayyiqra",  "Wayyiqra",   "Leviticus",       "old",  3,  ["WAYYIQRA","LEVITICUS"]),
    ("bemidbar",  "Bemidbar",   "Numbers",         "old",  4,  ["BEMIDBAR","NUMBERS"]),
    ("devarim",   "Devarim",    "Deuteronomy",     "old",  5,  ["DEBARIN","DEBARIM","DEUTERONOMY"]),
    ("yahusha",   "Yahusha",    "Joshua",          "old",  6,  ["YAHOSHUA","JOSHUA"]),
    ("shophetim", "Shophetim",  "Judges",          "old",  7,  ["SHOPHETIM","JUDGES"]),
    ("ruth",      "Ruth",       "Ruth",            "old",  8,  ["RUTH"]),
    ("shemuel-a", "Shemuel A",  "1 Samuel",        "old",  9,  ["SHEMUEL 1","1 SAMUEL"]),
    ("shemuel-b", "Shemuel B",  "2 Samuel",        "old", 10,  ["SHEMUEL 2","2 SAMUEL"]),
    ("melakim-a", "Melakim A",  "1 Kings",         "old", 11,  ["MELAKIM 1","1 KINGS"]),
    ("melakim-b", "Melakim B",  "2 Kings",         "old", 12,  ["MELAKIM 2","2 KINGS"]),
    ("dibre-a",   "Dibre A",    "1 Chronicles",    "old", 13,  ["DIBRE","1 CHRONICLES"]),
    ("dibre-b",   "Dibre B",    "2 Chronicles",    "old", 14,  ["DIBREY HA YAMIM 2","2 CHRONICLES"]),
    ("ezra",      "Ezra",       "Ezra",            "old", 15,  ["EZRA"]),
    ("nehemyah",  "Nehemyah",   "Nehemiah",        "old", 16,  ["NEHEMYAH","NEHEMIAH"]),
    ("hadassah",  "Hadassah",   "Esther",          "old", 17,  ["HADASSAH","ESTHER"]),
    ("iyob",      "Iyob",       "Job",             "old", 18,  ["IYOB","JOB"]),
    ("tehillim",  "Tehillim",   "Psalms",          "old", 19,  ["TEHILLIM","PSALMS"]),
    ("mishle",    "Mishle",     "Proverbs",        "old", 20,  ["MISHLEY","PROVERBS"]),
    ("qoheleth",  "Qoheleth",   "Ecclesiastes",    "old", 21,  ["QOHELETH","ECCLESIASTES"]),
    ("shir",      "Shir HaShirim","Song of Songs", "old", 22,  ["SHIR HA SHIRIM","SONG OF SONGS"]),
    ("yeshayahu", "Yeshayahu",  "Isaiah",          "old", 23,  ["YESHAYAHU","ISAIAH"]),
    ("yirmeyahu", "Yirmeyahu",  "Jeremiah",        "old", 24,  ["YIRMEYAHU","JEREMIAH"]),
    ("eikah",     "Eikah",      "Lamentations",    "old", 25,  ["EYKHAH","EIKAH","LAMENTATIONS"]),
    ("yehezqel",  "Yehezqel",   "Ezekiel",         "old", 26,  ["YEHEZQEL","EZEKIEL"]),
    ("daniel",    "Daniel",     "Daniel",          "old", 27,  ["DANIEL","DANIYEL"]),
    ("hoshua",    "Hoshua",     "Hosea",           "old", 28,  ["HOSHEA","HOSEA"]),
    ("yoel",      "Yoel",       "Joel",            "old", 29,  ["YOEL","JOEL"]),
    ("amos",      "Amos",       "Amos",            "old", 30,  ["AMOS"]),
    ("obadyah",   "Obadyah",    "Obadiah",         "old", 31,  ["OBADYAH","OBADIAH"]),
    ("yunah",     "Yunah",      "Jonah",           "old", 32,  ["YONAH","JONAH"]),
    ("mikah",     "Mikah",      "Micah",           "old", 33,  ["MIKAH","MICAH"]),
    ("nachum",    "Nachum",     "Nahum",           "old", 34,  ["NAHUM","NACHUM"]),
    ("habaqquq",  "Habaqquq",   "Habakkuk",        "old", 35,  ["HABAQQUQ","HABAKKUK"]),
    ("tsephanyah","Tsephanyah", "Zephaniah",       "old", 36,  ["TSEPHANYAH","ZEPHANIAH"]),
    ("chaggai",   "Chaggai",    "Haggai",          "old", 37,  ["HAGGAI","CHAGGAI"]),
    ("zekaryah",  "Zekaryah",   "Zechariah",       "old", 38,  ["ZEKARYAH","ZECHARIAH"]),
    ("malaki",    "Malaki",     "Malachi",         "old", 39,  ["MALAKI","MALACHI"]),
    ("mattithyahu","Mattithyahu","Matthew",         "new",  1,  ["MATTIHYAHU","MATTITHYAHU","MATTHEW"]),
    ("marqus",    "Marqus",     "Mark",            "new",  2,  ["MARQOS","MARK"]),
    ("luqas",     "Luqas",      "Luke",            "new",  3,  ["LUQAS","LUKE"]),
    ("yahuchanan","Yahuchanan", "John",             "new",  4,  ["YOHANAN","JOHN"]),
    ("acts",      "Ma'aseh",    "Acts",            "new",  5,  ["MA ASEH","ACTS"]),
    ("romans",    "Romans",     "Romans",          "new",  6,  ["ROMANS"]),
    ("qorintiyim-a","Qorintiyim A","1 Corinthians","new",  7,  ["QORIN TIYIM 1","1 CORINTHIANS"]),
    ("qorintiyim-b","Qorintiyim B","2 Corinthians","new",  8,  ["QORIN TIYIM 2","2 CORINTHIANS"]),
    ("galatiyim", "Galatiyim",  "Galatians",       "new",  9,  ["GALATIYIM","GALATIANS"]),
    ("ephesiym",  "Ephesiym",   "Ephesians",       "new", 10,  ["EPH SIYM","EPHESIANS"]),
    ("pilippiym", "Pilippiym",  "Philippians",     "new", 11,  ["PILIPPIYM","PHILIPPIANS"]),
    ("qolasim",   "Qolasim",    "Colossians",      "new", 12,  ["QOLASIM","COLOSSIANS"]),
    ("tess-a",    "Tas'loniqim A","1 Thessalonians","new",13,  ["TAS LONIQIM 1","1 THESSALONIANS"]),
    ("tess-b",    "Tas'loniqim B","2 Thessalonians","new",14,  ["TAS LONIQIM 2","2 THESSALONIANS","2 THESSALONAINS"]),
    ("timothy-a", "Timotiyos A","1 Timothy",       "new", 15,  ["TIMOTIYOS 1","1 TIMOTHY"]),
    ("timothy-b", "Timotiyos B","2 Timothy",       "new", 16,  ["TIMOTIYOS 2","2 TIMOTHY"]),
    ("titos",     "Titos",      "Titus",           "new", 17,  ["TITOS","TITUS"]),
    ("philemon",  "Philemon",   "Philemon",        "new", 18,  ["PHILEMON"]),
    ("ibrim",     "Ibrim",      "Hebrews",         "new", 19,  ["IBRIM","HEBREWS"]),
    ("yaaqob",    "Ya'aqob",    "James",           "new", 20,  ["YA AQOB","JAMES"]),
    ("kepha-a",   "Kepha A",    "1 Peter",         "new", 21,  ["KEPHA 1","1 PETER"]),
    ("kepha-b",   "Kepha B",    "2 Peter",         "new", 22,  ["KEPHA 2","2 PETER"]),
    ("yohanan-a", "Yohanan A",  "1 John",          "new", 23,  ["YOHANAN 1","1 JOHN"]),
    ("yohanan-b", "Yohanan B",  "2 John",          "new", 24,  ["YOHANAN 2","2 JOHN"]),
    ("yohanan-c", "Yohanan C",  "3 John",          "new", 25,  ["YOHANAN 3","3 JOHN"]),
    ("yahudah",   "Yahudah",    "Jude",            "new", 26,  ["YAHUDAH","JUDE"]),
    ("hazon",     "Hazon",      "Revelation",      "new", 27,  ["HAZON","REVELATION"]),
]

def norm(s: str) -> str:
    """Strip diacritics, uppercase, collapse spaces."""
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[''ʾʿ]", " ", s)
    return re.sub(r"\s+", " ", s).upper().strip()

# Build lookup: normalised header → book entry
HEADER_LOOKUP: dict[str, tuple] = {}
for entry in BOOKS:
    slug, heb, eng, testament, order, headers = entry
    for h in headers:
        HEADER_LOOKUP[norm(h)] = entry

HAS_HEBREW = re.compile(r"[\u0590-\u05FF\uFB1D-\uFB4F]")
NUM_LINE   = re.compile(r"^(\d{1,3})(.*)")

# ── Pass 1: build page → book index ──────────────────────────────────────────

def get_page_header(page: fitz.Page) -> str | None:
    """Return the book-header text found in top strip of page, or None."""
    blocks = page.get_text("blocks")
    candidates = []
    for b in blocks:
        x0, y0 = b[0], b[1]
        text = b[4].strip().replace("\n", " ").strip()
        if not text or y0 > 55:
            continue
        if HAS_HEBREW.search(text):
            continue
        # Left header (x<110) or right header (x>280) or centred (110-280)
        if y0 < 55 and len(text) < 60:
            candidates.append((x0, text))
    if not candidates:
        return None
    # Prefer right-side (Hebrew transliteration) over left (English)
    candidates.sort(key=lambda c: -c[0])
    for _, text in candidates:
        n = norm(text)
        if n in HEADER_LOOKUP:
            return n
    return None


def build_book_index(doc: fitz.Document, start_page=7) -> list[tuple]:
    """Returns sorted list of (page_idx, book_entry), one entry per book."""
    index: list[tuple] = []
    prev_slug = None
    for i in range(start_page, doc.page_count):
        h = get_page_header(doc[i])
        if h:
            entry = HEADER_LOOKUP[h]
            slug = entry[0]
            if slug != prev_slug:
                index.append((i, entry))
                prev_slug = slug
                print(f"  p{i+1:4d} → {entry[2]} ({entry[1]})")
    return index


# ── Pass 2: extract verses from a page range ──────────────────────────────────

def is_skip(line: str, x0: float, y0: float, page_h: float) -> bool:
    if not line:
        return True
    if HAS_HEBREW.search(line):
        return True
    # NOTE: no y0 < 50 guard — page headers (JEREMIAH etc.) are at x0=374+,
    # already excluded by the 60<=x0<=140 filter. Dropping y0<50 lets us
    # capture chapter headings and verses at y0≈47-48 (top of right pages).
    if y0 > page_h - 45 and x0 < 90:
        return True   # page number
    # Paleo Hebrew lines like "tYvARB" — all printable ASCII, no spaces, odd chars
    if re.fullmatch(r"[A-Za-zÀ-ɏ'\"]{3,}", line) and x0 < 160 and x0 > 80:
        return True
    return False


def extract_book_pages(doc: fitz.Document, start_pg: int, end_pg: int) -> list[dict]:
    """Extract chapters+verses from doc pages [start_pg, end_pg).

    Key insight for Psalms (and similar books):
      The PDF embeds each Psalm heading as "N title_text" at the end of the last
      verse of the PREVIOUS Psalm (same block).  After the chapter break fires,
      "title_text" could be either:
        (A) The actual verse-1 content  (Genesis: "2 Thus the heavens …")
        (B) A superscription/title      (Psalm 4: "4 To the chief singer …")
            followed immediately by a separate "1 \nActual verse text" block.
      We DEFER adding rest as verse 1 (store in `pending_v1`).  When the next
      numbered line arrives:
        - num == 1  →  pending_v1 was a title; discard it, process "1" normally.
        - num  > 1  →  pending_v1 WAS verse 1; commit it, then process current num.
      Continuation lines (non-digit) that arrive while pending_v1 is set are
      appended to pending_v1 (e.g. the heading wraps across blocks).
    """
    chapters: list[dict] = []
    cur_chapter = 0
    cur_verses: list[dict] = []
    last_vnum = 0
    pending_chapter: int | None = None   # standalone chapter-number heading
    pending_v1: str | None = None        # deferred verse-1 / heading text
    # (e) Ambiguous: num == cur_chapter+1 == last_vnum+1 and rest is non-empty.
    # Could be either:
    #   • verse (ch+1) within the current chapter  — revealed by next num > amb_num
    #   • chapter (ch+1) heading + verse-1 text    — revealed by next num < amb_num
    # We defer the decision until the next numbered line arrives.
    ambiguous: tuple[int, str] | None = None   # (num, accumulated_text)

    def flush():
        nonlocal pending_v1, ambiguous
        if ambiguous is not None:
            # Book ended while ambiguous was pending — treat as verse
            amb_num, amb_text = ambiguous
            if amb_text:
                cur_verses.append({"verse": amb_num, "text": amb_text})
            ambiguous = None
        if cur_chapter > 0:
            if pending_v1 is not None and not cur_verses:
                cur_verses.append({"verse": 1, "text": pending_v1})
            pending_v1 = None
            if cur_verses:
                chapters.append({"chapter": cur_chapter, "verses": list(cur_verses)})

    def fire_chapter_break(new_ch: int, v1_text: str | None):
        """Flush current chapter and start a new one, deferring v1 text."""
        nonlocal cur_chapter, cur_verses, last_vnum, pending_chapter, pending_v1
        if pending_v1 is not None:
            cur_verses.append({"verse": 1, "text": pending_v1})
            pending_v1 = None
        flush()
        cur_chapter = new_ch
        cur_verses = []
        last_vnum = 0
        pending_chapter = None
        pending_v1 = v1_text if v1_text else None

    for pg_i in range(start_pg, end_pg):
        page = doc[pg_i]
        page_h = page.rect.height
        blocks = page.get_text("blocks")

        for block in blocks:
            x0, y0 = block[0], block[1]
            raw = block[4]
            lines = raw.splitlines()

            for line in lines:
                line = line.strip()
                # Strip embedded Hebrew letter-markers (acrostic Psalm verse markers etc.).
                # Purely-Hebrew lines become empty and are dropped by is_skip below.
                line = re.sub(r"[֐-׿יִ-ﭏ]", "", line).strip()
                if is_skip(line, x0, y0, page_h):
                    continue

                if not (60 <= x0 <= 140):
                    continue

                m = NUM_LINE.match(line)
                if m:
                    num = int(m.group(1))
                    rest_raw = m.group(2)
                    rest = rest_raw.lstrip()

                    if cur_chapter == 0:
                        cur_chapter = 1
                        last_vnum = 0

                    # ── Resolve ambiguous (e) ──────────────────────────────────
                    if ambiguous is not None:
                        amb_num, amb_text = ambiguous
                        ambiguous = None
                        if num < amb_num:
                            # Next line went BACKWARD → ambiguous was a chapter heading.
                            fire_chapter_break(amb_num, amb_text)
                            # Now resolve pending_v1 with the current num:
                        else:
                            # Sequential → ambiguous was a normal verse.
                            if amb_text:
                                cur_verses.append({"verse": amb_num, "text": amb_text})
                            else:
                                cur_verses.append({"verse": amb_num, "text": ""})
                            last_vnum = amb_num
                            # Fall through to process current num normally.

                    # ── Resolve pending_v1 ─────────────────────────────────────
                    if pending_v1 is not None:
                        if num == 1:
                            pending_v1 = None   # title — discard
                        else:
                            cur_verses.append({"verse": 1, "text": pending_v1})
                            last_vnum = 1
                            pending_v1 = None

                    # ── Chapter-break detection ────────────────────────────────
                    # (a) Backwards: num ≤ last_vnum
                    # (b) No-space concat: "17And it came to be…"
                    # (c) Verse-1 reset: "1 text" while last_vnum > 1
                    # (d) Sequential chapter with number gap:
                    #     num == ch+1, has text, num != lv+1 (gap > 1)
                    # (e) Deferred ambiguous: num == ch+1 == lv+1 with text
                    #     (handled above + deferred to next iteration)
                    no_space = bool(rest_raw) and rest_raw[0] not in (' ', '\t', '\n')
                    is_chapter_break = (
                        (num <= last_vnum and num >= 1)                           # (a)
                        or (no_space and rest and num == cur_chapter + 1
                            and last_vnum >= 1)                                   # (b)
                        or (num == 1 and rest and last_vnum > 1)                  # (c)
                        or (num == cur_chapter + 1 and rest                       # (d)
                            and num != last_vnum + 1 and last_vnum >= 1)
                    )
                    is_ambiguous = (
                        not is_chapter_break
                        and num == cur_chapter + 1
                        and num == last_vnum + 1
                        and bool(rest)
                        and last_vnum >= 1
                    )

                    if is_chapter_break:
                        fire_chapter_break(
                            pending_chapter if pending_chapter is not None else num,
                            rest or None
                        )
                    elif is_ambiguous:
                        # Defer: could be verse (ch+1) or chapter (ch+1) heading.
                        ambiguous = (num, rest)
                    elif not rest and num > last_vnum + 1 and num > cur_chapter:
                        pending_chapter = num
                    else:
                        last_vnum = num
                        pending_chapter = None
                        if rest:
                            cur_verses.append({"verse": num, "text": rest})
                        else:
                            cur_verses.append({"verse": num, "text": ""})
                else:
                    # Continuation line
                    if ambiguous is not None and line:
                        ambiguous = (ambiguous[0], ambiguous[1] + " " + line)
                    elif pending_chapter is not None and line:
                        # Text following a bare chapter-number line: this is verse 1 of the
                        # new chapter. Fire the break now so the title text goes to pending_v1.
                        fire_chapter_break(pending_chapter, line)
                    elif cur_verses and line:
                        cur_verses[-1]["text"] += " " + line
                    elif pending_v1 is not None and line:
                        pending_v1 += " " + line

    flush()
    return chapters


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    if not os.path.exists(PDF):
        sys.exit(f"PDF not found: {PDF}")

    print(f"Opening PDF ({os.path.getsize(PDF)//1_000_000}MB)…")
    doc = fitz.open(PDF)
    total_pages = doc.page_count
    print(f"Pages: {total_pages}\n")

    print("Pass 1 — building book index…")
    index = build_book_index(doc, start_page=7)
    print(f"\nFound {len(index)} books\n")

    results: list[dict] = []
    print("Pass 2 — extracting verses…")
    for i, (start_pg, entry) in enumerate(index):
        slug, heb, eng, testament, order, _ = entry
        end_pg = index[i + 1][0] if i + 1 < len(index) else total_pages
        print(f"  [{i+1:2d}/{len(index)}] {eng:20s}  pages {start_pg+1}–{end_pg}", end="", flush=True)

        chapters = extract_book_pages(doc, start_pg, end_pg)
        total_v = sum(len(c["verses"]) for c in chapters)
        print(f"  → {len(chapters)} ch, {total_v} v")

        for ch in chapters:
            results.append({
                "book":      heb,
                "book_en":   eng,
                "slug":      slug,
                "testament": testament,
                "order":     order,
                "chapter":   ch["chapter"],
                "verses":    ch["verses"],
            })

    doc.close()

    # ── Stats ──
    book_stats: dict[str, dict] = {}
    for r in results:
        s = r["slug"]
        if s not in book_stats:
            book_stats[s] = {"name": r["book_en"], "chapters": 0, "verses": 0}
        book_stats[s]["chapters"] += 1
        book_stats[s]["verses"]   += len(r["verses"])

    print(f"\n{'='*55}")
    print(f"Total: {len(results)} chapters across {len(book_stats)} books")
    print(f"{'='*55}")
    for slug, st in book_stats.items():
        flag = ""
        if st["verses"] == 0: flag = " ⚠ NO VERSES"
        print(f"  {st['name']:25s}  {st['chapters']:3d} ch  {st['verses']:5d} v{flag}")

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\nSaved → {OUT}  ({os.path.getsize(OUT)//1000} KB)")


if __name__ == "__main__":
    main()
