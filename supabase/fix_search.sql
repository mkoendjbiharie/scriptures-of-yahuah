-- Fix 1: Rebuild search_vector with 'simple' config (no English stemming)
-- This makes Hebrew names like Dawid, Yahudah, Yahuah indexable correctly
ALTER TABLE verses DROP COLUMN IF EXISTS search_vector;
ALTER TABLE verses ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (to_tsvector('simple', text)) STORED;

CREATE INDEX IF NOT EXISTS verses_search_idx ON verses USING GIN (search_vector);

-- Fix 2: Also add a trigram index for partial/ILIKE search (install pg_trgm first)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS verses_text_trgm_idx ON verses USING GIN (text gin_trgm_ops);

-- Fix 3: Rewrite search function to use ILIKE for partial matching
-- (catches "dawid", "daw", "yahudah", etc. reliably)
CREATE OR REPLACE FUNCTION search_scriptures(
  query        text,
  locale       text default 'en',
  limit_count  integer default 30
)
RETURNS TABLE (
  verse_id       integer,
  book_name      text,
  book_slug      text,
  chapter_number integer,
  verse_number   integer,
  text           text,
  rank           real
)
LANGUAGE sql STABLE AS $$
  SELECT
    v.id                        AS verse_id,
    b.name_en                   AS book_name,
    b.slug                      AS book_slug,
    c.number                    AS chapter_number,
    v.verse_number,
    COALESCE(t.text, v.text)    AS text,
    -- Rank: exact word match scores higher than substring match
    CASE
      WHEN v.text  ILIKE '% ' || query || ' %'  THEN 1.0
      WHEN v.text  ILIKE query || ' %'           THEN 0.9
      WHEN v.text  ILIKE '% ' || query           THEN 0.9
      ELSE 0.5
    END AS rank
  FROM verses v
  JOIN chapters c ON c.id = v.chapter_id
  JOIN books    b ON b.id = v.book_id
  LEFT JOIN translations t ON t.verse_id = v.id AND t.locale = locale
  WHERE v.text ILIKE '%' || query || '%'
  ORDER BY rank DESC, v.id
  LIMIT limit_count;
$$;
