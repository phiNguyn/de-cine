import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from 'lucide-react';
// import VNPAY from "/payment/vnpay.png";
import { Product } from "@/types/product";
import { useProductStore } from "@/store/Products";
import { API_URL } from "@/constants/api";

interface TableProductProps {
  products: Product[];
}

const TableProduct: React.FC<TableProductProps> = ({ products }) => {
  const { addProduct, decreaseProductQuantity, selectedProducts } = useProductStore();

  const handleAddProduct = (product: Product) => {
    addProduct(product);
  };

  const handleRemoveProduct = (productId: number) => {
    decreaseProductQuantity(productId);
  };

  const getQuantity = (productId: number) => {
    const product = selectedProducts.find((p) => p.product.id_product === productId);
    return product ? product.quantity : 0;
  };

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id_product} className="p-4 flex gap-4 shadow-md">
          <img
             src={`${API_URL.baseUrl}/${product.image_product}`}
            alt={product.product_name}
            width={120}
            height={120}
            className="rounded-lg object-cover"
          />
          <div className="flex-1 space-y-2">
            <h3 className="font-medium">{product.product_name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Giá: {product.price.toLocaleString()} đ</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => handleRemoveProduct(product.id_product)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{getQuantity(product.id_product)}</span>
                <Button variant="outline" size="icon" onClick={() => handleAddProduct(product)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TableProduct;
