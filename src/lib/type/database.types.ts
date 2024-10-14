export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          artist_id: number
          content_text: string
          created_at: string
          id: string
          parent_comment_id: number | null
          post_id: string
          user_id: string | null
        }
        Insert: {
          artist_id: number
          content_text: string
          created_at?: string
          id?: string
          parent_comment_id?: number | null
          post_id: string
          user_id?: string | null
        }
        Update: {
          artist_id?: number
          content_text?: string
          created_at?: string
          id?: string
          parent_comment_id?: number | null
          post_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          artist: number | null
          created_at: string | null
          id: string
          user_id: number | null
        }
        Insert: {
          artist?: number | null
          created_at?: string | null
          id?: string
          user_id?: number | null
        }
        Update: {
          artist?: number | null
          created_at?: string | null
          id?: string
          user_id?: number | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          id: string
          is_edit: boolean
          send_by: string
          text: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_edit?: boolean
          send_by?: string
          text: string
        }
        Update: {
          created_at?: string
          id?: string
          is_edit?: boolean
          send_by?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          artist_id: number
          body: string
          created_at: string | null
          id: string
          title: string
          user_id: string | null
        }
        Insert: {
          artist_id: number
          body: string
          created_at?: string | null
          id?: string
          title: string
          user_id?: string | null
        }
        Update: {
          artist_id?: number
          body?: string
          created_at?: string | null
          id?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      resalePosts: {
        Row: {
          body: string | null
          created_at: string | null
          id: string
          img_url: string | null
          price: number | null
          title: string | null
          user_id: number | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          id?: string
          img_url?: string | null
          price?: number | null
          title?: string | null
          user_id?: number | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          id?: string
          img_url?: string | null
          price?: number | null
          title?: string | null
          user_id?: number | null
        }
        Relationships: []
      }
      schedule: {
        Row: {
          artist_id: number
          content: string | null
          date: string
          description: string
          id: string
          title: string
          user_id: string | null
        }
        Insert: {
          artist_id: number
          content?: string | null
          date: string
          description: string
          id?: string
          title: string
          user_id?: string | null
        }
        Update: {
          artist_id?: number
          content?: string | null
          date?: string
          description?: string
          id?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string
          created_at: string
          display_name: string
          email: string
          id: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          display_name: string
          email: string
          id?: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          display_name?: string
          email?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
