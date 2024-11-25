import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CircleArrowDown } from "lucide-react"
import Vnpay from "/payment/vnpay.png"
import MOMO from "/payment/momo.png"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import ButtonNext from "../component/Seat/button"
import Ticket from "../component/Seat/ticket"
import { useTicketStore } from "@/store/intex"

const Payment = () => {
    const { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats } = useTicketStore()

    const navigate = useNavigate()


    const handleProceed = () => {
        navigate('/payments ', { state: { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats } });
    };
    const [selectedMethod, setSelectedMethod] = useState("momo")
    return (
        <div>
            <div className=" md:mx-auto  lg:max-w-7xl md:max-w-4xl md:px-0 sm:px-[45px]  grid xl:grid-cols-3 grid-cols-1">
                <div className="col-span-2 xl:order-first order-last xl:h-full h-full overflow-hidden xl:overflow-auto xl:pb-10 pb-32">
                    <div className="p-4">
                        <h3 className="text-l mb-4 font-semibold">Khuyến mãi</h3>
                        <div className="md:mt-4 mt-2">
                            <form >
                                <div className="mt-4 grid grid-cols-2 gap-4 xl:w-2/3 w-full">
                                    <div className="col-span-1">
                                        <label htmlFor="voucher-code" className="inline-block mb-1 text-black-10 text-sm font-bold">Mã khuyến mãi</label>
                                        <Input id="voucher-code" type="text" className="border-primary w-full py-2 px-4" />
                                    </div>
                                    <div className="col-span-1 flex items-start mt-7">
                                        <Button variant={"primary"} type="button" size={"default"}>Áp dụng</Button>

                                    </div>
                                </div>
                                <p className="text-s text-grey-40 mt-2">
                                    Lưu ý: Có thể áp dụng nhiều vouchers vào 1 lần thanh toán
                                </p>
                            </form>
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
                                <div
                                    className={`
                                    border  rounded-lg cursor-pointer transition-all
                                    ${selectedMethod === "vnpay" ? 'border-yellow-500' : 'hover:border-yellow-500'}
                                  `}
                                    onClick={() => setSelectedMethod("vnpay")}
                                >

                                    <Label
                                        htmlFor="vnpay"
                                        className="flex items-center space-x-3 px-4 py-3 cursor-pointer"
                                    >
                                        <RadioGroupItem value="vnpay" id="vnpay" className="sr-only" />
                                        <div className="w-8 h-8 flex items-center justify-center rounded">
                                            <img src={Vnpay} alt="" />
                                        </div>
                                        <span className=" group-data-[state=checked]:text-[#1a1b35]">Thanh toán qua VNPAY</span>
                                    </Label>
                                </div>
                                <div
                                    className={`
                                    border  rounded-lg cursor-pointer transition-all
                                    ${selectedMethod === "momo" ? 'border-yellow-500' : 'hover:border-yellow-500'}
                                  `}
                                    onClick={() => setSelectedMethod("momo")}
                                >

                                    <Label
                                        htmlFor="momo"
                                        className="flex items-center space-x-3 px-4 py-3 cursor-pointer"
                                    >
                                        <RadioGroupItem value="momo" id="momo" className="sr-only" />
                                        <div className="w-8 h-8 flex items-center justify-center rounded">
                                            <img src={MOMO} className="w-auto" alt="" />
                                        </div>
                                        <span className=" group-data-[state=checked]:text-[#1a1b35]">Thanh toán qua MOMO</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="mt-8 text-sm"></div>
                    </div>
                </div>
                <div className="col-span-1 xl:pl-4 xl:order-none order-first py-4">
                    {/* <BookingInfo title="Thanh toán" /> */}
                    <Ticket>
                        <ButtonNext onclick={handleProceed} text="Thanh Toán" />

                    </Ticket>
                </div>
            </div>
        </div>
    )
}

export default Payment