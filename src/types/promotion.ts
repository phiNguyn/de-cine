export interface Promotion {
  required_points: number;
  id_promotion : number
  promotion_name: string;
  promotion_point: number;
  promotion_image: string;
  discount_type:  "percent" | "price";
  discount_value: number;
  start_date: Date;
  end_date: Date;
  min_purchase_amount: number;
  max_discount_amount: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;

  
}
