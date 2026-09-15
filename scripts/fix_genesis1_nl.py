#!/usr/bin/env python3
"""
Re-translate Genesis 1 in Dutch with the current archaic SYSTEM prompt,
then directly fix the 6 "evening and morning" verses with the correct
Statenvertaling rendering.

Usage:
  python scripts/fix_genesis1_nl.py
"""
import os, sys, time
from pathlib import Path
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
load_dotenv(ROOT / ".env.local")

import anthropic
from supabase import create_client

sb     = create_client(os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])
claude = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

# Import the SYSTEM prompt from the main translate script
sys.path.insert(0, str(ROOT / "scripts"))
from translate_nl import SYSTEM, translate_batch

# ── Corrected evening/morning phrases ─────────────────────────────────────────
EVENING_MORNING = {
    5:  "En Elohim noemde het licht dag en de duisternis noemde Hij nacht. "
        "En toen werd het avond, en het werd ochtend, de eerste dag.",
    8:  "En Elohim noemde het uitspansel shamayim. "
        "En toen werd het avond, en het werd ochtend, de tweede dag.",
    13: "En toen werd het avond, en het werd ochtend, de derde dag.",
    19: "En toen werd het avond, en het werd ochtend, de vierde dag.",
    23: "En toen werd het avond, en het werd ochtend, de vijfde dag.",
    31: "En Elohim zag alles wat Hij gemaakt had, en zie, het was zeer goed. "
        "En toen werd het avond, en het werd ochtend, de zesde dag.",
}

# ── Fetch Genesis 1 verses ─────────────────────────────────────────────────────
book = sb.table("books").select("id").eq("slug", "bereshit").single().execute().data
book_id = book["id"]

ch = sb.table("chapters").select("id").eq("book_id", book_id).eq("number", 1).single().execute().data
ch_id = ch["id"]

verses = (
    sb.table("verses")
    .select("id, verse_number, text")
    .eq("chapter_id", ch_id)
    .order("verse_number")
    .execute()
    .data
)
print(f"Genesis 1: {len(verses)} verses")

# ── Translate all of Genesis 1 with current SYSTEM prompt ─────────────────────
pairs   = [(v["verse_number"], v["text"]) for v in verses]
BATCH   = 40
rows    = []

for i in range(0, len(pairs), BATCH):
    chunk  = pairs[i:i+BATCH]
    vslice = verses[i:i+BATCH]
    translated = translate_batch(chunk)
    for v, tr in zip(vslice, translated):
        text = EVENING_MORNING.get(v["verse_number"], tr)  # override the 6 special verses
        if text:
            rows.append({"verse_id": v["id"], "locale": "nl", "text": text})
    time.sleep(1)

# ── Upsert ────────────────────────────────────────────────────────────────────
sb.table("translations").upsert(rows, on_conflict="verse_id,locale").execute()
print(f"Done — {len(rows)} Dutch verses upserted for Genesis 1")
print("Fixed evening/morning verses:", list(EVENING_MORNING.keys()))
