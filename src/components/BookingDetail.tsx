import { Card } from "@/components/ui/card"
import { Booking } from "@/types/Booking"

export default function MovieTicketConfirmation({ booking }: { booking?: Booking }) {
    return (
        <div className=" bg-gray-100 ">
            <Card className="max-w-md mx-auto">


                <div className="p-6 space-y-4">
                    <div>
                        {/* <span className="inline-block bg-yellow-400 text-black text-sm px-2 py-1 rounded">C13</span> */}
                        <h2 className="text-xl font-bold mt-2">{booking?.movie_name}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">THỜI GIAN</p>
                            <p>14:50 ~ 16:36</p>
                        </div>
                        <div>
                            <p className="text-gray-500">NGÀY CHIẾU</p>
                            <p>{String(booking?.showtime.date_time)}</p>
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
                            <div className="flex justify-between">
                                <span>1 x {item.product_name}</span>
                                <span>{item.price.toLocaleString()}</span>
                            </div>

                        ))}

                        <div className="flex justify-between font-bold pt-2 border-t">
                            <span>Tạm tính</span>
                            <span>{booking?.total_amount.toLocaleString()}đ</span>
                        </div>
                    </div>




                    <button className="w-full bg-purple-800 text-white py-3 rounded-lg font-medium">
                        Tiếp tục
                    </button>
                </div>
            </Card>
        </div>
    )
}

