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
  const { movieName, movieImage, selectedSeats, selectedShowDate, selectedShowTime, selectedRoomId } = useTicketStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChairs = async () => {
      try {
        const resp = await ChairAPI.getAllChairByRoomId(Number(id));
        setChair(resp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChairs();
  }, [id]);

  const handleProceed = () => {
    navigate('/products', { state: { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats } });
  };
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-5">
      <div className="w-full text-center py-4 bg-red-600 text-white">
        Theo quy định của cục điện ảnh, phim không dành cho trẻ dưới 18 tuổi
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-10 w-full">
        <div className="w-full col-span-3">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-6 ">
              <div className="flex items-center">
                <div className="size-4 md:size-6 bg-blue-600 mr-2"></div>
                <span className="text-sm md:text-lg">Ghế đã bán</span>
              </div>
              <div className="flex items-center">
                <div className="size-4 md:size-6 bg-gray-300 mr-2"></div>
                <span className="text-sm md:text-lg">Ghế trống</span>
              </div>
              <div className="flex items-center">
                <div className="size-4 md:size-6 bg-yellow-400 mr-2"></div>
                <span className="text-sm md:text-lg">Ghế đang chọn</span>
              </div>
            </div>
          </div>
          <img src="/img/ic-screen.png" alt="screen" className="w-full px-0  md:px-20" />
          <div >
            <Seats showChair={chair} />
          </div>
        </div>
        <div className="col-span-1">
          <Ticket handleProceed={handleProceed}>
            <ButtonNext text="Tiếp Tục" onClick={handleProceed} />
            </Ticket>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
