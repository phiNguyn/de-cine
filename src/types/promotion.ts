export interface Promotion {
    id_promotion : number
  promotion_name: string;
  discount_type: "percent" | "price";
  discount_value: number;
  start_date: Date;
  end_date: Date;
  min_purchase_amount: number;
  max_discount_amount: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}
