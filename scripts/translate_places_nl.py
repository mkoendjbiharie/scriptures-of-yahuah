#!/usr/bin/env python3
"""
Translate biblical place descriptions to Dutch.

Run:
  python scripts/translate_places_nl.py            # only places missing Dutch
  python scripts/translate_places_nl.py --all      # force re-translate everything
  python scripts/translate_places_nl.py --check    # show how many need translation
"""
import os, json, re, time, argparse
from dotenv import load_dotenv
load_dotenv('.env.local')

from supabase import create_client
import anthropic

sb = create_client(
    os.environ['NEXT_PUBLIC_SUPABASE_URL'],
    os.environ['SUPABASE_SERVICE_ROLE_KEY'],
)
claude = anthropic.Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])

SYSTEM = (
    "Je bent een bijbelvertaler. Vertaal naar klassiek, eerbiedig Nederlands "
    "(Statenvertaling-register: 'gij', 'dewelke', 'alzoo'). "
    "Bewaar ALLE herstelde Hebreeuwse namen onveranderd "
    "(Yahuah, Yerushalayim, Mosheh, Dawid, Mitsrayim, Yarden, enz.). "
    "Vertaal alleen de gevraagde velden — geen commentaar, geen markdown."
)

BATCH = 8
EN_FIELDS = ["location_en", "meaning_en", "origin_en", "significance_en",
             "modern_location", "archaeology"]
NL_FIELDS = ["location_nl", "meaning_nl", "origin_nl", "significance_nl",
             "modern_location_nl", "archaeology_nl"]


def has_english(p: dict) -> bool:
    return any((p.get(f) or "").strip() for f in EN_FIELDS)


def has_dutch(p: dict) -> bool:
    return any((p.get(f) or "").strip() for f in NL_FIELDS)


def translate_batch(places: list[dict]) -> list[dict]:
    items = [
        {
            "index": i,
            "slug": p["slug"],
            "location_en":      p.get("location_en")      or "",
            "meaning_en":       p.get("meaning_en")       or "",
            "origin_en":        p.get("origin_en")        or "",
            "significance_en":  p.get("significance_en")  or "",
            "modern_location":  p.get("modern_location")  or "",
            "archaeology":      p.get("archaeology")      or "",
        }
        for i, p in enumerate(places)
    ]

    prompt = (
        f"Vertaal de onderstaande teksten voor {len(items)} bijbelse plaatsen naar het Nederlands.\n"
        f"Geef een JSON-array terug met precies {len(items)} objecten, elk met:\n"
        "- index (ongewijzigd van invoer)\n"
        "- slug  (ongewijzigd van invoer)\n"
        "- location_nl\n"
        "- meaning_nl\n"
        "- origin_nl\n"
        "- significance_nl\n"
        "- modern_location_nl\n"
        "- archaeology_nl\n\n"
        "Als een veld in het Engels leeg is, geef dan een lege string terug.\n"
        "Geef ALLEEN de JSON-array terug — geen markdown, geen uitleg.\n\n"
        f"Plaatsen:\n{json.dumps(items, ensure_ascii=False, indent=2)}"
    )

    msg = claude.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=8000,
        system=SYSTEM,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    m = re.search(r"\[[\s\S]*\]", raw)
    if not m:
        print("  WARNING: no JSON array in response")
        return []
    try:
        return json.loads(m.group())
    except Exception as e:
        print(f"  WARNING: JSON parse error: {e}")
        return []


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--all",   action="store_true", help="Re-translate even places that already have Dutch")
    parser.add_argument("--check", action="store_true", help="Show how many places still need translation")
    parser.add_argument("--limit", type=int, default=0, help="Process at most N places (for testing)")
    args = parser.parse_args()

    r = sb.table("places").select(
        "slug,"
        "location_en,meaning_en,origin_en,significance_en,modern_location,archaeology,"
        "location_nl,meaning_nl,origin_nl,significance_nl,modern_location_nl,archaeology_nl"
    ).limit(10000).execute()
    all_places = r.data or []

    translatable = [p for p in all_places if has_english(p)]
    no_english   = [p for p in all_places if not has_english(p)]

    if args.all:
        places = translatable
    else:
        places = [p for p in translatable if not has_dutch(p)]

    if args.check:
        print(f"{len(places)} / {len(all_places)} places still need Dutch translation.")
        print(f"  ({len(translatable)} have English content, {len(no_english)} have no English — skipped)")
        return

    if args.limit:
        places = places[:args.limit]

    if not places:
        print("All places already have Dutch translations.")
        return

    print(f"Translating {len(places)} places in batches of {BATCH}...")
    total_ok = 0

    for i in range(0, len(places), BATCH):
        batch = places[i : i + BATCH]
        slugs = [p["slug"] for p in batch]
        print(f"\nBatch {i//BATCH + 1}: {', '.join(slugs[:4])}{'...' if len(slugs)>4 else ''}")

        try:
            translated = translate_batch(batch)
        except Exception as e:
            print(f"  ERROR: {e}")
            time.sleep(6)
            continue

        tr_map = {t["slug"]: t for t in translated}

        rows = []
        for p in batch:
            t = tr_map.get(p["slug"])
            if not t:
                print(f"  SKIP (no result): {p['slug']}")
                continue
            rows.append({
                "slug":               p["slug"],
                "location_nl":        (t.get("location_nl")       or "").strip(),
                "meaning_nl":         (t.get("meaning_nl")        or "").strip(),
                "origin_nl":          (t.get("origin_nl")         or "").strip(),
                "significance_nl":    (t.get("significance_nl")   or "").strip(),
                "modern_location_nl": (t.get("modern_location_nl")or "").strip(),
                "archaeology_nl":     (t.get("archaeology_nl")    or "").strip(),
            })

        if rows:
            for row in rows:
                slug = row.pop("slug")
                sb.table("places").update(row).eq("slug", slug).execute()
            print(f"  {len(rows)} places updated")
            total_ok += len(rows)

        time.sleep(1.2)

    print(f"\nDone -- {total_ok} places translated.")


if __name__ == "__main__":
    main()
