import BookingAPI from "@/apis/booking";
import MovieTicketConfirmation from "@/components/BookingDetail";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// const formSchema = z.object({
//     id_booking: z.number().optional(),
//     account_promotion_id: z.number().nullable(),
//     account_id: z.number(),
//     id_payment: z.number(),
//     id_ticket: z.number(),
//     booking_code: z.string(),
//     booking_date: z.string(),
//     total_amount: z.number(),
//     payment_status: z.string(),
//     transaction_id: z.string(),
//     payment_date: z.string(),
//     status: z.string()
// })
// export type BookingFormValues = z.infer<typeof formSchema>;

const EditTicket = ({ selectedId, onClose }: { selectedId: number, onClose?: () => void }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['BookingDetail', selectedId],
        queryFn: () => BookingAPI.getBookingDetail(selectedId),
        staleTime: 30 * 1000
    })
    return (
        <div>
            {isLoading ? <Loader /> :
                <>
                    <MovieTicketConfirmation booking={data} />
                    <div className="flex justify-between">
                        <Button variant={"outline"} onClick={onClose}>Đóng</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default EditTicket