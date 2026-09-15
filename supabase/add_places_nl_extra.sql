-- Add Dutch columns for fields not yet translated
ALTER TABLE places
  ADD COLUMN IF NOT EXISTS modern_location_nl text,
  ADD COLUMN IF NOT EXISTS archaeology_nl     text;
