export interface Product {
  id_product: number;
  product_name: string;
  price: 116000;
  description?: string | null;
  image_product : string | null
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
