import Seats from "../component/Seat";
import Ticket from "../component/Seat/ticket";
import { useNavigate, useParams } from "react-router-dom";
import ButtonNext from "../component/Seat/button";
import { useTicketStore } from "@/store/intex";
import { useQuery } from "@tanstack/react-query";
import ShowtimeAPI from "@/apis/showtime";
import Loader from "@/components/loader";
import { useState } from "react";
import toast from "react-hot-toast";

const SeatSelection = () => {
  const { id } = useParams()
  const { movieName, movieImage, selectedSeats, selectedShowDate, selectedShowTime, selectedRoomId, clearTicketData } = useTicketStore();
  const navigate = useNavigate();
  const [isNextLoading, setNextLoading] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey: ['chairByShowtime', id],
    queryFn: () => ShowtimeAPI.getChairsByShowtime(Number(id)),
    staleTime: 30 * 1000
  })
  const chairs = selectedSeats.map(item => ({
    id_chair: item.id_chair,
    chair_status: 'booked',
  }));
  const handleProceed = async () => {
    setNextLoading(true)
    try {
      await ShowtimeAPI.updateChairByShowtime(Number(id), chairs);
      navigate('/products', { state: { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats } });
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    } finally {
      setNextLoading(false)
    }
  };

  const handleBack = async () => {
    try {
      if (selectedSeats.length > 0) {

        await ShowtimeAPI.updateChairByShowtime(Number(selectedShowDate?.id_showtime), selectedSeats.map(item => ({
          id_chair: item.id_chair,
          chair_status: 'available',
        })));
      }
      await clearTicketData()
      navigate(`/booking`)
    } catch (error) {
      console.log(error);
      toast.error('Khong bt loi o dau de tam o day')
    }
  }
  if (isNextLoading) return <Loader />
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
                <div className="size-4 md:size-6 bg-slate-500 mr-2"></div>
                <span className="text-sm md:text-lg">Ghế đã bán</span>
              </div>
              <div className="flex items-center">
                <div className="size-4 md:size-6 bg-blue-500 mr-2"></div>
                <span className="text-sm md:text-lg">Ghế đang được giữ</span>
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
            {isLoading ? <Loader /> :
              <Seats showChair={data || []} />
            }
          </div>
        </div>
        <div className="col-span-1">
          <Ticket handleBack={handleBack} handleProceed={handleProceed}>
            <ButtonNext text="Tiếp Tục" onClick={handleProceed} />
          </Ticket>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
