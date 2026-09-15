-- Drop and recreate the function cleanly.
-- This version uses only ILIKE — no tsvector, no text search config.
-- Safe to run multiple times.

DROP FUNCTION IF EXISTS search_scriptures(text, text, integer);

CREATE OR REPLACE FUNCTION search_scriptures(
  query        text,
  locale       text    DEFAULT 'en',
  limit_count  integer DEFAULT 30
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
LANGUAGE sql STABLE
AS $$
  SELECT
    v.id                              AS verse_id,
    b.name_en                         AS book_name,
    b.slug                            AS book_slug,
    c.number                          AS chapter_number,
    v.verse_number,
    COALESCE(t.text, v.text)          AS text,
    1.0::real                         AS rank
  FROM verses v
  JOIN chapters c ON c.id = v.chapter_id
  JOIN books    b ON b.id = v.book_id
  LEFT JOIN translations t
         ON t.verse_id = v.id
        AND t.locale   = search_scriptures.locale
  WHERE v.text ILIKE '%' || search_scriptures.query || '%'
     OR COALESCE(t.text, '') ILIKE '%' || search_scriptures.query || '%'
  ORDER BY v.id
  LIMIT search_scriptures.limit_count;
$$;
