import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import promotionAPI from "@/apis/promotion";
import { Loader2 } from "lucide-react";
import { usePromotionStore } from "@/store/Promotion";

const formSchema = z.object({
    id_promotion: z.number().optional(),
    promotion_name: z.string().min(5, { message: "Tên khuyến mãi phải có ít nhất 5 ký tự." }),
    promotion_point: z.number().min(0, { message: "Điểm khuyến mãi không hợp lệ." }),
    discount_type: z.enum(["percent", "price"], { required_error: "Chọn loại giảm giá." }),
    discount_value: z.number().min(1, { message: "Giá trị giảm không hợp lệ." }),
    start_date: z.string().refine((date) => !isNaN(new Date(date).getTime()), { message: "Ngày bắt đầu không hợp lệ." }),
    end_date: z.string().refine((date) => !isNaN(new Date(date).getTime()), { message: "Ngày kết thúc không hợp lệ." }),
    min_purchase_amount: z.number().min(0, { message: "Giá trị mua tối thiểu không hợp lệ." }),
    max_discount_amount: z.number().min(0, { message: "Giá trị giảm giá tối đa không hợp lệ." }),
    description: z.string().optional(),

});

export type PromotionFormValues = z.infer<typeof formSchema>;

const EditPromotion = ({ selectedId, onClose }: { selectedId: number; onClose?: () => void }) => {
    const { getPromotionById, updatePromotion } = usePromotionStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const promotion = getPromotionById(selectedId);
    const form = useForm<PromotionFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id_promotion: promotion?.id_promotion,
            promotion_name: promotion?.promotion_name || "",
            promotion_point: promotion?.promotion_point || 0,
            discount_type: promotion?.discount_type || "percent",
            discount_value: promotion?.discount_value || 0,
            start_date: promotion?.start_date ? new Date(promotion.start_date).toISOString().split("T")[0] : "", // Chuyển đổi thành chuỗi yyyy-MM-dd
            end_date: promotion?.end_date ? new Date(promotion.end_date).toISOString().split("T")[0] : "", // Tương tự
            min_purchase_amount: promotion?.min_purchase_amount || 0,
            max_discount_amount: promotion?.max_discount_amount || 0,
            description: promotion?.description || "",

        },
    });

    async function dataSubmit(data: PromotionFormValues) {
        setIsLoading(true);
        try {
            const response = await promotionAPI.updatePromotion(Number(promotion?.id_promotion), data);
            if (response?.status === 200) {
                updatePromotion(response);
                onClose?.();
                toast.success("Cập nhật khuyến mãi thành công");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(dataSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 gap-y-5">

                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="promotion_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên khuyến mãi</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="promotion_point"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Điểm khuyến mãi</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                min={0}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="discount_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Loại giảm giá</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="border border-gray-300 rounded-md p-2 text-black"
                                            >
                                                <option value="percent">Phần trăm</option>
                                                <option value="price">Giá trị</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="discount_value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Giá trị giảm</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                min={1}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="start_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ngày bắt đầu</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="date" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="end_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ngày kết thúc</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="date" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="min_purchase_amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Giá trị mua tối thiểu</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                min={0}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="max_discount_amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Giá trị giảm giá tối đa</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                min={0}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex">

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <textarea
                                                {...field}
                                                className="border border-gray-300 rounded-md p-2 w-full text-black"
                                                rows={3}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                       
                    </div>
                    <div className="flex justify-between">
                        <Button disabled={isLoading} type="submit">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang cập nhật khuyến mãi
                                </>
                            ) : (
                                "Cập nhật"
                            )}
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Đóng
                        </Button>
                    </div>
                </form>
            </Form>
            <Toaster />
        </>
    );
};

export default EditPromotion;
