-- Fix \u10909\u10904\u10905\u10904 → 𐤉𐤄𐤅𐤄 in verses + translations
-- Uses chr() throughout to avoid ALL string-literal backslash interpretation issues.
--
-- U+10909 𐤉 Yod  = chr(67849)
-- U+10904 𐤄 He   = chr(67844)
-- U+10905 𐤅 Waw  = chr(67845)
--
-- Run in Supabase SQL editor.

-- ── DIAGNOSTIC FIRST: see what is actually in verse 7 ──────────────────────

SELECT
  verse_number,
  position(chr(92) || 'u10909' IN text) > 0  AS has_backslash_u,
  position(chr(67849)           IN text) > 0  AS has_paleo_yod,
  left(text, 120) AS preview
FROM verses
WHERE verse_number IN (7, 8, 9)
  AND chapter_id IN (
    SELECT c.id FROM chapters c
    JOIN books b ON b.id = c.book_id
    WHERE b.slug = 'testament-reuben' AND c.number = 1
  )
ORDER BY verse_number;

-- ── FIX verses ─────────────────────────────────────────────────────────────

UPDATE verses
SET text = replace(
  replace(
    replace(
      replace(text,
        chr(92)||'u10909', chr(67849)),
      chr(92)||'u10904', chr(67844)),
    chr(92)||'u10905', chr(67845)),
  chr(92)||'u10906', chr(67846))
WHERE position(chr(92)||'u109' IN text) > 0;

-- ── FIX translations ───────────────────────────────────────────────────────

UPDATE translations
SET text = replace(
  replace(
    replace(
      replace(text,
        chr(92)||'u10909', chr(67849)),
      chr(92)||'u10904', chr(67844)),
    chr(92)||'u10905', chr(67845)),
  chr(92)||'u10906', chr(67846))
WHERE locale = 'nl'
  AND position(chr(92)||'u109' IN text) > 0;

-- ── CONFIRM ────────────────────────────────────────────────────────────────

SELECT
  verse_number,
  position(chr(92)||'u10909' IN text) > 0 AS still_broken,
  position(chr(67849)         IN text) > 0 AS has_paleo_yod,
  left(text, 120) AS preview
FROM verses
WHERE verse_number IN (7, 8, 9)
  AND chapter_id IN (
    SELECT c.id FROM chapters c
    JOIN books b ON b.id = c.book_id
    WHERE b.slug = 'testament-reuben' AND c.number = 1
  )
ORDER BY verse_number;
