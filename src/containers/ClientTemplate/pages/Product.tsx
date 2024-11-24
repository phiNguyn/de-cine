import productAPI from "@/apis/product"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useProductStore } from "@/store/Products"
import { useQuery } from "@tanstack/react-query"
import { Minus, Plus } from 'lucide-react'
import { useEffect } from "react"

import { API_URL } from "@/constants/api"

export default function Product() {
    const { Product, setProduct } = useProductStore((state) => state)
    const { data } = useQuery({
        queryKey: ['productsActive'],
        queryFn: () => productAPI.getAllProductActive(true)
    })

    useEffect(() => {
        if (data) {
            setProduct(data)
        }
    }, [data, setProduct])
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-semibold mb-6">Chọn Combo</h2>
                    <div className="space-y-4">
                        {Product.map((product) => (
                            <Card key={product.id_product} className="p-4 flex gap-4">
                                <img
                                    src={`${API_URL.baseUrl}/${product.image_product}`}
                                    alt={product.product_name}
                                    className="rounded-lg object-cover size-[120px]"
                                />
                                <div className="flex-1 space-y-2">
                                    <h3 className="font-medium">{product.product_name}</h3>
                                    <p className="text-sm text-muted-foreground">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Giá: {product.price.toLocaleString()} đ</span>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon">
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">0</span>
                                            <Button variant="outline" size="icon">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>


                {/* nay mau do V0  */}
                {/* <div className="mt-6 md:mt-0">
                    <Card className="p-6">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <img
                                    src="/placeholder.svg"
                                    alt="Movie Poster"
                                    width={120}
                                    height={160}
                                    className="rounded-lg"
                                />
                                <div>
                                    <h3 className="font-semibold">Linh Miều: Quỷ Nhập Trang</h3>
                                    <span className="inline-block px-2 py-1 bg-orange-500 text-white text-sm rounded mt-2">
                                        2D Phụ Đề - T18
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Galaxy Nguyễn Du - RAP 3</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Suất: 17:15 - Thứ Sáu, 22/11/2024</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>1x Người Lớn - Member</span>
                                    <span>95.000 đ</span>
                                </div>
                                <div className="text-sm">
                                    <span>Ghế: L1</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between font-semibold">
                                    <span>Tổng cộng</span>
                                    <span className="text-orange-500">95.000 đ</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1">
                                    Quay lại
                                </Button>
                                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                                    Tiếp tục
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div> */}
                {/*  */}
            </div>
        </div>
    )
}

