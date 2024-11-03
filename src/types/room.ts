export interface Room {
  id_room: number;
  room_name:string;
  room_status: string;
  room_type ?: string;
  chair_number: number;
  created_at ?: Date;
  updated_at ?: Date;
}
