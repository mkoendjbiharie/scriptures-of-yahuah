-- Run this in Supabase SQL Editor BEFORE importing extra-canonical books.
-- Adds 'extra' as a valid testament value and a new section label.

ALTER TABLE books DROP CONSTRAINT IF EXISTS books_testament_check;
ALTER TABLE books ADD CONSTRAINT books_testament_check
  CHECK (testament IN ('old', 'new', 'extra'));
