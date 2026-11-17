export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      crawl_frontier: {
        Row: {
          attempts: number
          created_at: string
          found_via: string | null
          host: string
          links_crawled_at: string | null
          processed_at: string | null
          reason: string | null
          snippet_description: string | null
          snippet_title: string | null
          source: string
          status: string
          url: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          found_via?: string | null
          host: string
          links_crawled_at?: string | null
          processed_at?: string | null
          reason?: string | null
          snippet_description?: string | null
          snippet_title?: string | null
          source: string
          status?: string
          url: string
        }
        Update: {
          attempts?: number
          created_at?: string
          found_via?: string | null
          host?: string
          links_crawled_at?: string | null
          processed_at?: string | null
          reason?: string | null
          snippet_description?: string | null
          snippet_title?: string | null
          source?: string
          status?: string
          url?: string
        }
        Relationships: []
      }
      crawl_state: {
        Row: {
          id: number
          last_run_at: string | null
          last_summary: Json | null
          locked_until: string | null
          paused_reason: string | null
          search_cursor: number
        }
        Insert: {
          id?: number
          last_run_at?: string | null
          last_summary?: Json | null
          locked_until?: string | null
          paused_reason?: string | null
          search_cursor?: number
        }
        Update: {
          id?: number
          last_run_at?: string | null
          last_summary?: Json | null
          locked_until?: string | null
          paused_reason?: string | null
          search_cursor?: number
        }
        Relationships: []
      }
      discovered_sites: {
        Row: {
          category_id: string
          city_en: string
          city_ur: string
          created_at: string
          description_en: string
          description_ur: string
          found_via: string | null
          host: string
          id: string
          source: string
          tags: string[]
          title_en: string
          title_ur: string
          url: string
        }
        Insert: {
          category_id: string
          city_en?: string
          city_ur?: string
          created_at?: string
          description_en: string
          description_ur: string
          found_via?: string | null
          host: string
          id?: string
          source: string
          tags?: string[]
          title_en: string
          title_ur: string
          url: string
        }
        Update: {
          category_id?: string
          city_en?: string
          city_ur?: string
          created_at?: string
          description_en?: string
          description_ur?: string
          found_via?: string | null
          host?: string
          id?: string
          source?: string
          tags?: string[]
          title_en?: string
          title_ur?: string
          url?: string
        }
        Relationships: []
      }
      site_categories: {
        Row: {
          created_at: string
          icon: string
          id: string
          label_en: string
          label_ur: string
        }
        Insert: {
          created_at?: string
          icon?: string
          id: string
          label_en: string
          label_ur: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          label_en?: string
          label_ur?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      acquire_crawl_lock: { Args: { lease_seconds: number }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
