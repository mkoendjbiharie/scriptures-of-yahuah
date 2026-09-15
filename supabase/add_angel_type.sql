-- Add angel sub-type column to people table
-- Run in Supabase > SQL Editor

alter table people
  add column if not exists angel_type text
  check (angel_type in (
    'archangel','watcher','fallen_watcher','fallen',
    'cherub','seraph','messenger','guardian','other'
  ));

comment on column people.angel_type is
  'Sub-type for category=angel: archangel | watcher | fallen_watcher | fallen | cherub | seraph | messenger | guardian | other';
