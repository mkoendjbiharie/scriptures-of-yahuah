-- Add biographical detail columns to the people table
-- Run in Supabase > SQL Editor

alter table people
  add column if not exists age_at_death  text,   -- e.g. "930", "~120", "unknown"
  add column if not exists birthplace    text,   -- restored-name place, e.g. "Ur of the Chaldeans"
  add column if not exists father        text,   -- restored name of father, e.g. "Teraḥ"
  add column if not exists mother        text,   -- restored name of mother, e.g. "Ḥawwah"
  add column if not exists extra_info_en text,   -- other notable facts (EN)
  add column if not exists extra_info_nl text;   -- Dutch translation of extra_info_en
