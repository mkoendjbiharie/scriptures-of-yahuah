export type ThemeId =
  // General
  | 'parchment' | 'gold' | 'creation'
  // Breastplate of Aharon — Shemoth 28:17-20 (Hebrew names, in order)
  | 'odem'     // Row 1 — Carnelian/Sardius
  | 'pitdah'   // Row 1 — Topaz/Chrysolite
  | 'bareqeth' // Row 1 — Emerald/Smaragd
  | 'nophek'   // Row 2 — Carbuncle/Garnet
  | 'sappir'   // Row 2 — Sapphire/Lapis Lazuli
  | 'yahalom'  // Row 2 — Diamond
  | 'leshem'   // Row 3 — Jacinth/Ligure
  | 'shebo'    // Row 3 — Agate
  | 'achlamah' // Row 3 — Amethyst
  | 'tarshish' // Row 4 — Beryl/Aquamarine
  | 'shoham'   // Row 4 — Onyx
  | 'yashepheh'// Row 4 — Jasper

export type ThemeDefinition = {
  id: ThemeId
  name: string          // Original Hebrew name
  nameEn: string        // English stone name
  reference: string
  description: string
  swatch: string
  row?: number          // Breastplate row (1-4)
  col?: number          // Breastplate column (1-3)
}

export const themes: ThemeDefinition[] = [
  // ── General themes ───────────────────────────────────────
  {
    id: 'parchment',
    name: 'Parchment', nameEn: 'Parchment',
    reference: '', description: 'Dark walnut wood with stained linen paper',
    swatch: '#4A2C0E',
  },
  {
    id: 'gold',
    name: 'Gold', nameEn: 'Gold',
    reference: 'Hazon 21:18', description: 'Shining gold on deep black — pure gold like clear glass',
    swatch: '#FFD700',
  },
  {
    id: 'creation',
    name: 'Creation', nameEn: 'Creation',
    reference: 'Bereshit 1:1', description: 'Sky, earth, water, and living green',
    swatch: '#1A5C30',
  },

  // ── Breastplate Row 1 ────────────────────────────────────
  {
    id: 'odem', name: 'Odem', nameEn: 'Carnelian',
    reference: 'Shemoth 28:17', description: 'First stone, row one',
    swatch: '#8B2020', row: 1, col: 1,
  },
  {
    id: 'pitdah', name: 'Pitdah', nameEn: 'Topaz',
    reference: 'Shemoth 28:17', description: 'Second stone, row one',
    swatch: '#7A5C08', row: 1, col: 2,
  },
  {
    id: 'bareqeth', name: 'Bareqeth', nameEn: 'Emerald',
    reference: 'Shemoth 28:17', description: 'Third stone, row one',
    swatch: '#0D4A2A', row: 1, col: 3,
  },

  // ── Breastplate Row 2 ────────────────────────────────────
  {
    id: 'nophek', name: 'Nophek', nameEn: 'Carbuncle',
    reference: 'Shemoth 28:18', description: 'First stone, row two',
    swatch: '#6B1A3A', row: 2, col: 1,
  },
  {
    id: 'sappir', name: 'Sappir', nameEn: 'Sapphire',
    reference: 'Shemoth 28:18', description: 'Second stone, row two',
    swatch: '#0C2A6E', row: 2, col: 2,
  },
  {
    id: 'yahalom', name: 'Yahalom', nameEn: 'Diamond',
    reference: 'Shemoth 28:18', description: 'Third stone, row two',
    swatch: '#2A2A3A', row: 2, col: 3,
  },

  // ── Breastplate Row 3 ────────────────────────────────────
  {
    id: 'leshem', name: 'Leshem', nameEn: 'Jacinth',
    reference: 'Shemoth 28:19', description: 'First stone, row three',
    swatch: '#7A4010', row: 3, col: 1,
  },
  {
    id: 'shebo', name: 'Shebo', nameEn: 'Agate',
    reference: 'Shemoth 28:19', description: 'Second stone, row three',
    swatch: '#3A4A5A', row: 3, col: 2,
  },
  {
    id: 'achlamah', name: 'Achlamah', nameEn: 'Amethyst',
    reference: 'Shemoth 28:19', description: 'Third stone, row three',
    swatch: '#3D1A6E', row: 3, col: 3,
  },

  // ── Breastplate Row 4 ────────────────────────────────────
  {
    id: 'tarshish', name: 'Tarshish', nameEn: 'Beryl',
    reference: 'Shemoth 28:20', description: 'First stone, row four',
    swatch: '#0A5068', row: 4, col: 1,
  },
  {
    id: 'shoham', name: 'Shoham', nameEn: 'Onyx',
    reference: 'Shemoth 28:20', description: 'Second stone, row four',
    swatch: '#1A1825', row: 4, col: 2,
  },
  {
    id: 'yashepheh', name: 'Yashepheh', nameEn: 'Jasper',
    reference: 'Shemoth 28:20', description: 'Third stone, row four',
    swatch: '#5C1A1A', row: 4, col: 3,
  },
]

// The 12 breastplate stone IDs in order
export const BREASTPLATE: ThemeId[] = [
  'odem', 'pitdah', 'bareqeth',
  'nophek', 'sappir', 'yahalom',
  'leshem', 'shebo', 'achlamah',
  'tarshish', 'shoham', 'yashepheh',
]


export const DEFAULT_THEME: ThemeId = 'parchment'
