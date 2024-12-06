import { Card } from "@/components/ui/card"
import { Booking } from "@/types/Booking"

export default function MovieTicketConfirmation({ booking }: { booking?: Booking }) {
    return (
        <div className=" bg-gray-100 p-4">
            <Card className="max-w-md mx-auto">
                <div className="bg-purple-800 text-white p-4 rounded-t-lg">
                    <button className="mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-medium">Combo - Bắp nước</h1>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <span className="inline-block bg-yellow-400 text-black text-sm px-2 py-1 rounded">C13</span>
                        <h2 className="text-xl font-bold mt-2">{booking?.ticket?.showtime.movie.movie_name}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">THỜI GIAN</p>
                            <p>14:50 ~ 16:36</p>
                        </div>
                        <div>
                            <p className="text-gray-500">NGÀY CHIẾU</p>
                            <p>{String(booking?.ticket?.showtime.date_time)}</p>
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
                        {booking?.ticket?.chairs.map(item => (
                            <p key={item.id_chair}>{item.chair_name}</p>
                        ))}
                    </div>

                    <div className="space-y-2">
                        {booking?.products?.map(item=> (
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

