#!/usr/bin/env python3
"""Diagnose what is actually stored in the DB for the problematic verses."""
import os, sys
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / ".env.local")
from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

book  = sb.table("books").select("id").eq("slug", "testament-reuben").single().execute()
ch    = sb.table("chapters").select("id").eq("book_id", book.data["id"]).eq("number", 1).single().execute()
rows  = sb.table("verses").select("verse_number,text") \
          .eq("chapter_id", ch.data["id"]) \
          .in_("verse_number", [7, 8, 9]) \
          .execute()

print("=== DIAGNOSTIC ===")
for v in rows.data:
    t = v["text"]
    print(f"\nVerse {v['verse_number']}:")
    print(f"  has literal backslash-u : {chr(92)+'u10909' in t}")
    print(f"  has paleo-hebrew 𐤉      : {'𐤉' in t}")
    print(f"  repr() of first 120 chars:")
    print(f"  {repr(t[:120])}")
