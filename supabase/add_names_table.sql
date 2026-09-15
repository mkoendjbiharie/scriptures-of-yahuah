-- ============================================================
-- Biblical Names/People table
-- Run in Supabase > SQL Editor
-- ============================================================

create table if not exists people (
  id              serial primary key,
  slug            text not null unique,
  name_restored   text not null,
  name_hebrew     text not null,
  name_english    text not null,
  category        text not null check (category in (
                    'divine','angel','patriarch','matriarch',
                    'judge','king','queen','prophet','prophetess',
                    'priest','apostle','disciple','deacon',
                    'warrior','servant','other'
                  )),
  testament       text not null default 'old' check (testament in ('old','new','both')),
  first_mention   text,
  meaning_en      text,
  meaning_nl      text,
  origin_en       text,
  origin_nl       text,
  significance_en text,
  significance_nl text
);

alter table people enable row level security;
create policy "Public read people" on people for select using (true);

create index people_category_idx on people (category);
create index people_testament_idx on people (testament);
create index people_name_idx on people (name_restored);

alter table people add column if not exists search_vector tsvector
  generated always as (
    to_tsvector('english',
      coalesce(name_english,'') || ' ' ||
      coalesce(name_restored,'') || ' ' ||
      coalesce(meaning_en,'') || ' ' ||
      coalesce(origin_en,'')
    )
  ) stored;

create index people_search_idx on people using gin(search_vector);
