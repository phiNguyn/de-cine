export interface ProductItem {
  id_product: number;
  product_name: string;
  price: number;
  quantity?: number;
  image_product: string | null;
}

export interface Product extends ProductItem {
  description?: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
