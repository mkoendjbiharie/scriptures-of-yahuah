"""
extract_pdf.py — Hallelujah Scriptures PDF Extractor
=====================================================
Extracts structured scripture text from Hallelujah Scriptures PDFs
and outputs JSON ready for import into Supabase.

Usage:
    pip install pymupdf
    python scripts/extract_pdf.py --pdf path/to/scriptures.pdf --out output.json

The output JSON has this shape:
[
  {
    "book": "Bereshit",
    "book_en": "Genesis",
    "slug": "bereshit",
    "chapter": 1,
    "verses": [
      { "verse": 1, "text": "In the beginning Elohim created..." },
      ...
    ]
  },
  ...
]

After extraction, import to Supabase with import_to_supabase.py
"""

import argparse
import json
import re
import sys

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Install PyMuPDF first:  pip install pymupdf")
    sys.exit(1)


# ── Patterns ──────────────────────────────────────────────────────────────────

# Matches chapter headings like "CHAPTER 1" or "Chapter 1"
CHAPTER_PATTERN = re.compile(r'chapter\s+(\d+)', re.IGNORECASE)

# Matches verse numbers at the start of a line, e.g. "1 ", "12 "
VERSE_PATTERN = re.compile(r'^(\d{1,3})\s+(.+)')

# Book headings — typically all-caps, centred; adjust per PDF layout
BOOK_PATTERN = re.compile(
    r'^(BERESHIT|SHEMOTH|WAYYIQRA|BEMIDBAR|DEBARIM|'
    r'YAHUSHA|SHOPHETIM|RUTH|SHEMUEL|MELAKIM|DIBRE|'
    r'EZRA|NEHEMYAH|ESTER|IYOB|TEHILLIM|MISHLE|'
    r'QOHELETH|SHIR|YESHAYAHU|YIRMEYAHU|EIKAH|'
    r'YEHEZQEL|DANIYEL|HOSHUA|YOEL|AMOS|OBADYAH|'
    r'YUNAH|MIKAH|NACHUM|HABAQQUQ|TSEPHANYAH|'
    r'CHAGGAI|ZEKARYAH|MALAKI|MATTITHYAHU|MARQUS|'
    r'LUQAS|YAHUCHANAN|MA\'ASEH|ROMANS|QORINTIYIM|'
    r'GALATIYIM|EPHESIYIM|PILIPPIYIM|QOLASIM|TESS|'
    r'TIMOTHY|TITOS|PHILEMON|IBRIM|YAAQOB|KEPHA|'
    r'YOHANAN|YAHUDAH|HAZON)\b',
    re.IGNORECASE
)

# ── Slug map ─────────────────────────────────────────────────────────────────

SLUG_MAP: dict[str, str] = {
    'BERESHIT': 'bereshit', 'SHEMOTH': 'shemoth', 'WAYYIQRA': 'wayyiqra',
    'BEMIDBAR': 'bemidbar', 'DEBARIM': 'debarim', 'YAHUSHA': 'yahusha',
    'SHOPHETIM': 'shophetim', 'RUTH': 'ruth',
    'SHEMUEL A': 'shemuel-a', 'SHEMUEL B': 'shemuel-b',
    'MELAKIM A': 'melakim-a', 'MELAKIM B': 'melakim-b',
    'DIBRE HAYAMIM A': 'dibre-a', 'DIBRE HAYAMIM B': 'dibre-b',
    'EZRA': 'ezra', 'NEHEMYAH': 'nehemyah', 'ESTER': 'ester',
    'IYOB': 'iyob', 'TEHILLIM': 'tehillim', 'MISHLE': 'mishle',
    'QOHELETH': 'qoheleth', 'SHIR HASHIRIM': 'shir',
    'YESHAYAHU': 'yeshayahu', 'YIRMEYAHU': 'yirmeyahu', 'EIKAH': 'eikah',
    'YEHEZQEL': 'yehezqel', 'DANIYEL': 'daniyel', 'HOSHUA': 'hoshua',
    'YOEL': 'yoel', 'AMOS': 'amos', 'OBADYAH': 'obadyah',
    'YUNAH': 'yunah', 'MIKAH': 'mikah', 'NACHUM': 'nachum',
    'HABAQQUQ': 'habaqquq', 'TSEPHANYAH': 'tsephanyah',
    'CHAGGAI': 'chaggai', 'ZEKARYAH': 'zekaryah', 'MALAKI': 'malaki',
    'MATTITHYAHU': 'mattithyahu', 'MARQUS': 'marqus', 'LUQAS': 'luqas',
    'YAHUCHANAN': 'yahuchanan', "MA'ASEH": 'acts', 'ROMANS': 'romans',
    'QORINTIYIM A': 'qorintiyim-a', 'QORINTIYIM B': 'qorintiyim-b',
    'GALATIYIM': 'galatiyim', 'EPHESIYIM': 'ephesiyim',
    'PILIPPIYIM': 'pilippiyim', 'QOLASIM': 'qolasim',
    'TESS A': 'tess-a', 'TESS B': 'tess-b',
    'TIMOTHY A': 'timothy-a', 'TIMOTHY B': 'timothy-b',
    'TITOS': 'titos', 'PHILEMON': 'philemon', 'IBRIM': 'ibrim',
    'YAAQOB': 'yaaqob', 'KEPHA A': 'kepha-a', 'KEPHA B': 'kepha-b',
    'YOHANAN A': 'yohanan-a', 'YOHANAN B': 'yohanan-b',
    'YOHANAN C': 'yohanan-c', 'YAHUDAH': 'yahudah', 'HAZON': 'hazon',
}

# ── Extraction ────────────────────────────────────────────────────────────────

def extract(pdf_path: str) -> list[dict]:
    doc = fitz.open(pdf_path)
    results: list[dict] = []
    current_book: str | None = None
    current_chapter: int | None = None
    current_verses: list[dict] = []

    def flush():
        if current_book and current_chapter and current_verses:
            results.append({
                "book": current_book,
                "slug": SLUG_MAP.get(current_book.upper(), current_book.lower()),
                "chapter": current_chapter,
                "verses": list(current_verses),
            })

    for page in doc:
        blocks = page.get_text("blocks")  # list of (x0, y0, x1, y1, text, ...)
        for block in blocks:
            raw = block[4].strip()
            if not raw:
                continue

            lines = raw.splitlines()
            for line in lines:
                line = line.strip()
                if not line:
                    continue

                # Detect book heading
                book_match = BOOK_PATTERN.match(line)
                if book_match and len(line) < 40:
                    flush()
                    current_book = line.upper()
                    current_chapter = None
                    current_verses = []
                    continue

                # Detect chapter heading
                chap_match = CHAPTER_PATTERN.search(line)
                if chap_match:
                    flush()
                    current_chapter = int(chap_match.group(1))
                    current_verses = []
                    continue

                # Detect verse
                verse_match = VERSE_PATTERN.match(line)
                if verse_match and current_chapter:
                    verse_num = int(verse_match.group(1))
                    verse_text = verse_match.group(2).strip()
                    if current_verses and current_verses[-1]['verse'] == verse_num:
                        # Continuation of previous verse (line wrap)
                        current_verses[-1]['text'] += ' ' + verse_text
                    else:
                        current_verses.append({
                            "verse": verse_num,
                            "text": verse_text,
                        })
                elif current_verses:
                    # Continuation line — append to last verse
                    current_verses[-1]['text'] += ' ' + line

    flush()
    doc.close()
    return results


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='Extract Hallelujah Scriptures PDF to JSON')
    parser.add_argument('--pdf', required=True, help='Path to the PDF file')
    parser.add_argument('--out', default='scriptures.json', help='Output JSON file')
    args = parser.parse_args()

    print(f"Extracting {args.pdf} …")
    data = extract(args.pdf)
    print(f"Extracted {len(data)} chapter(s)")

    with open(args.out, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Saved to {args.out}")


if __name__ == '__main__':
    main()
