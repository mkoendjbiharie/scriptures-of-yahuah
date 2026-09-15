-- Fetch a range of verses from a specific book/chapter, with locale translation fallback
CREATE OR REPLACE FUNCTION get_verse_range(
  book_slug  text,
  chapter_num integer,
  verse_from  integer,
  verse_to    integer,
  locale      text DEFAULT 'en'
)
RETURNS TABLE (verse_number integer, text text)
LANGUAGE sql STABLE AS $$
  SELECT
    v.verse_number,
    COALESCE(t.text, v.text) AS text
  FROM verses v
  JOIN chapters c ON c.id = v.chapter_id
  JOIN books    b ON b.id = v.book_id
  LEFT JOIN translations t
         ON t.verse_id = v.id AND t.locale = get_verse_range.locale
  WHERE b.slug        = book_slug
    AND c.number      = chapter_num
    AND v.verse_number BETWEEN verse_from AND verse_to
  ORDER BY v.verse_number
$$;
