import PromotionAPI from "@/apis/promotion";
import Loader from "@/components/loader";
import { Promotion } from "@/types/promotion";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { API_URL } from "@/constants/api";
import { Label } from "@/components/ui/label";
import { useTicketStore } from "@/store/intex";
import { useState } from "react";

const PaymentPromotion = ({ id, onChange }: { id: number, onChange?: (promotion: Promotion | null) => void }) => {
    const { setTicketData, selectedSeats, selectedProducts } = useTicketStore((state) => state);
    const [selectPromotion, setSelectPromotion] = useState<Promotion | null>(null)
    const { data, isLoading } = useQuery({
        queryKey: ['promotions', id],
        queryFn: () => PromotionAPI.getPromotionByIdAccount(id),
        staleTime: 5 * 60 * 1000,
    });

    const promotion: Promotion[] = data || [];

    const handleChangePromotion = (promotion: Promotion) => {
        setTicketData({
            selectedPromotion: promotion
        })
        setSelectPromotion(promotion)
        if (onChange) {
            onChange(promotion);
        }
    };

    const totalSeatsPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    // Tính tổng tiền sản phẩm đã chọn
    const totalProductsPrice = selectedProducts.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

    // Tính tổng tiền
    const totalPrice = totalSeatsPrice + totalProductsPrice;
    const renderPromotionItem = (item: Promotion) => {
        const isSelected = selectPromotion?.id_promotion === item.id_promotion;

        return (
            <div
                key={item.id_promotion}
                className={`border border-primary rounded-lg cursor-pointer transition-all w-auto 
                    ${isSelected ? 'border-yellow-700 bg-yellow-300' : 'hover:border-yellow-500'}
                `}
            >
                <Label
                    htmlFor={item.promotion_name}
                    className="flex items-center space-x-3 px-4 py-3 cursor-pointer"
                >
                    <RadioGroupItem disabled={item.min_purchase_amount > totalPrice ? true : false} value={String(item.id_promotion)} id={item.promotion_name} className="sr-only" />
                    <div className="w-8 h-8 flex items-center justify-center rounded">
                        <img
                            src={`${API_URL.baseUrl}/${item.promotion_image}`}
                            alt="Mã khuyến mãi"
                        />
                    </div>
                    {item.discount_type === "fixed" ? (
                        <span>
                            Khuyến mãi áp dụng cho đơn hàng từ: {item.min_purchase_amount?.toLocaleString() || '0'} giảm tối đa đến {item.max_discount_amount?.toLocaleString() || '0'}
                        </span>
                    ) : (
                        <span>
                            Khuyến mãi áp dụng cho đơn hàng từ: {item.min_purchase_amount?.toLocaleString() || '0'} giảm {item.discount_value}% giảm tối đa: {item.max_discount_amount?.toLocaleString() || '0'}
                        </span>
                    )}
                </Label>
            </div>
        );
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!promotion || promotion.length === 0) {
        return <p>Không có khuyến mãi nào áp dụng.</p>;
    }

    return (
        <div className="mt-4 px-4">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base font-medium text-red-500">
                        Khuyến Mãi của bạn
                    </AccordionTrigger>
                    <AccordionContent>
                        <RadioGroup
                            value={String(selectPromotion?.id_promotion || '')}
                            onValueChange={(value) => {
                                const selected = promotion.find(promo => promo.id_promotion === Number(value));
                                if (selected) {
                                    handleChangePromotion(selected);
                                }
                            }}
                            className="space-y-3"
                        >
                            {promotion.map(renderPromotionItem)}
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default PaymentPromotion;
