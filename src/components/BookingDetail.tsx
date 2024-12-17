import { Card } from "@/components/ui/card"
import { Booking } from "@/types/Booking"
import { formatDay } from '../containers/AdminTemplate/pages/ListMovie/columns';

import { Select as SelectOne, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BookingAPI from "@/apis/booking";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./ui/button";

const ticket = z.object({
    payment_status: z.string()
});

export type ticketValues = z.infer<typeof ticket>;

export default function MovieTicketConfirmation({ booking }: { booking?: Booking }) {

    const form = useForm<ticketValues>({
        resolver: zodResolver(ticket),
        defaultValues: {
            payment_status: booking?.payment_status || ""
        },
    });

    const dataSubmit = async (data: ticketValues) => {
        const { payment_status } = data
        const updateData = {
            resultCode: payment_status == 'success' ? 0 : 1,
            orderId: booking?.booking_code
        }
        try {
            const resp = await BookingAPI.updateBooking(updateData)
            if (resp.status == 200) {
                toast.success(resp.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(dataSubmit)} className="space-y-8">
                <div className=" bg-gray-100 ">
                    <Card className="max-w-md mx-auto">


                        <div className="p-6 space-y-4">
                            <div>
                                {/* <span className="inline-block bg-yellow-400 text-black text-sm px-2 py-1 rounded">C13</span> */}
                                <h2 className="text-xl font-bold mt-2">{booking?.movie_name}</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Khách hàng</p>
                                    <p>{booking?.account.full_name}: {booking?.account.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">NGÀY CHIẾU</p>
                                    <p>{formatDay(String(booking?.showtime.date_time))}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500 text-sm">PHÒNG CHIẾU</p>
                                    <p>Cinema 4</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">ĐỊNH DẠNG</p>
                                    <p>2D Phụ đề</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">GHẾ</p>
                                {booking?.chairs.map(item => (
                                    <p key={item.id_chair}>{item.chair_name}</p>
                                ))}
                            </div>
                            <div className="space-y-2">
                                {booking?.products?.map(item => (
                                    <div key={item.id_product} className="flex justify-between">
                                        <span>1 x {item.product_name}</span>
                                        <span>{item.price.toLocaleString()}</span>
                                    </div>

                                ))}

                                <div className="flex justify-between font-bold pt-2 border-t">

                                    <FormField
                                        control={form.control}
                                        name="payment_status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Trạng thái thanh toán</FormLabel>
                                                <SelectOne onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Trạng thái" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem className="bg-green-300 text-green-700" value="success">Thành công</SelectItem>
                                                            <SelectItem className="bg-red-300 text-red-700" value="cancel">Hủy vé</SelectItem>
                                                            <SelectItem className="bg-yellow-300 text-yellow-700" value="pending">Đang giao dịch</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </SelectOne>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="flex justify-between font-bold pt-2 border-t">
                                    <span>Tạm tính</span>
                                    <span>{booking?.total_amount.toLocaleString()}đ</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className={`w-full bg-purple-800 text-white py-3 rounded-lg font-medium 
    ${booking?.payment_status === "success" || booking?.payment_status === "cancel" ? "hidden" : "block"}`}
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </Card>
                </div>
            </form>
            <Toaster />
        </Form>
    )
}

