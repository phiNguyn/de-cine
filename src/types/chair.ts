export interface ChairByShowtime {
  chair_status: string;
  column: number;
  row: string;
  id: number;
  id_chair: number;
  chair_name: string;
  price: number;
}

export interface Chair {
  id_room?: number;
  chair_status: string;
  column: number;
  row: string;
  id: number;
  id_chair: number;
}

export interface ChairBooking {
  id_chair: number;
  chair_name: string;
  price: number;
}
