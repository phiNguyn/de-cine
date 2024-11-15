import { ChairAPI } from "@/apis/chair";
import { useEffect, useState } from "react";
import Seats from "../component/Seat";
import Ticket from "../component/Seat/ticket";
import useShowtimeStore from "@/store/Showtime";

const SeatSelection = () => {
  const { selectedRoomId } = useShowtimeStore((state) => state);
  const [chair, setChair] = useState(null);

  useEffect(() => {
    const fetchChair = async () => {
      if (selectedRoomId) {
        try {
          const resp = await ChairAPI.getAllChairByRoomId(selectedRoomId);
          setChair(resp);
        } catch (error) {
          console.log("Error fetching chairs:", error);
        }
      }
    };
    fetchChair();
  }, [selectedRoomId]); 

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
          <div className="grid grid-cols-12 gap-2 w-fit justify-center pl-60 pt-10">
            <Seats showChair={chair} />
          </div>
        </div>

        <Ticket />
      </div>
    </div>
  );
};

export default SeatSelection;
