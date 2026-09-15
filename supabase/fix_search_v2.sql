-- Simpler fix: just replace the function, no column changes needed.
-- Uses ILIKE so "Dawid", "Yahudah", "Yahuah" etc. all match correctly.

CREATE EXTENSION IF NOT EXISTS pg_trgm;

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
    v.id                     AS verse_id,
    b.name_en                AS book_name,
    b.slug                   AS book_slug,
    c.number                 AS chapter_number,
    v.verse_number,
    COALESCE(t.text, v.text) AS text,
    1.0::real                AS rank
  FROM verses v
  JOIN chapters c ON c.id = v.chapter_id
  JOIN books    b ON b.id = v.book_id
  LEFT JOIN translations t ON t.verse_id = v.id AND t.locale = locale
  WHERE v.text ILIKE '%' || query || '%'
  ORDER BY v.id
  LIMIT limit_count;
$$;
