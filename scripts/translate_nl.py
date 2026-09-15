#!/usr/bin/env python3
"""
Translate scripture verses to Dutch using the Anthropic API.
Preserves all restored Hebrew names exactly.

Usage:
  pip install anthropic supabase python-dotenv --break-system-packages
  python scripts/translate_nl.py --book bereshit

  # Translate ALL 66 books (long, ~€20-40 API cost):
  python scripts/translate_nl.py --all
"""
import os, sys, time, argparse, json, re
from pathlib import Path
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
load_dotenv(ROOT / ".env.local")

import anthropic
from supabase import create_client

SB_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SB_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
ANTH_KEY = os.environ.get("ANTHROPIC_API_KEY")
if not ANTH_KEY:
    sys.exit("Set ANTHROPIC_API_KEY in .env.local")

sb     = create_client(SB_URL, SB_KEY)
claude = anthropic.Anthropic(api_key=ANTH_KEY)

SYSTEM = """Gij zijt een schriftvertaler. Vertaal de gegeven verzen vanuit het Engels in het Nederlands.

Regelen:
- Behoud ALLE Hebreeuwse en herstelde Namen PRECIES zoals geschreven (Yahusha, Ruaḥ ha'Qodesh, Mosheh, Dawid, Ḥawwah, Noaḥ, Aḇraham, Yitsḥaq, Ya'aqoḇ, Yisra'ĕl, Yerushalayim, Mitsrayim, etc.)
- Het Paleo-Hebreeuwse teken 𐤉𐤄𐤅𐤄 stelt den Heiligen Naam voor — kopieer het EXACT zoals het er staat, vertaal of vervang het nimmer
- De tekenreeksen {fWHY, {vWHY, [vWHY, [VWHY en [vHWY zijn PDF-extractieartifacten voor den Naam Yahusha — kopieer ze EXACT zoals ze staan, nimmer wijzigen
- Gebruik eerbiedig, archaïsch Nederlands in de stijl der Statenvertaling (1637): "gij/gijlieden", "zijt", "hebt", "worde geheiligd", "geschiede Uw wil", "kome Uw Koninkrijk", "in der eeuwigheid", "ten hemel", "doch", "aldaar", "alzo", "voorwaar", "dewelke", "opdat", "uw" (nooit "jouw"), "hij zeide", "en het geschiedde"
- Vermijd moderne omgangstaal; kies steeds voor de oudere, plechtige vorm
- Behoud de versstructuur nauwkeurig — lever één vertaalde regel per invoeregel
- Voeg GEEN verklaringen, noten of commentaar toe
- Formaat: lever UITSLUITEND de vertaalde verzen, één per regel, in dezelfde volgorde
- Specifieke vaste uitdrukking: "And there came to be evening and there came to be morning" → ALTIJD "en toen werd het avond, en het werd ochtend" (nooit "geschiedde" of "morgen" voor morning)"""

BATCH = 40   # verses per API call
DELAY = 1.0  # seconds between calls


def _decode_unicode_escapes(text: str) -> str:
    """Convert \\uXXXXX or \\uXXXX escape sequences back to real Unicode characters.
    Claude Haiku sometimes returns Paleo-Hebrew U+109xx chars as \\u10909 (5-digit) instead of
    the real character. This decodes them back so the DB stores the actual glyphs."""
    # 5-digit first (supplementary plane like \u10909 = 𐤉)
    text = re.sub(r'\\u([0-9a-fA-F]{5})', lambda m: chr(int(m.group(1), 16)), text)
    # Standard 4-digit \uXXXX (must NOT be followed by a 5th hex digit)
    text = re.sub(r'\\u([0-9a-fA-F]{4})(?![0-9a-fA-F])', lambda m: chr(int(m.group(1), 16)), text)
    # Python-style 8-digit \UXXXXXXXX
    text = re.sub(r'\\U([0-9a-fA-F]{8})', lambda m: chr(int(m.group(1), 16)), text)
    return text


def translate_batch(verses: list[tuple[int,str]]) -> list[str]:
    """Translate a batch of (verse_number, text) tuples. Returns list of translated strings."""
    n = len(verses)
    # Always use sequential 1..N in the prompt so the AI never sees gaps or large numbers
    lines = [f"{i+1}. {txt}" for i, (_, txt) in enumerate(verses)]
    prompt = (
        f"Translate exactly {n} verses to Dutch. "
        f"Return exactly {n} lines, one translation per line, numbered 1 through {n}.\n\n"
        + "\n".join(lines)
    )

    for attempt in range(5):
        try:
            msg = claude.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=4096,
                system=SYSTEM,
                messages=[{"role": "user", "content": prompt}],
            )
            break
        except Exception as e:
            msg_str = str(e)
            if "credit balance" in msg_str or "400" in msg_str:
                raise  # billing error — retrying won't help
            wait = 10 * (attempt + 1)
            print(f"  [retry {attempt+1}/5] Connection error: {e}. Waiting {wait}s…")
            time.sleep(wait)
    else:
        raise RuntimeError("Failed after 5 retries — check your internet connection.")
    raw = msg.content[0].text.strip().splitlines()

    # Strip leading "N. " prefix if present
    cleaned = []
    for line in raw:
        line = line.strip()
        if line and line[0].isdigit() and '. ' in line[:6]:
            line = line.split('. ', 1)[1]
        line = _decode_unicode_escapes(line)
        if line:  # skip blank lines the AI may have inserted
            cleaned.append(line)

    if len(cleaned) != n:
        print(f"  WARNING: AI returned {len(cleaned)} lines for {n} input verses — padding/trimming")

    # Pad/trim to match input count
    while len(cleaned) < n:
        cleaned.append("")
    return cleaned[:n]


def translate_book(slug: str, force: bool = False) -> dict:
    """Returns summary dict: {name, total, skipped, translated}"""
    # 1. Get book id
    res = sb.table("books").select("id, name_en").eq("slug", slug).single().execute()
    book_id   = res.data["id"]
    book_name = res.data["name_en"]
    print(f"\nTranslating {book_name} ({slug}) to Dutch …")

    # 2. Get all verses for this book (paginate to avoid 1000-row default limit)
    verses = []
    PAGE = 1000
    offset = 0
    while True:
        res = sb.table("verses") \
            .select("id, verse_number, text, chapter_id") \
            .eq("book_id", book_id) \
            .order("id") \
            .range(offset, offset + PAGE - 1) \
            .execute()
        batch = res.data
        verses.extend(batch)
        if len(batch) < PAGE:
            break
        offset += PAGE
    print(f"  {len(verses)} verses to translate")

    # 3. Check which are already translated (skipped when --force)
    verse_ids = [v["id"] for v in verses]
    existing  = set()
    if not force:
        for i in range(0, len(verse_ids), 200):
            chunk = verse_ids[i:i+200]
            r = sb.table("translations") \
                .select("verse_id") \
                .eq("locale", "nl") \
                .in_("verse_id", chunk) \
                .execute()
            existing.update(x["verse_id"] for x in r.data)

    todo = [v for v in verses if v["id"] not in existing]
    if force:
        print(f"  {len(todo)} verses (--force: overwriting all existing translations)")
    else:
        print(f"  {len(todo)} remaining (skipping {len(existing)} already done)")

    # 4. Translate in batches
    total = len(todo)
    done  = 0
    rows  = []

    for i in range(0, total, BATCH):
        batch = todo[i:i+BATCH]
        pairs = [(v["verse_number"], v["text"]) for v in batch]
        translations = translate_batch(pairs)

        for v, tr in zip(batch, translations):
            if tr:
                rows.append({"verse_id": v["id"], "locale": "nl", "text": tr})

        # Insert when we have 200 rows or at the end
        if len(rows) >= 200 or (i + BATCH >= total and rows):
            sb.table("translations").upsert(rows, on_conflict="verse_id,locale").execute()
            done += len(rows)
            pct = (i + len(batch)) / total * 100
            print(f"  [{pct:5.1f}%] {done} verses inserted")
            rows = []

        time.sleep(DELAY)

    print(f"  Done — {done} Dutch verses stored for {book_name}")
    return {"name": book_name, "slug": slug, "total": len(verses), "skipped": len(existing), "translated": done}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", help="Book slug to translate (e.g. bereshit)")
    parser.add_argument("--all",  action="store_true", help="Translate all books")
    parser.add_argument("--force", action="store_true", help="Re-translate even already-translated verses (overwrites)")
    args = parser.parse_args()

    summaries = []

    if args.all:
        res = sb.table("books").select("slug, name_en").order("order").execute()
        for b in res.data:
            summaries.append(translate_book(b["slug"], force=args.force))
    elif args.book:
        summaries.append(translate_book(args.book, force=args.force))
    else:
        parser.print_help()
        return

    # ── Final summary ─────────────────────────────────────────────────────────
    if not summaries:
        return

    total_v      = sum(s["total"]      for s in summaries)
    total_done   = sum(s["translated"] for s in summaries)
    total_skip   = sum(s["skipped"]    for s in summaries)
    books_done   = [s for s in summaries if s["translated"] > 0]
    books_skipped = [s for s in summaries if s["translated"] == 0 and s["skipped"] > 0]

    print("\n" + "═" * 60)
    print("  TRANSLATION SUMMARY")
    print("═" * 60)
    print(f"  Books processed : {len(summaries)}")
    print(f"  Verses total    : {total_v:,}")
    print(f"  Verses translated: {total_done:,}")
    print(f"  Verses skipped  : {total_skip:,}  (already had Dutch)")
    print()

    if books_done:
        print(f"  ✓ Translated ({len(books_done)} books):")
        for s in books_done:
            print(f"      {s['name']:<30}  {s['translated']:>5} new  / {s['total']:>5} total")

    if books_skipped:
        print()
        print(f"  ↷ Fully skipped ({len(books_skipped)} books — already complete):")
        for s in books_skipped:
            print(f"      {s['name']:<30}  {s['skipped']:>5} verses")

    print("═" * 60)

if __name__ == "__main__":
    main()
