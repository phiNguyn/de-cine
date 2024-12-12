import PromotionAPI from "@/apis/promotion";
import Loader from "@/components/loader";
import { Promotion } from "@/types/promotion";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { API_URL } from "@/constants/api";
import { Checkbox } from "@/components/ui/checkbox";

const PaymentPromotion = ({ id }: { id: number }) => {
    const [promotion, setPromotion] = useState<Promotion[] | []>([]);
    const { data, isLoading } = useQuery({
        queryKey: ['promotions', id],
        queryFn: () => PromotionAPI.getPromotionByIdAccount(id),
        staleTime: 60 * 1000,
    });

    useEffect(() => {
        if (data) {
            setPromotion(data);
        }
    }, [data, setPromotion]);

    return (
        <div className="p-4">
            <div className="mt-4">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-base font-medium text-red-500">
                            Khuyến Mãi của bạn
                        </AccordionTrigger>
                        <AccordionContent>
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <div className="space-y-4">
                                    {promotion.map((promotionItem, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
                                        >
                                            
                                            <div className="flex items-center gap-4">
                                                 <Checkbox id="confirm" />
                                                    <img src={`${API_URL.baseUrl}/${promotionItem.promotion_image}`} alt="" className="w-14"/>

                                                <label
                                                    htmlFor={`promotion-${index}`}
                                                    className="text-sm font-medium text-white"
                                                >
                                                    {promotionItem.promotion_name}
                                                </label>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default PaymentPromotion;