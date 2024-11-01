export interface User {
  id_account: number;
  user_name: string;
  email: string;
  full_name: string;
  phone?: string;
  role: string;
  loyalty_points?: number;
  created_at?: Date;
  updated_at?: Date;
}


export interface UserLogin {
    user_name: string;
  password: string;
}

export interface UserRegister {
  user_name: string;
  email: string;
  full_name: string;
  password: string;
  confirm_password: string;
  phone?: string; 
  role: string;
  loyalty_points?: number; // Đánh dấu là tùy chọn
}

