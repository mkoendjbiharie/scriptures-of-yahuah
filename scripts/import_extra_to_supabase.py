#!/usr/bin/env python3
"""
Import extra-canonical books (Hanok, Yashar, Yobelim, etc.) into Supabase.

Run AFTER:
  1. Running add_extra_testament.sql in Supabase SQL Editor
  2. Running scripts/extract_extra.py

Usage:
  python scripts/import_extra_to_supabase.py
"""
import json, os, sys
from pathlib import Path
from collections import defaultdict
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
load_dotenv(ROOT / ".env.local")

URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
if not URL or not KEY:
    sys.exit("ERROR: Set Supabase credentials in .env.local")

from supabase import create_client
sb = create_client(URL, KEY)

JSON_PATH = ROOT / "scriptures" / "extracted" / "extra_books.json"
if not JSON_PATH.exists():
    sys.exit(f"ERROR: {JSON_PATH} not found. Run scripts/extract_extra.py first.")

print(f"Loading {JSON_PATH} …")
raw = json.loads(JSON_PATH.read_text(encoding="utf-8"))

# Group by slug, preserving order
chapters_by_slug = defaultdict(list)
meta_by_slug     = {}
for rec in raw:
    slug = rec["slug"]
    chapters_by_slug[slug].append(rec)
    meta_by_slug[slug] = (rec["book_en"], rec["book_original"], rec["order"])

# ── 1. Upsert books ──────────────────────────────────────────────────────────
print("\n1/3  Upserting extra-canonical books …")
book_rows = []
for slug, (name_en, name_original, order) in meta_by_slug.items():
    book_rows.append({
        "slug":          slug,
        "name_en":       name_en,
        "name_original": name_original,
        "testament":     "extra",
        "chapter_count": len(chapters_by_slug[slug]),
        "order":         order,
    })

sb.table("books").upsert(book_rows, on_conflict="slug").execute()

res = sb.table("books").select("id, slug").execute()
book_id = {r["slug"]: r["id"] for r in res.data}
print(f"   {len(meta_by_slug)} extra books upserted")

# ── 2. Clear existing data ───────────────────────────────────────────────────
print("2/3  Clearing old chapters/verses for extra books …")
for slug in meta_by_slug:
    bid = book_id.get(slug)
    if bid:
        sb.table("chapters").delete().eq("book_id", bid).execute()
print("   Done")

# ── 3. Insert chapters + verses ───────────────────────────────────────────────
CHAPTER_BATCH = 10
VERSE_BATCH   = 500

print("3/3  Inserting chapters and verses …")
total_ch = 0
total_v  = 0

for slug in meta_by_slug:
    chs = chapters_by_slug[slug]
    bid = book_id.get(slug)
    if not bid:
        print(f"   SKIP {slug} (not in DB)")
        continue

    # Insert chapters
    ch_rows = [{"book_id": bid, "number": ch["chapter"]} for ch in chs]
    for i in range(0, len(ch_rows), CHAPTER_BATCH):
        sb.table("chapters").upsert(ch_rows[i:i+CHAPTER_BATCH], on_conflict="book_id,number").execute()

    # Fetch chapter id map
    res = sb.table("chapters").select("id, number").eq("book_id", bid).execute()
    ch_id = {r["number"]: r["id"] for r in res.data}

    # Insert verses
    verse_rows = []
    for ch in chs:
        cid = ch_id.get(ch["chapter"])
        if not cid:
            continue
        for v in ch["verses"]:
            text = v["text"].strip()
            if not text:
                continue
            verse_rows.append({
                "chapter_id":   cid,
                "book_id":      bid,
                "verse_number": v["verse"],
                "text":         text,
            })

    for i in range(0, len(verse_rows), VERSE_BATCH):
        sb.table("verses").upsert(verse_rows[i:i+VERSE_BATCH], on_conflict="chapter_id,verse_number").execute()

    total_ch += len(chs)
    total_v  += len(verse_rows)
    print(f"   OK  {slug:25s}  {len(chs):3d} ch  {len(verse_rows):5d} v")

print(f"\nImport complete: {total_ch} chapters, {total_v} verses.")
