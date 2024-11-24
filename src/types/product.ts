export interface Product {
  id_product: number;
  product_name: string;
  description?: string | null;
  image_product : string | null
  price: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
