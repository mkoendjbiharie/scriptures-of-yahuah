-- Fix cross-testament figures: set testament = 'both' for people
-- who appear significantly in BOTH the Tanakh and the Brit Chadashah

UPDATE people SET testament = 'both' WHERE slug = 'melkitsedek';
-- Hebrews 5-7 is almost entirely about Melkitsedek as the order Yahusha belongs to

UPDATE people SET
  testament = 'both',
  english = 'Melchizedek — king-priest of Salem; type of Yahusha'
WHERE slug = 'melkitsedek';

-- Remove duplicate (melchizedek was inserted twice with different slugs)
DELETE FROM people WHERE slug = 'melchizedek';

-- Hanok: Bereshit 5 + Yahudah (Jude) 14 + Ibrim (Hebrews) 11:5
UPDATE people SET testament = 'both' WHERE slug = 'hanok';

-- Noach: Bereshit + Ibrim 11:7, Kepha A 3:20, 2 Kepha 2:5, Mattithyahu 24:37
UPDATE people SET testament = 'both' WHERE slug = 'noah';

-- Eliyahu and Mosheh are already 'both' — verify:
-- Eliyahu: transfiguration (Matt 17), Hazon 11 (two witnesses)
-- Mosheh: transfiguration (Matt 17), Hazon 11, throughout NT
