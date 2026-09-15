#!/usr/bin/env python3
"""Quick check: print verses from a specific book/chapter in Supabase."""
import os, sys
from pathlib import Path
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
load_dotenv(ROOT / ".env.local")

from supabase import create_client
sb = create_client(os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])

slug = sys.argv[1] if len(sys.argv) > 1 else "hazon"
chapter = int(sys.argv[2]) if len(sys.argv) > 2 else 1

book = sb.table("books").select("id, name_en").eq("slug", slug).single().execute().data
ch = sb.table("chapters").select("id").eq("book_id", book["id"]).eq("number", chapter).single().execute().data
verses = sb.table("verses").select("verse_number, text").eq("chapter_id", ch["id"]).order("verse_number").execute().data

print(f"\n{book['name_en']} chapter {chapter} — {len(verses)} verses in DB\n")
for v in verses:
    print(f"  v{v['verse_number']:2d}: {v['text'][:100]}")
