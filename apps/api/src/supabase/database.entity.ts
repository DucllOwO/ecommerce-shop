import type { Database } from "db_types";

export type RoomType = Database['public']['Tables']['room_type']['Row'];
export type Room = Database['public']['Tables']['room']['Row'];