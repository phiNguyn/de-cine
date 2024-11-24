export interface Product {
  id_product: number;
  product_name: string;
  price: number;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  image_product: string
}
