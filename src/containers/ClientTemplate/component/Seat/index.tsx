import { Button } from "@/components/ui/button";
import { Chair } from "@/types/chair"

const Seats: React.FC<{ showChair: Chair[] | null }> = ({ showChair }) => {
    const alpha = Array.from({ length: 6 }, (_, index) => String.fromCharCode(65 + index));
    console.log(alpha);
    
    return (
        <div className="flex mt-10">
            <div className="">
                <div className="flex justify-center mb-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-blue-600 mr-2"></div>
                            Ghế đã bán
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-300 mr-2"></div>
                            Ghế trống
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-yellow-400 mr-2"></div>
                            Ghế đang chọn
                        </div>
                    </div>
                </div>
                <img
                    src="/img/ic-screen.png"
                    alt="sceen"
                    className="w-auto mt-6"
                />
                <div className="grid grid-cols-[90%_10%] gap-x-5 items-center px-5">

                    <div className="grid grid-cols-10 gap-1 md:gap-2 w-fit justify-center mx-auto">

                        {showChair?.map((seat) => (
                            <div key={seat.id_chair} className="group">
                                <button
                                    className={` 
${seat.chair_status === 'sold'
                                            ? "bg-blue-500 hover:bg-none cursor-default"
                                            : seat.chair_status === 'pending'
                                                ? "bg-yellow-300"
                                                : "bg-gray-300 group-hover:bg-yellow-300 group-active:bg-yellow-300"}

size-6 text-xs md:size-10 md:text-lg rounded hover:text-black text-gray-900 transition-colors duration-200`}
                                >
                                    {seat.chair_name}
                                </button>
                            </div>
                        ))}


                    </div>
                    <div className="grid grid-cols-1 gap-y-2 items-center">
                        {alpha.map((item, i) => (
                            <Button key={i} size={"icon"} variant={"primary"}>
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Seats
