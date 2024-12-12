import Vnpay from "/payment/vnpay.png"
import MOMO from "/payment/momo.png"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import ButtonNext from "../component/Seat/button"
import { useTicketStore } from "@/store/intex"
import Ticket from "../component/Seat/ticket"
import { Payment, usePaymentStore } from "@/store/Payments"
import { useQuery } from "@tanstack/react-query"
import PaymentAPI from "@/apis/payment"
import BookingAPI from "@/apis/booking"
import TicketAPI from "@/apis/ticket"
import moment from "moment-timezone"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { BookingDialog } from "../component/Payments/Payment"
import Loader from "@/components/loader"
import PaymentPromotion from "../component/Payments/PaymentPromiont"
const PaymentPage = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedMethod, setSelectedMethod] = useState<Payment | null>(null)
    const { Payment, setPayment } = usePaymentStore((state) => state)
    const { data } = useQuery({
        queryKey: ['payments'],
        queryFn: PaymentAPI.getPayments,
        staleTime: 5 * 60 * 1000
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

    const { selectedShowDate, selectedSeats, selectedProducts, clearTicketData } = useTicketStore()
    const totalSeatsPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    // Tính tổng tiền sản phẩm đã chọn
    const totalProductsPrice = selectedProducts.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

    // Tính tổng tiền
    const totalPrice = totalSeatsPrice + totalProductsPrice;
    const handleCheckPaymentMothod = () => {
        if (!selectedMethod?.id_payment) {
            return toast.error('Vui lòng chọn phương thức thanh toán')
        }
        setOpen(true)
    }
    const handleProceed = async () => {
        setIsLoading(true)
        try {
            const ticketData = {
                id_showtime: Number(selectedShowDate?.id_showtime),
                id_chairs: selectedSeats.map((chair) => chair.id_chair),
                status: "pending"
            }
            const ticketCreate = await TicketAPI.createTicket(ticketData)
            const data = {
                account_id: Number(userAccount.id_account),
                account_promotion_id: null,
                id_products: selectedProducts.map((product) => ({
                    id_product: product.product.id_product,
                    quantity: product.quantity
                })),
                id_ticket: ticketCreate.id_ticket,
                id_payment: selectedMethod?.id_payment,
                total_amount: totalPrice,
                payment_status: "pending",
                booking_code: "DEVCIEN" + userAccount.id_account + "_" + Date.now(),
                transaction_id: "DEVCIEN-" + userAccount.id_account + Date.now(),
                booking_date: moment.tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD HH:mm:ss'),
            }
            const dataPayment = {
                booking_code: data.booking_code,
                total_amount: data.total_amount
            }
            const BookingCreate = await BookingAPI.createTicket(data)
            if (BookingCreate?.status == 201) {

                if (selectedMethod?.name == 'VNPAY') {
                    const VNPAY = await PaymentAPI.createPaymentVNPAY(dataPayment)
                    if (VNPAY.code == "00") {
                        clearTicketData()
                        window.location.href = VNPAY.data
                    }

                } else {
                    const MOMOPAY = await PaymentAPI.createPaymentMOMO(dataPayment)
                    clearTicketData()
                    window.location.href = MOMOPAY.payUrl
                }

            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    };


    const handleBack = () => {
        navigate('/products')
    }

    if (isLoading) return <Loader />
    return (
        <div>
            <div className=" md:mx-auto  lg:max-w-7xl md:max-w-4xl px-10 md:px-10  grid lg:grid-cols-3 grid-cols-1">
                <div className="col-span-2  xl:h-full h-full overflow-hidden xl:overflow-auto xl:pb-10">

                    <PaymentPromotion id={userAccount.id_account}/>    

                    <div className="p-4 mt-8">
                        <h3 className="text-l mb-4 font-semibold">
                            Phương thức thanh toán
                        </h3>
                        <div className="my-4">
                            <RadioGroup
                                value={selectedMethod?.name}
                                onValueChange={() => setSelectedMethod}
                                className="space-y-3"
                            >
                                {Payment.map(payment => (

                                    <div key={payment.id_payment}
                                        className={`
                                    border  rounded-lg cursor-pointer transition-all
                                    ${selectedMethod?.name === payment.name ? 'border-yellow-500' : 'hover:border-yellow-500'}
                                  `}
                                        onClick={() => setSelectedMethod({ name: payment.name, id_payment: payment.id_payment })}
                                    >

                                        <Label
                                            htmlFor={payment.name}
                                            className="flex items-center space-x-3 px-4 py-3 cursor-pointer"
                                        >
                                            <RadioGroupItem value={payment.name} id={payment.name} className="sr-only" />
                                            <div className="w-8 h-8 flex items-center justify-center rounded">
                                                <img src={payment.name == "MOMO" ? MOMO : Vnpay} alt="" />
                                            </div>
                                            <span className=" group-data-[state=checked]:text-[#1a1b35]">Thanh toán qua {payment.name}</span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        {/* <div className="mt-8 text-sm flex justify-between" >
                            <Checkbox/><div></div>
                        </div> */}
                    </div>
                </div>
                <div className="col-span-1 xl:pl-4  py-4">
                    {/* <BookingInfo title="Thanh toán" /> */}
                    <Ticket handleProceed={handleCheckPaymentMothod} handleBack={handleBack}>
                        <ButtonNext onClick={handleCheckPaymentMothod} text="Thanh toán" />
                    </Ticket>
                    <BookingDialog  onBooking={handleProceed} open={open} onOpenChange={setOpen} />
                </div>

            </div>
        </div>
    )
}

export default PaymentPage