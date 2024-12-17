import BookingAPI from "@/apis/booking";
import MovieTicketConfirmation from "@/components/BookingDetail";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

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