/**
 * Auto-generated types for Supabase.
 * Replace with `npx supabase gen types typescript` after connecting your project.
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
    }
    Views: {}
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
    }
  }
}
