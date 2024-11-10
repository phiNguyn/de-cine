import { ChairAPI } from "@/apis/chair"
import { Button } from "@/components/ui/button"
import { useChairStore } from "@/store/Chair"
import { Chair } from "@/types/chair"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const RoomChair = () => {

    const { id } = useParams()
    const [data, setData] = useState<Chair[]>([])
    // const 
    // const {Chair, setChair} = useChairStore((state) => state)
    // const {data} = useQuery({
    //     queryKey : ['chairs'],
    //     queryFn :  ChairAPI.getAllChairByRoomId(id) , 
    //   staleTime: 60 * 1000,

    //   })
    const alpha = Array.from({ length: 6 }, (_, index) => String.fromCharCode(65 + index));
    console.log(alpha);
    
    useEffect(() => {
        const fetchChair = async () => {
            try {
                const resp = await ChairAPI.getAllChairByRoomId(Number(id))
                setData(resp)
            } catch (error) {
                console.log(error);

            }
        }
        fetchChair()
    }, [id])
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white m-2">
                <div className="w-full text-center py-4 bg-red-600 text-white">
                    Theo quy định của cục điện ảnh, phim không dành cho trẻ dưới 18 tuổi
                </div>

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

                            {data?.map((seat) => (
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
            </div>
        </div>
    )
}
