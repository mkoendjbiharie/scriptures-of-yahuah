# Scriptures of Yahuah — Project Notes for Claude

## Critical Rule
**NEVER use the Edit tool or `sed -i` on this codebase.**
Windows NTFS mounted in Linux sandbox causes file truncation.
Always use Python `open(..., 'w', encoding='utf-8')` for ALL file writes.

---

## Project Goal
A web/mobile app (Next.js 14, next-intl, Supabase) to teach the scriptures using restored Hebrew names (Yahuah, Yahusha, Mosheh, etc.) based on Halleluyah Scriptures PDFs. Target: all ages, multiple languages.

---

## Languages
- **EN**: live (source language)
- **NL**: translation in progress (`scripts/translate_nl.py --all`)
- **ES, FR, DE, PT**: planned — not yet started

---

## When Adding a New Language

### 1. Search aliases (MUST DO)
The `search_aliases` table in Supabase maps common names in each language to their restored Hebrew canonical form used in the verse text.

When a new language is added, insert aliases for that language. Examples of what's needed:
- Person names: Jesus→Yahusha, Moses→Mosheh, David→Dawid, Abraham→Aḇraham, Noah→Noaḥ, etc.
- Place names: Jerusalem→Yerushalayim, Egypt→Mitsrayim, Babylon→Babel, Jordan→Yarden, etc.
- Terms: Holy Spirit→Ruaḥ ha'Qodesh, Lord→𐤉𐤄𐤅𐤄, etc.

The `search_scriptures` RPC function resolves aliases before searching, so the verse text (always English transliteration) is matched correctly regardless of what language the user searches in.

Use `language = NULL` for universal aliases (work in all locales), or `language = 'nl'` for language-specific ones.

See `supabase/fix_search_v4.sql` for the current RPC and `supabase/search_aliases_seed.sql` (to be created) for the alias data.

### 2. Translation script
Run: `python scripts/translate_nl.py --all` (adapt for new locale)
The script is already paginated for books >1000 verses. Safe to re-run (`--resume` logic is always on).

### 3. messages/{locale}.json
Add the locale's UI strings.

### 4. next-intl config
Add the locale to `i18n.ts` / `middleware.ts`.

---

## Known PDF Extraction Quirks
- `𐤉𐤄𐤅𐤄` (real Paleo-Hebrew Unicode) = **Yahuah** (the Father)
- `{fWHY` (broken font extraction) = **Yahusha** (the Son) — custom glyph the HS PDF uses
- Both are handled in `components/scripture/RichText.tsx`

---

## Pending / Backlog
- [ ] Build `search_aliases` table + seed + updated RPC (see above)
- [ ] Run `translate_nl.py --all` to completion, then re-run for mattithyahu, luqas, maaseh (these were cut off at 1000 verses by Supabase default limit — already fixed in script)
- [ ] Run `generate_names.py --fill-meta` (backfill age_at_death, parents, birthplace for all existing people)
- [ ] Run `generate_places.py --fill-meta` (backfill modern_name, modern_location, location_certainty, archaeology for all existing places)
- [ ] QA pass EN + NL before deploy
- [ ] Deploy: `git add -A && git commit && vercel --prod`
- [ ] **Dutch translation style (Option B)**: Update `SYSTEM` prompt in `scripts/translate_nl.py` to use archaic/reverent Dutch register (Statenvertaling style: "zijt", "worde geheiligd", "geschiede", "in der eeuwigheid") while keeping all restored Hebrew names/terms (shamayim, qodesh, Yahuah, etc.). Then re-run `translate_nl.py --all` — existing verses will be overwritten via upsert. Marlon manually fixed key verses (e.g. Mattithyahu 6:9-13 Our Father) in Supabase first, so re-check those after re-run.
- [ ] ES, FR, DE, PT translations
- [ ] Android / iOS app (Capacitor or React Native)
- [ ] **Map view** (`/learn/map`) — BACKLOG. Add `lat`/`lng` columns to `places` table, populate via `generate_places.py`, build a D3/SVG map page. ⚠️ CONTROVERSIAL: modern coordinates for biblical sites are often debated or unknown. The map must carry a clear disclaimer: "Locations shown are approximate and based on scholarly consensus where available. Many sites are uncertain or disputed. This map does not represent a definitive or political claim about any location." Do not present coordinates as fact — use the `location_certainty` field (confirmed/likely/uncertain/symbolic) and display it on every marker.
