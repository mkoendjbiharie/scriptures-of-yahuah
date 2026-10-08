/**
 * Database types for Supabase.
 * Manually maintained — reflects the current schema.
 */
export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          id: number
          slug: string
          name_en: string
          name_original: string
          testament: 'old' | 'new'
          chapter_count: number
          order: number
        }
        Insert: Omit<Database['public']['Tables']['books']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['books']['Insert']>
      }
      chapters: {
        Row: { id: number; book_id: number; number: number }
        Insert: Omit<Database['public']['Tables']['chapters']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['chapters']['Insert']>
      }
      verses: {
        Row: {
          id: number
          chapter_id: number
          book_id: number
          verse_number: number
          text: string
        }
        Insert: Omit<Database['public']['Tables']['verses']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['verses']['Insert']>
      }
      translations: {
        Row: {
          id: number
          verse_id: number
          locale: string
          text: string
        }
        Insert: Omit<Database['public']['Tables']['translations']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['translations']['Insert']>
      }
      people: {
        Row: {
          id: number
          slug: string
          name_restored: string
          name_hebrew: string
          name_english: string
          category: 'divine' | 'angel' | 'patriarch' | 'matriarch' | 'judge' | 'king' | 'queen' | 'prophet' | 'prophetess' | 'priest' | 'apostle' | 'disciple' | 'deacon' | 'warrior' | 'servant' | 'other'
          testament: 'old' | 'new' | 'both'
          first_mention: string | null
          meaning_en: string | null
          meaning_nl: string | null
          origin_en: string | null
          origin_nl: string | null
          significance_en: string | null
          significance_nl: string | null
          age_at_death: string | null
          birthplace: string | null
          father: string | null
          mother: string | null
          extra_info_en: string | null
          extra_info_nl: string | null
          father_slug: string | null
          mother_slug: string | null
          birthplace_slug: string | null
          search_vector: unknown | null
        }
        Insert: Omit<Database['public']['Tables']['people']['Row'], 'id' | 'search_vector'>
        Update: Partial<Database['public']['Tables']['people']['Insert']>
      }
      places: {
        Row: {
          id: number
          slug: string
          name_restored: string
          name_hebrew: string
          name_english: string
          type: 'city' | 'town' | 'village' | 'region' | 'country' | 'mountain' | 'valley' | 'river' | 'sea' | 'lake' | 'desert' | 'well' | 'gate' | 'other'
          testament: 'old' | 'new' | 'both'
          first_mention: string | null
          location_en: string | null
          location_nl: string | null
          meaning_en: string | null
          meaning_nl: string | null
          origin_en: string | null
          origin_nl: string | null
          significance_en: string | null
          significance_nl: string | null
          modern_name: string | null
          modern_country: string | null
          modern_location: string | null
          location_certainty: 'confirmed' | 'likely' | 'uncertain' | 'symbolic' | null
          archaeology: string | null
          created_at: string | null
          search_vector: unknown | null
        }
        Insert: Omit<Database['public']['Tables']['places']['Row'], 'id' | 'search_vector'>
        Update: Partial<Database['public']['Tables']['places']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: {
      search_scriptures: {
        Args: { query: string; locale: string; limit_count: number }
        Returns: {
          verse_id: number
          book_name: string
          book_slug: string
          chapter_number: number
          verse_number: number
          text: string
          rank: number
        }[]
      }
      get_verse_range: {
        Args: {
          book_slug: string
          chapter_num: number
          verse_from: number
          verse_to: number
          locale?: string
        }
        Returns: { verse_number: number; text: string }[]
      }
    }
  }
}
