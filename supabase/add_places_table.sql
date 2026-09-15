-- ============================================================
-- Biblical Places table
-- Run in Supabase > SQL Editor
-- ============================================================

create table if not exists places (
  id              serial primary key,
  slug            text not null unique,
  name_restored   text not null,          -- Hallelujah Scriptures form
  name_hebrew     text not null,          -- Modern Hebrew script
  name_english    text not null,          -- Traditional English
  type            text not null check (type in (
                    'city','town','village','region','country',
                    'mountain','valley','river','sea','lake',
                    'desert','well','gate','other'
                  )),
  testament       text not null default 'both' check (testament in ('old','new','both')),
  first_mention   text,
  location_en     text,
  location_nl     text,
  meaning_en      text,
  meaning_nl      text,
  origin_en       text,
  origin_nl       text,
  significance_en text,
  significance_nl text,
  created_at      timestamptz default now()
);

alter table places enable row level security;
create policy "Public read places" on places for select using (true);

create index places_type_idx on places (type);
create index places_testament_idx on places (testament);

-- Full-text search on English name + meaning
alter table places add column if not exists search_vector tsvector
  generated always as (
    to_tsvector('english',
      coalesce(name_english,'') || ' ' ||
      coalesce(name_restored,'') || ' ' ||
      coalesce(meaning_en,'') || ' ' ||
      coalesce(origin_en,'')
    )
  ) stored;

create index places_search_idx on places using gin(search_vector);
