export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      account: {
        Row: {
          password: string | null
          username: string
        }
        Insert: {
          password?: string | null
          username: string
        }
        Update: {
          password?: string | null
          username?: string
        }
      }
      booking: {
        Row: {
          book_from: string | null
          book_to: string | null
          checkin_time: string | null
          customer_id: string | null
          deposit: number | null
          id: number
          status: string
        }
        Insert: {
          book_from?: string | null
          book_to?: string | null
          checkin_time?: string | null
          customer_id?: string | null
          deposit?: number | null
          id?: number
          status?: string
        }
        Update: {
          book_from?: string | null
          book_to?: string | null
          checkin_time?: string | null
          customer_id?: string | null
          deposit?: number | null
          id?: number
          status?: string
        }
      }
      customer: {
        Row: {
          date_of_birth: string | null
          email: string | null
          fullname: string | null
          id: string
          phone_number: string | null
        }
        Insert: {
          date_of_birth?: string | null
          email?: string | null
          fullname?: string | null
          id: string
          phone_number?: string | null
        }
        Update: {
          date_of_birth?: string | null
          email?: string | null
          fullname?: string | null
          id?: string
          phone_number?: string | null
        }
      }
      daily_report: {
        Row: {
          booking_amount: number | null
          customer_amount: number | null
          date: string
          income: number
          outcome: number
          profit: number
          report_month: string | null
        }
        Insert: {
          booking_amount?: number | null
          customer_amount?: number | null
          date: string
          income?: number
          outcome?: number
          profit?: number
          report_month?: string | null
        }
        Update: {
          booking_amount?: number | null
          customer_amount?: number | null
          date?: string
          income?: number
          outcome?: number
          profit?: number
          report_month?: string | null
        }
      }
      employee: {
        Row: {
          date_of_birth: string | null
          fullname: string | null
          id: string
          phone_number: string | null
          position_id: number | null
          start_working_date: string | null
          username: string | null
        }
        Insert: {
          date_of_birth?: string | null
          fullname?: string | null
          id: string
          phone_number?: string | null
          position_id?: number | null
          start_working_date?: string | null
          username?: string | null
        }
        Update: {
          date_of_birth?: string | null
          fullname?: string | null
          id?: string
          phone_number?: string | null
          position_id?: number | null
          start_working_date?: string | null
          username?: string | null
        }
      }
      feature: {
        Row: {
          action: string | null
          description: string | null
          id: number
          name: string | null
          resource: string | null
        }
        Insert: {
          action?: string | null
          description?: string | null
          id?: number
          name?: string | null
          resource?: string | null
        }
        Update: {
          action?: string | null
          description?: string | null
          id?: number
          name?: string | null
          resource?: string | null
        }
      }
      has_feature: {
        Row: {
          id: number
          room_feature_id: number | null
          room_type: number | null
        }
        Insert: {
          id?: number
          room_feature_id?: number | null
          room_type?: number | null
        }
        Update: {
          id?: number
          room_feature_id?: number | null
          room_type?: number | null
        }
      }
      inventory_detail: {
        Row: {
          amount: number | null
          cost: number | null
          id: number
          item_id: number | null
          price: number | null
          record_id: number | null
        }
        Insert: {
          amount?: number | null
          cost?: number | null
          id?: number
          item_id?: number | null
          price?: number | null
          record_id?: number | null
        }
        Update: {
          amount?: number | null
          cost?: number | null
          id?: number
          item_id?: number | null
          price?: number | null
          record_id?: number | null
        }
      }
      inventory_record: {
        Row: {
          booking_id: number
          date: string | null
          employee_id: string | null
          id: number
          room_id: number | null
        }
        Insert: {
          booking_id: number
          date?: string | null
          employee_id?: string | null
          id?: number
          room_id?: number | null
        }
        Update: {
          booking_id?: number
          date?: string | null
          employee_id?: string | null
          id?: number
          room_id?: number | null
        }
      }
      invoice: {
        Row: {
          booking_id: number | null
          checkin_time: string | null
          checkout_time: string | null
          employee_id: string | null
          employee_name: string | null
          established_date: string | null
          id: number
          note: string | null
          payment_method: string | null
          rent_cost: number
          service_cost: number
          status: string | null
          surcharge: number
          total_cost: number
        }
        Insert: {
          booking_id?: number | null
          checkin_time?: string | null
          checkout_time?: string | null
          employee_id?: string | null
          employee_name?: string | null
          established_date?: string | null
          id?: number
          note?: string | null
          payment_method?: string | null
          rent_cost?: number
          service_cost?: number
          status?: string | null
          surcharge?: number
          total_cost?: number
        }
        Update: {
          booking_id?: number | null
          checkin_time?: string | null
          checkout_time?: string | null
          employee_id?: string | null
          employee_name?: string | null
          established_date?: string | null
          id?: number
          note?: string | null
          payment_method?: string | null
          rent_cost?: number
          service_cost?: number
          status?: string | null
          surcharge?: number
          total_cost?: number
        }
      }
      item: {
        Row: {
          free_amount: number
          id: number
          name: string | null
          reserve_amount: number | null
          sell_price: number | null
        }
        Insert: {
          free_amount?: number
          id?: number
          name?: string | null
          reserve_amount?: number | null
          sell_price?: number | null
        }
        Update: {
          free_amount?: number
          id?: number
          name?: string | null
          reserve_amount?: number | null
          sell_price?: number | null
        }
      }
      monthly_report: {
        Row: {
          booking_amount: number | null
          customer_amount: number | null
          income: number
          month: string
          outcome: number
          profit: number
          report_year: string | null
        }
        Insert: {
          booking_amount?: number | null
          customer_amount?: number | null
          income?: number
          month: string
          outcome?: number
          profit?: number
          report_year?: string | null
        }
        Update: {
          booking_amount?: number | null
          customer_amount?: number | null
          income?: number
          month?: string
          outcome?: number
          profit?: number
          report_year?: string | null
        }
      }
      parameter: {
        Row: {
          id: number
          name: string | null
          value: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          value?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          value?: number | null
        }
      }
      payment: {
        Row: {
          established_date: string | null
          id: number
          name: string | null
          total_cost: number
        }
        Insert: {
          established_date?: string | null
          id?: number
          name?: string | null
          total_cost?: number
        }
        Update: {
          established_date?: string | null
          id?: number
          name?: string | null
          total_cost?: number
        }
      }
      permission: {
        Row: {
          feature_id: number | null
          id: number
          position_id: number | null
        }
        Insert: {
          feature_id?: number | null
          id?: number
          position_id?: number | null
        }
        Update: {
          feature_id?: number | null
          id?: number
          position_id?: number | null
        }
      }
      position: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      purchase: {
        Row: {
          employee_id: string | null
          established_date: string | null
          id: number
          total_cost: number
        }
        Insert: {
          employee_id?: string | null
          established_date?: string | null
          id?: number
          total_cost?: number
        }
        Update: {
          employee_id?: string | null
          established_date?: string | null
          id?: number
          total_cost?: number
        }
      }
      purchase_detail: {
        Row: {
          amount: number | null
          id: number
          item_id: number | null
          purchase_id: number | null
          unit_price: number | null
        }
        Insert: {
          amount?: number | null
          id?: number
          item_id?: number | null
          purchase_id?: number | null
          unit_price?: number | null
        }
        Update: {
          amount?: number | null
          id?: number
          item_id?: number | null
          purchase_id?: number | null
          unit_price?: number | null
        }
      }
      room: {
        Row: {
          description: string | null
          id: number
          image: string[] | null
          is_active: boolean | null
          room_name: string
          room_type_id: number | null
          status: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          image?: string[] | null
          is_active?: boolean | null
          room_name: string
          room_type_id?: number | null
          status?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          image?: string[] | null
          is_active?: boolean | null
          room_name?: string
          room_type_id?: number | null
          status?: string | null
        }
      }
      room_feature: {
        Row: {
          icon: string | null
          id: number
          name: string | null
        }
        Insert: {
          icon?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          icon?: string | null
          id?: number
          name?: string | null
        }
      }
      room_type: {
        Row: {
          area: number
          bed_amount: number | null
          first_hour_price: number
          hour_price: number
          id: number
          is_active: boolean
          max_customers: number | null
          name: string | null
          one_day_price: number
          overnight_price: number
        }
        Insert: {
          area?: number
          bed_amount?: number | null
          first_hour_price?: number
          hour_price?: number
          id?: number
          is_active?: boolean
          max_customers?: number | null
          name?: string | null
          one_day_price?: number
          overnight_price?: number
        }
        Update: {
          area?: number
          bed_amount?: number | null
          first_hour_price?: number
          hour_price?: number
          id?: number
          is_active?: boolean
          max_customers?: number | null
          name?: string | null
          one_day_price?: number
          overnight_price?: number
        }
      }
      used_room: {
        Row: {
          booking_id: number | null
          id: number
          price: Json
          room_id: number | null
          total_cost: number | null
        }
        Insert: {
          booking_id?: number | null
          id?: number
          price?: Json
          room_id?: number | null
          total_cost?: number | null
        }
        Update: {
          booking_id?: number | null
          id?: number
          price?: Json
          room_id?: number | null
          total_cost?: number | null
        }
      }
      yearly_report: {
        Row: {
          booking_amount: number | null
          customer_amount: number | null
          income: number
          outcome: number
          profit: number
          year: string
        }
        Insert: {
          booking_amount?: number | null
          customer_amount?: number | null
          income?: number
          outcome?: number
          profit?: number
          year: string
        }
        Update: {
          booking_amount?: number | null
          customer_amount?: number | null
          income?: number
          outcome?: number
          profit?: number
          year?: string
        }
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
