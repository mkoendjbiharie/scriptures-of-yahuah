-- Migration: add modern location + archaeology fields to places
-- Run this in Supabase SQL editor

ALTER TABLE places
  ADD COLUMN IF NOT EXISTS modern_name      text,
  ADD COLUMN IF NOT EXISTS modern_country   text,
  ADD COLUMN IF NOT EXISTS modern_location  text,
  ADD COLUMN IF NOT EXISTS location_certainty text
    CHECK (location_certainty IN ('confirmed','likely','uncertain','symbolic')),
  ADD COLUMN IF NOT EXISTS archaeology      text;

-- Migration: add parent + birthplace slugs to people
ALTER TABLE people
  ADD COLUMN IF NOT EXISTS father_slug      text REFERENCES people(slug) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS mother_slug      text REFERENCES people(slug) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS birthplace_slug  text REFERENCES places(slug)  ON DELETE SET NULL;
