export interface ChairByShowtime extends ChairBooking {
  chair_status: string;
  column: number;
  row: string;
}

export interface Chair extends ChairByShowtime {
  id_room?: number;
}

export interface ChairBooking {
  id_chair: number;
  chair_name: string;
  price: number;
}
