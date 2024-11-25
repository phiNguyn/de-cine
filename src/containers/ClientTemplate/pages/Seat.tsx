import { ChairAPI } from "@/apis/chair";
import { useEffect, useState } from "react";
import Seats from "../component/Seat";
import Ticket from "../component/Seat/ticket";
import { Chair } from "@/types/chair";
import { useNavigate, useParams } from "react-router-dom";
import ButtonNext from "../component/Seat/button";
import { useTicketStore } from "@/store/intex";

const SeatSelection = () => {
  const [chair, setChair] = useState<Chair[] | []>([]);
  const { id } = useParams()
  const {movieName, movieImage,selectedSeats, selectedShowDate, selectedShowTime, selectedRoomId} = useTicketStore()
  const navigate = useNavigate()
  const handleProceed = () => {
    navigate('/products ', { state: { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats } });
  };
  
  useEffect(() => {
    const fetchChairs = async () => {
      try {
        const resp = await ChairAPI.getAllChairByRoomId(Number(id))
        setChair(resp)
      } catch (error) {
        console.log(error);

      }
    }
    fetchChairs()
  }, [id])
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white m-2">
      <div className="w-full text-center py-4 bg-red-600 text-white">
        Theo quy định của cục điện ảnh, phim không dành cho trẻ dưới 18 tuổi
      </div>

      <div className="flex mt-10 w-11/12">
        <div className="w-3/4">
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
          <img src="/img/ic-screen.png" alt="screen" className="w-auto mt-6" />
          <div >
            <Seats showChair={chair} />
          </div>
        </div>
      <div>
        
      </div>
      <div className="w-1/3 "> 
      <Ticket>
        <ButtonNext onclick={handleProceed} text="Tiếp Tục"/>
      </Ticket>
       </div>
       
      </div>
    </div>
  );
};

export default SeatSelection;
