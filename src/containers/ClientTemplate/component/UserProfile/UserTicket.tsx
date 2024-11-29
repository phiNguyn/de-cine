import BookingAPI from "@/apis/booking";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBooking } from "@/store/Booking";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export default function UserTabs() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const id = userData.id_account
    const { Booking, setBooking } = useBooking((state) => state)
    const { data, isLoading } = useQuery({
        queryKey: ["BookingAccount", id],
        queryFn: () => BookingAPI.getBookingsByAccountId(id),
        staleTime: 60 * 1000,

    })
    useEffect(() => {
        if (data) {
            setBooking(data)
        }
    }, [data, setBooking])

    if (isLoading) return <Loader />
    return (
        <>
            <CardContent className="col-span-1 xl:col-span-3 p-0 ">
                <Table>
                    <TableHeader className="border border-border">
                        <TableRow className=" ">
                            <TableHead>Mã vé</TableHead>
                            <TableHead>Phim</TableHead>
                            <TableHead>Thời gian đặt</TableHead>
                            <TableHead className="text-left">Số ghế</TableHead>
                            <TableHead className="text-right">Tổng tiền</TableHead>
                            <TableHead className="text-right">Giảm giá</TableHead>
                            <TableHead className="text-right">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border border-border">
                        {Booking.map((item) => (
                            <TableRow key={item.id_booking}>
                                <TableCell className="font-mono">{item.booking_code}</TableCell>
                                <TableCell className="font-mono">{item.ticket.showtime.movie.movie_name}</TableCell>
                                <TableCell>{item.booking_date}</TableCell>
                                <TableCell className="text-left">

                                    <div className="flex gap-x-2 justify-between" >
                                        {item.ticket.chairs.map(item => (
                                            <Button variant={"primary"} size={"icon"} key={item.id_chair}>
                                                {item.chair_name}
                                            </Button>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">{FormatPrice(item.total_amount)}</TableCell>
                                <TableCell className="text-right">0</TableCell>
                                <TableCell className="text-right">{item.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <div className="p-4 border-t">
                <div className="flex flex-col gap-2 items-end text-sm">
                <div className="flex gap-8">
                <span className="text-muted-foreground ">Tổng số lượng:</span>
                <span className="w-14 text-right">{Qty}</span>
                </div>
                <div className="flex gap-8">
                <span className="text-muted-foreground">Tổng tiền hàng:</span>
                <span className="w-14 text-right">{FormatPrice(Number(Invoice?.total) + Number(Invoice?.discount))}</span>
                </div>
                <div className="flex gap-8">
                <span className="text-muted-foreground">Giảm giá hóa đơn:</span>
                <span className="w-14 text-right">{FormatPrice(Number(Invoice?.discount))}</span>
                </div>
                <div className="flex gap-8">
                <span className="text-muted-foreground">Khách cần trả:</span>
                <span className="font-medium w-14 text-right">{FormatPrice(Number(Invoice?.totalPayment))}</span>
                </div>
                <div className="flex gap-8">
                <span className="text-muted-foreground">Khách đã trả:</span>
                <span className="w-14 text-right">{FormatPrice(Number(Invoice?.totalPayment))}</span>
                </div>
                </div>
                <div className="mt-6 flex justify-end">
                
                </div>
                </div> */}
            </CardContent>
        </>
    )
}

export function FormatPrice(price: number) {
    return price.toLocaleString()
}