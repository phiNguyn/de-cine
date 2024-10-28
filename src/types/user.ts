export interface User {
  id_account ?: number;
  user_name: string;
  email: string;
  full_name: string;
  phone: string;
  role: string;
  loyalty_points: number | undefined;
  created_at ?: Date;
  updated_at ?: Date;
}

export interface UserLogin {
    user_name: string;
  password: string;
}
