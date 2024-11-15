import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ShowtimeSlot } from "@/types/movie";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import useShowtimeStore from "@/store/Showtime";  // Import hook từ Zustand

const ShowTimeSlot: React.FC<{ showSlots: ShowtimeSlot[] | undefined, idRoom?: number }> = ({ showSlots, idRoom }) => {
  const navigate = useNavigate()
  // Lấy state từ Zustand
  const { setSelectedShowTime } = useShowtimeStore((state) => state);

  // Hàm xử lý khi người dùng chọn suất chiếu
  const handleSlotSelect = (slotTime: string) => {
    // Cập nhật thời gian suất chiếu vào Zustand
    setSelectedShowTime(slotTime);
    navigate(`/Seat/${idRoom}`)

  };
  return (
    <div className="mx-auto max-w-2xl mb-5">
      <Card>
        <CardHeader>
          <CardDescription>Chọn giờ xem bạn nhé</CardDescription>
        </CardHeader>
        <CardContent>
          {showSlots && showSlots.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 max-w-md">
              {showSlots.map((slot) => (
                <div

                  className="group w-fit cursor-pointer"
                  key={slot.id_slot}
                  onClick={() => handleSlotSelect(slot.slot_time)}
                >
                  <CardDescription className="border w-fit border-yellow-500 text-primary rounded-md px-3 py-1.5 group-hover:border-white group-hover:bg-yellow-500">
                    {moment(slot.slot_time, 'HH:mm:ss').format('HH:mm')}
                  </CardDescription>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Không có suất chiếu cho ngày này.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowTimeSlot;
