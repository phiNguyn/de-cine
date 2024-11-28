import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from 'lucide-react';
// import VNPAY from "/payment/vnpay.png";
import { Product } from "@/types/product";
import { API_URL } from "@/constants/api";
import { useTicketStore } from "@/store/intex";

interface TableProductProps {
  products: Product[];
}

const TableProduct: React.FC<TableProductProps> = ({ products }) => {
  const { addProduct, selectedProducts, decreaseProductQuantity } = useTicketStore()
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
        <Card key={product.id_product} className="p-3 md:p-4 flex gap-4 shadow-md">
          <img
            src={`${API_URL.baseUrl}/${product.image_product}`}
            alt={product.product_name}
            className="rounded-lg object-cover size-[92px] md:size-[120px]"
          />
          <div className="flex-1 space-y-1 md:space-y-2">
            <h3 className="font-medium">{product.product_name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md md:text-lg">Giá: {product.price.toLocaleString()} đ</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => handleRemoveProduct(product.id_product)}>
                  <Minus className="size-2 md:size-4" />
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
