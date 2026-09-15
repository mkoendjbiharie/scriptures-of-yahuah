-- ============================================================
-- Scriptures of Yahuah — Supabase Schema
-- Run this in Supabase > SQL Editor
-- ============================================================

-- Books
create table books (
  id             serial primary key,
  slug           text not null unique,       -- url-safe, e.g. "bereshit"
  name_en        text not null,              -- "Genesis"
  name_original  text not null,              -- "Bereshit"
  testament      text not null check (testament in ('old', 'new')),
  chapter_count  integer not null,
  "order"        integer not null            -- reading order 1-66
);

-- Chapters
create table chapters (
  id       serial primary key,
  book_id  integer not null references books (id) on delete cascade,
  number   integer not null,
  unique (book_id, number)
);

-- Verses (base text — English with restored names, from Hallelujah Scriptures)
create table verses (
  id           serial primary key,
  chapter_id   integer not null references chapters (id) on delete cascade,
  book_id      integer not null references books (id) on delete cascade,
  verse_number integer not null,
  text         text not null,
  unique (chapter_id, verse_number)
);

-- Translations (other languages)
create table translations (
  id       serial primary key,
  verse_id integer not null references verses (id) on delete cascade,
  locale   text not null,                   -- "nl", "es", "fr", etc.
  text     text not null,
  unique (verse_id, locale)
);

-- ============================================================
-- Full-text search
-- ============================================================

-- Add a tsvector column for fast search
alter table verses add column search_vector tsvector
  generated always as (to_tsvector('english', text)) stored;

create index verses_search_idx on verses using gin (search_vector);

-- Search function (returns ranked results with location metadata)
create or replace function search_scriptures(
  query        text,
  locale       text default 'en',
  limit_count  integer default 30
)
returns table (
  verse_id       integer,
  book_name      text,
  book_slug      text,
  chapter_number integer,
  verse_number   integer,
  text           text,
  rank           real
)
language sql stable as $$
  select
    v.id                  as verse_id,
    b.name_en             as book_name,
    b.slug                as book_slug,
    c.number              as chapter_number,
    v.verse_number,
    coalesce(t.text, v.text) as text,
    ts_rank(v.search_vector, websearch_to_tsquery('english', query)) as rank
  from verses v
  join chapters c on c.id = v.chapter_id
  join books    b on b.id = v.book_id
  left join translations t on t.verse_id = v.id and t.locale = locale
  where v.search_vector @@ websearch_to_tsquery('english', query)
  order by rank desc
  limit limit_count;
$$;

-- ============================================================
-- Row Level Security (public read-only)
-- ============================================================

alter table books        enable row level security;
alter table chapters     enable row level security;
alter table verses       enable row level security;
alter table translations enable row level security;

create policy "Public read books"        on books        for select using (true);
create policy "Public read chapters"     on chapters     for select using (true);
create policy "Public read verses"       on verses       for select using (true);
create policy "Public read translations" on translations for select using (true);

-- ============================================================
-- Seed: Books list (66 books in order)
-- Add all 66 books — abbreviated here, complete the rest
-- ============================================================

insert into books (slug, name_en, name_original, testament, chapter_count, "order") values
  ('bereshit',    'Genesis',      'Bereshit',    'old', 50, 1),
  ('shemoth',     'Exodus',       'Shemoth',     'old', 40, 2),
  ('wayyiqra',    'Leviticus',    'Wayyiqra',    'old', 27, 3),
  ('bemidbar',    'Numbers',      'Bemidbar',    'old', 36, 4),
  ('debarim',     'Deuteronomy',  'Debarim',     'old', 34, 5),
  ('yahusha',     'Joshua',       'Yahusha',     'old', 24, 6),
  ('shophetim',   'Judges',       'Shophetim',   'old', 21, 7),
  ('ruth',        'Ruth',         'Ruth',        'old',  4, 8),
  ('shemuel-a',   '1 Samuel',     'Shemuel A',   'old', 31, 9),
  ('shemuel-b',   '2 Samuel',     'Shemuel B',   'old', 24, 10),
  ('melakim-a',   '1 Kings',      'Melakim A',   'old', 22, 11),
  ('melakim-b',   '2 Kings',      'Melakim B',   'old', 25, 12),
  ('dibre-a',     '1 Chronicles', 'Dibre HaYamim A', 'old', 29, 13),
  ('dibre-b',     '2 Chronicles', 'Dibre HaYamim B', 'old', 36, 14),
  ('ezra',        'Ezra',         'Ezra',        'old', 10, 15),
  ('nehemyah',    'Nehemiah',     'Nehemyah',    'old', 13, 16),
  ('ester',       'Esther',       'Ester',       'old', 10, 17),
  ('iyob',        'Job',          'Iyob',        'old', 42, 18),
  ('tehillim',    'Psalms',       'Tehillim',    'old', 150, 19),
  ('mishle',      'Proverbs',     'Mishle',      'old', 31, 20),
  ('qoheleth',    'Ecclesiastes', 'Qoheleth',    'old', 12, 21),
  ('shir',        'Song of Songs','Shir HaShirim','old',  8, 22),
  ('yeshayahu',   'Isaiah',       'YeshaYahu',   'old', 66, 23),
  ('yirmeyahu',   'Jeremiah',     'YirmeYahu',   'old', 52, 24),
  ('eikah',       'Lamentations', 'Eikah',       'old',  5, 25),
  ('yehezqel',    'Ezekiel',      'Yehezqel',    'old', 48, 26),
  ('daniyel',     'Daniel',       'Daniyel',     'old', 12, 27),
  ('hoshua',      'Hosea',        'Hoshua',      'old', 14, 28),
  ('yoel',        'Joel',         'Yoel',        'old',  3, 29),
  ('amos',        'Amos',         'Amos',        'old',  9, 30),
  ('obadyah',     'Obadiah',      'Obadyah',     'old',  1, 31),
  ('yunah',       'Jonah',        'Yunah',       'old',  4, 32),
  ('mikah',       'Micah',        'Mikah',       'old',  7, 33),
  ('nachum',      'Nahum',        'Nachum',      'old',  3, 34),
  ('habaqquq',    'Habakkuk',     'Habaqquq',    'old',  3, 35),
  ('tsephanyah',  'Zephaniah',    'Tsephanyah',  'old',  3, 36),
  ('chaggai',     'Haggai',       'Chaggai',     'old',  2, 37),
  ('zekaryah',    'Zechariah',    'ZekarYah',    'old', 14, 38),
  ('malaki',      'Malachi',      'Malaki',      'old',  4, 39),
  ('mattithyahu', 'Matthew',      'MattithYahu', 'new', 28, 40),
  ('marqus',      'Mark',         'Marqus',      'new', 16, 41),
  ('luqas',       'Luke',         'Luqas',       'new', 24, 42),
  ('yahuchanan',  'John',         'Yahuchanan',  'new', 21, 43),
  ('acts',        'Acts',         'Ma''aseh',    'new', 28, 44),
  ('romans',      'Romans',       'Romans',      'new', 16, 45),
  ('qorintiyim-a','1 Corinthians','Qorintiyim A','new', 16, 46),
  ('qorintiyim-b','2 Corinthians','Qorintiyim B','new', 13, 47),
  ('galatiyim',   'Galatians',    'Galatiyim',   'new',  6, 48),
  ('ephesiyim',   'Ephesians',    'Ephesiyim',   'new',  6, 49),
  ('pilippiyim',  'Philippians',  'Pilippiyim',  'new',  4, 50),
  ('qolasim',     'Colossians',   'Qolasim',     'new',  4, 51),
  ('tess-a',      '1 Thessalonians','Tess A',    'new',  5, 52),
  ('tess-b',      '2 Thessalonians','Tess B',    'new',  3, 53),
  ('timothy-a',   '1 Timothy',    'Timothy A',   'new',  6, 54),
  ('timothy-b',   '2 Timothy',    'Timothy B',   'new',  4, 55),
  ('titos',       'Titus',        'Titos',       'new',  3, 56),
  ('philemon',    'Philemon',     'Philemon',    'new',  1, 57),
  ('ibrim',       'Hebrews',      'Ibrim',       'new', 13, 58),
  ('yaaqob',      'James',        'Yaaqob',      'new',  5, 59),
  ('kepha-a',     '1 Peter',      'Kepha A',     'new',  5, 60),
  ('kepha-b',     '2 Peter',      'Kepha B',     'new',  3, 61),
  ('yohanan-a',   '1 John',       'Yohanan A',   'new',  5, 62),
  ('yohanan-b',   '2 John',       'Yohanan B',   'new',  1, 63),
  ('yohanan-c',   '3 John',       'Yohanan C',   'new',  1, 64),
  ('yahudah',     'Jude',         'Yahudah',     'new',  1, 65),
  ('hazon',       'Revelation',   'Hazon',       'new', 22, 66);
