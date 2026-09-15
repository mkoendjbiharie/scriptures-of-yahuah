-- Replace PDF extraction artifacts for the Divine Name with Paleo-Hebrew 𐤉𐤄𐤅𐤄
-- hWhY and HWHY are both YHWH (יהוה) mangled during PDF text extraction

UPDATE verses SET text = REPLACE(text, 'hWhY', '𐤉𐤄𐤅𐤄') WHERE text LIKE '%hWhY%';
UPDATE verses SET text = REPLACE(text, 'HWHY', '𐤉𐤄𐤅𐤄') WHERE text LIKE '%HWHY%';

-- Verify
SELECT COUNT(*) AS remaining_hWhY FROM verses WHERE text LIKE '%hWhY%';
SELECT COUNT(*) AS remaining_HWHY FROM verses WHERE text LIKE '%HWHY%';
SELECT COUNT(*) AS paleo_count FROM verses WHERE text LIKE '%𐤉𐤄𐤅𐤄%';
