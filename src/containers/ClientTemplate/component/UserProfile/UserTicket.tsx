import BookingAPI from "@/apis/booking";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StorageKeys } from "@/constants/StorageKeys";
import { Booking } from "@/types/Booking";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export default function UserTabs() {
    const userData = JSON.parse(localStorage.getItem(StorageKeys.USERDATA) || '{}');
    const id = userData.id_account
    const [Bookings, setBookings] = useState<Booking[] | []>([])

    const { data, isLoading } = useQuery({
        queryKey: ["BookingAccount", id],
        queryFn: () => BookingAPI.getBookingsByAccountId(id),
        staleTime: 60 * 1000,

    })
    useEffect(() => {
        if (data) {
            setBookings(data)
        }
    }, [data, setBookings])

    if (isLoading) return <Loader />
    return (
        <>
            <CardContent className="col-span-1 xl:col-span-3 p-0  shadow-lg">
                <Table>
                    <TableHeader className="border border-border">
                        <TableRow className=" ">
                            <TableHead>Mã vé</TableHead>
                            <TableHead>Phim</TableHead>
                            <TableHead>Thời gian đặt</TableHead>
                            <TableHead className="text-left">Số ghế</TableHead>
                            <TableHead className="text-left">Sản phẩm</TableHead>
                            <TableHead className="text-right">Tổng tiền</TableHead>
                            <TableHead className="text-right">Giảm giá</TableHead>
                            <TableHead className="text-right">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border border-border">
                        {Bookings.map((item) => (
                            <TableRow key={item.id_booking}>
                                <TableCell className="font-mono">{item.booking_code}</TableCell>
                                <TableCell className="font-mono">{item.ticket?.showtime.movie.movie_name}</TableCell>
                                <TableCell>{item.booking_date}</TableCell>
                                <TableCell className="text-left">

                                    <div className="flex gap-x-2 justify-between" >
                                        {item.ticket?.chairs.map(item => (
                                            <Button variant={"primary"} size={"icon"} key={item.id_chair}>
                                                {item.chair_name}
                                            </Button>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-left">

                                    <div className="grid grid-cols-1 gap-y-1 justify-between" >
                                        {item.products?.map(item => (
                                            <div key={item.id_product} className=" bg-yellow-500 px-2 py-1 rounded-md text-primary">
                                               {item.product_name} x {}
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">{FormatPrice(item.total_amount)}</TableCell>
                                <TableCell className="text-right">0</TableCell>
                                <TableCell className="text-right"> <div className={`text-center px-1 py-2 rounded-lg font-medium 
        ${item.status === 'success' ? "bg-green-200 text-green-800"
                                        : item.status === 'pending' ? "text-yellow-700 bg-yellow-200" : "text-red-700 bg-red-200"} }`}>
                                    {item.status === 'success' ? "Thành công" : item.status === 'pending' ? "Đang giao dịch" : "Đã hủy"}</div></TableCell>
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