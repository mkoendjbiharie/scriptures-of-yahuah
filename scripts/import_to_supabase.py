#!/usr/bin/env python3
"""
Import extracted scripture JSON into Supabase.

Usage:
  pip install supabase python-dotenv --break-system-packages
  python scripts/import_to_supabase.py

Reads: scriptures/extracted/main_scripture.json
Writes: Supabase tables — books (upsert), chapters, verses
"""

import json
import os
import sys
from pathlib import Path
from collections import defaultdict
from dotenv import load_dotenv

# ── Load credentials ──────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
load_dotenv(ROOT / ".env.local")

URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not URL or not KEY:
    sys.exit(
        "ERROR: Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY "
        "(or NEXT_PUBLIC_SUPABASE_ANON_KEY) in .env.local"
    )

from supabase import create_client, Client
sb: Client = create_client(URL, KEY)

# ── Slug mapping: extraction slug → schema slug ────────────────────────────────
SLUG_MAP = {
    "devarim":   "debarim",
    "daniel":    "daniyel",
    "hadassah":  "ester",
    "ephesiym":  "ephesiyim",
    "pilippiym": "pilippiyim",
}

# ── Book list (slug, name_en, name_original, testament, order) ────────────────
BOOKS = [
    ("bereshit",    "Genesis",         "Bereshit",          "old", 1),
    ("shemoth",     "Exodus",          "Shemoth",           "old", 2),
    ("wayyiqra",    "Leviticus",       "Wayyiqra",          "old", 3),
    ("bemidbar",    "Numbers",         "Bemidbar",          "old", 4),
    ("debarim",     "Deuteronomy",     "Debarim",           "old", 5),
    ("yahusha",     "Joshua",          "Yahusha",           "old", 6),
    ("shophetim",   "Judges",          "Shophetim",         "old", 7),
    ("ruth",        "Ruth",            "Ruth",              "old", 8),
    ("shemuel-a",   "1 Samuel",        "Shemuel A",         "old", 9),
    ("shemuel-b",   "2 Samuel",        "Shemuel B",         "old", 10),
    ("melakim-a",   "1 Kings",         "Melakim A",         "old", 11),
    ("melakim-b",   "2 Kings",         "Melakim B",         "old", 12),
    ("dibre-a",     "1 Chronicles",    "Dibre HaYamim A",   "old", 13),
    ("dibre-b",     "2 Chronicles",    "Dibre HaYamim B",   "old", 14),
    ("ezra",        "Ezra",            "Ezra",              "old", 15),
    ("nehemyah",    "Nehemiah",        "Nehemyah",          "old", 16),
    ("ester",       "Esther",          "Hadassah",          "old", 17),
    ("iyob",        "Job",             "Iyob",              "old", 18),
    ("tehillim",    "Psalms",          "Tehillim",          "old", 19),
    ("mishle",      "Proverbs",        "Mishle",            "old", 20),
    ("qoheleth",    "Ecclesiastes",    "Qoheleth",          "old", 21),
    ("shir",        "Song of Songs",   "Shir HaShirim",     "old", 22),
    ("yeshayahu",   "Isaiah",          "YeshaYahu",         "old", 23),
    ("yirmeyahu",   "Jeremiah",        "YirmeYahu",         "old", 24),
    ("eikah",       "Lamentations",    "Eikah",             "old", 25),
    ("yehezqel",    "Ezekiel",         "Yehezqel",          "old", 26),
    ("daniyel",     "Daniel",          "Daniyel",           "old", 27),
    ("hoshua",      "Hosea",           "Hoshua",            "old", 28),
    ("yoel",        "Joel",            "Yoel",              "old", 29),
    ("amos",        "Amos",            "Amos",              "old", 30),
    ("obadyah",     "Obadiah",         "Obadyah",           "old", 31),
    ("yunah",       "Jonah",           "Yunah",             "old", 32),
    ("mikah",       "Micah",           "Mikah",             "old", 33),
    ("nachum",      "Nahum",           "Nachum",            "old", 34),
    ("habaqquq",    "Habakkuk",        "Habaqquq",          "old", 35),
    ("tsephanyah",  "Zephaniah",       "Tsephanyah",        "old", 36),
    ("chaggai",     "Haggai",          "Chaggai",           "old", 37),
    ("zekaryah",    "Zechariah",       "ZekarYah",          "old", 38),
    ("malaki",      "Malachi",         "Malaki",            "old", 39),
    ("mattithyahu", "Matthew",         "MattithYahu",       "new", 40),
    ("marqus",      "Mark",            "Marqus",            "new", 41),
    ("luqas",       "Luke",            "Luqas",             "new", 42),
    ("yahuchanan",  "John",            "Yahuchanan",        "new", 43),
    ("acts",        "Acts",            "Ma'aseh",           "new", 44),
    ("romans",      "Romans",          "Romans",            "new", 45),
    ("qorintiyim-a","1 Corinthians",   "Qorintiyim A",      "new", 46),
    ("qorintiyim-b","2 Corinthians",   "Qorintiyim B",      "new", 47),
    ("galatiyim",   "Galatians",       "Galatiyim",         "new", 48),
    ("ephesiyim",   "Ephesians",       "Ephesiyim",         "new", 49),
    ("pilippiyim",  "Philippians",     "Pilippiyim",        "new", 50),
    ("qolasim",     "Colossians",      "Qolasim",           "new", 51),
    ("tess-a",      "1 Thessalonians", "Tess A",            "new", 52),
    ("tess-b",      "2 Thessalonians", "Tess B",            "new", 53),
    ("timothy-a",   "1 Timothy",       "Timothy A",         "new", 54),
    ("timothy-b",   "2 Timothy",       "Timothy B",         "new", 55),
    ("titos",       "Titus",           "Titos",             "new", 56),
    ("philemon",    "Philemon",        "Philemon",          "new", 57),
    ("ibrim",       "Hebrews",         "Ibrim",             "new", 58),
    ("yaaqob",      "James",           "Yaaqob",            "new", 59),
    ("kepha-a",     "1 Peter",         "Kepha A",           "new", 60),
    ("kepha-b",     "2 Peter",         "Kepha B",           "new", 61),
    ("yohanan-a",   "1 John",          "Yohanan A",         "new", 62),
    ("yohanan-b",   "2 John",          "Yohanan B",         "new", 63),
    ("yohanan-c",   "3 John",          "Yohanan C",         "new", 64),
    ("yahudah",     "Jude",            "Yahudah",           "new", 65),
    ("hazon",       "Revelation",      "Hazon",             "new", 66),
]

# ── Load extracted data ────────────────────────────────────────────────────────
JSON_PATH = ROOT / "scriptures" / "extracted" / "main_scripture.json"
if not JSON_PATH.exists():
    sys.exit(f"ERROR: {JSON_PATH} not found. Run scripts/extract_hs.py first.")

print(f"Loading {JSON_PATH} ...")
raw = json.loads(JSON_PATH.read_text(encoding="utf-8"))

chapters_by_slug: dict[str, list] = defaultdict(list)
for rec in raw:
    slug = SLUG_MAP.get(rec["slug"], rec["slug"])
    chapters_by_slug[slug].append(rec)

# ── Deduplicate chapters per book ────────────────────────────────────────────
# Keep only the first occurrence of each chapter number per book.
# For hazon (Revelation) cap at ch22 — the HS PDF has measurement appendices
# after Rev 22:21 that re-use chapter numbers (ch1, ch2, ch6, ch60, ch50 …).
for _slug in list(chapters_by_slug.keys()):
    _seen = set()
    _filtered = []
    _cap = 22 if _slug == 'hazon' else 9999
    for _ch in chapters_by_slug[_slug]:
        _cn = _ch['chapter']
        if _cn > _cap:
            continue
        if _cn not in _seen:
            _seen.add(_cn)
            _filtered.append(_ch)
    chapters_by_slug[_slug] = _filtered

# ── 1. Upsert books ───────────────────────────────────────────────────────────
print("\n1/3  Upserting books ...")
book_rows = []
for (slug, name_en, name_original, testament, order) in BOOKS:
    ch_count = len(chapters_by_slug.get(slug, []))
    book_rows.append({
        "slug":          slug,
        "name_en":       name_en,
        "name_original": name_original,
        "testament":     testament,
        "chapter_count": ch_count,
        "order":         order,
    })

sb.table("books").upsert(book_rows, on_conflict="slug").execute()

res = sb.table("books").select("id, slug").execute()
book_id: dict[str, int] = {r["slug"]: r["id"] for r in res.data}
print(f"   {len(book_id)} books upserted")

# ── 2. Clear old chapters (cascades to verses) ────────────────────────────────
print("2/3  Clearing old chapters/verses ...")
for slug, bid in book_id.items():
    sb.table("chapters").delete().eq("book_id", bid).execute()
print("   Done")

# ── 3. Insert chapters + verses ───────────────────────────────────────────────
CHAPTER_BATCH = 10
VERSE_BATCH   = 500

print("3/3  Inserting chapters and verses ...")
total_ch = 0
total_v  = 0

for (slug, *_) in BOOKS:
    chs = chapters_by_slug.get(slug, [])
    if not chs:
        print(f"   SKIP  {slug} (no extracted data)")
        continue

    bid = book_id.get(slug)
    if bid is None:
        print(f"   SKIP  {slug} (not in DB)")
        continue

    # Insert chapters
    ch_rows = [{"book_id": bid, "number": ch["chapter"]} for ch in chs]
    for i in range(0, len(ch_rows), CHAPTER_BATCH):
        sb.table("chapters").insert(ch_rows[i:i+CHAPTER_BATCH]).execute()

    # Fetch chapter id map
    res = sb.table("chapters").select("id, number").eq("book_id", bid).execute()
    ch_id: dict[int, int] = {r["number"]: r["id"] for r in res.data}

    # Insert verses
    verse_rows = []
    for ch in chs:
        cid = ch_id.get(ch["chapter"])
        if cid is None:
            continue
        for v in ch["verses"]:
            vnum = v["verse"]
            text = v["text"].strip()
            if not text:
                continue
            verse_rows.append({
                "chapter_id":   cid,
                "book_id":      bid,
                "verse_number": vnum,
                "text":         text,
            })

    for i in range(0, len(verse_rows), VERSE_BATCH):
        sb.table("verses").insert(verse_rows[i:i+VERSE_BATCH]).execute()

    total_ch += len(chs)
    total_v  += len(verse_rows)
    print(f"   OK  {slug:22s}  {len(chs):3d} ch  {len(verse_rows):5d} v")

print(f"\nImport complete: {total_ch} chapters, {total_v} verses.")
