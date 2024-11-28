import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CircleArrowDown } from "lucide-react"
import Vnpay from "/payment/vnpay.png"
import MOMO from "/payment/momo.png"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import ButtonNext from "../component/Seat/button"
import { useTicketStore } from "@/store/intex"
import Ticket from "../component/Seat/ticket"
import { usePaymentStore } from "@/store/Payments"
import { useQuery } from "@tanstack/react-query"
import PaymentAPI from "@/apis/payment"
import BookingAPI from "@/apis/booking"
import TicketAPI from "@/apis/ticket"

const Payment = () => {

    const { Payment, setPayment } = usePaymentStore((state) => state)
    const { data } = useQuery({
        queryKey: ['payments'],
        queryFn: PaymentAPI.getPayments
    })
    useEffect(() => {
        if (data) {
            setPayment(data)
        }
    }, [data, setPayment])
    let userAccount = null;
    const user = localStorage.getItem('userData')
    if (user) {
        userAccount = JSON.parse(user)
    }

    const { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats, selectedProducts } = useTicketStore()

    const navigate = useNavigate()

    const totalSeatsPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    // Tính tổng tiền sản phẩm đã chọn
    const totalProductsPrice = selectedProducts.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

    // Tính tổng tiền
    const totalPrice = totalSeatsPrice + totalProductsPrice;
    const [selectedMethod, setSelectedMethod] = useState("VNPAY")
    const handleProceed = async () => {
        navigate('/payments ', { state: { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats } });


        try {
            const ticketData = {
                id_showtime: 1,
                id_chair: 1,
                status: "ddddd"
            }

            const ticketCreate = await TicketAPI.createTicket(ticketData)
            const data = {
                account_promotion_id: Number(userAccount.id_account),
                id_product: selectedProducts.map((product) => product.product.id_product),
                id_ticket: ticketCreate.id,
                id_payment: 1,
                quantity: 1,
                total_amount: totalPrice,
                payment_status: "Đang thanh toán",
                booking_code: "DEVCIEN-" + userAccount.id_account + Date.now(),
                transaction_id: "DEVCIEN-" + userAccount.id_account + Date.now(),
                payment_date: new Date(),
            }
            const BookingCreate = await BookingAPI.createTicket(data)

        } catch (error) {
            console.log(error);

        }


    };
    return (
        <div>
            <div className=" md:mx-auto  lg:max-w-7xl md:max-w-4xl px-10 md:px-10  grid lg:grid-cols-3 grid-cols-1">
                <div className="col-span-2  xl:h-full h-full overflow-hidden xl:overflow-auto xl:pb-10">
                    <div className="p-4">
                        <h3 className="text-l mb-4 font-semibold">Khuyến mãi</h3>
                        <div className="md:mt-4 mt-2">
                            <div className="mt-4 grid grid-cols-2 gap-4 xl:w-2/3 w-full">
                                <div className="col-span-1">
                                    <label htmlFor="voucher-code" className="inline-block mb-1 text-black-10 text-sm font-bold">Mã khuyến mãi</label>
                                    <Input id="voucher-code" type="text" className="border-primary w-full py-2 px-4" />
                                </div>
                                <div className="col-span-1 flex ml-auto mt-7">
                                    <Button variant={"primary"} type="button" size={"default"}>Áp dụng</Button>

                                </div>
                            </div>
                            <p className="text-s text-grey-40 mt-2">
                                Lưu ý: Có thể áp dụng nhiều vouchers vào 1 lần thanh toán
                            </p>
                            <div className="md:mt-4 mt-2 ">
                                <div className="xl:w-2/3 w-full flex justify-between items-center cursor-pointer gap-4">
                                    <h4 className="flex mb-4 text-black-10 text-sm font-bold cursor-pointer gap-x-5">
                                        Khuyến mãi của bạn
                                        <CircleArrowDown />

                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 mt-8">
                        <h3 className="text-l mb-4 font-semibold">
                            Phương thức thanh toán
                        </h3>
                        <div className="my-4">
                            <RadioGroup
                                value={selectedMethod}
                                onValueChange={setSelectedMethod}
                                className="space-y-3"
                            >
                                {Payment.map(payment => (

                                    <div key={payment.id_payment}
                                        className={`
                                    border  rounded-lg cursor-pointer transition-all
                                    ${selectedMethod === payment.name ? 'border-yellow-500' : 'hover:border-yellow-500'}
                                  `}
                                        onClick={() => setSelectedMethod(payment.name)}
                                    >

                                        <Label
                                            htmlFor={payment.name}
                                            className="flex items-center space-x-3 px-4 py-3 cursor-pointer"
                                        >
                                            <RadioGroupItem value={payment.name} id={payment.name} className="sr-only" />
                                            <div className="w-8 h-8 flex items-center justify-center rounded">
                                                <img src={payment.name == "Momo" ? MOMO : Vnpay} alt="" />
                                            </div>
                                            <span className=" group-data-[state=checked]:text-[#1a1b35]">Thanh toán qua {payment.name}</span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="mt-8 text-sm"></div>
                    </div>
                </div>
                <div className="col-span-1 xl:pl-4  py-4">
                    {/* <BookingInfo title="Thanh toán" /> */}
                    <Ticket >
                        <ButtonNext onclick={handleProceed} text="Thanh Toán" />

                    </Ticket>
                </div>
            </div>
        </div>
    )
}

export default Payment