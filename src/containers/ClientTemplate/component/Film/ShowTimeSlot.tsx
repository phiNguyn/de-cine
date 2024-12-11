import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { useTicketStore } from "@/store/intex";
import { newShowtime } from "@/types/movie";
import { useAuth } from "@/hooks";
import toast, { Toaster } from "react-hot-toast";

const ShowTimeSlot: React.FC<{ showSlots: newShowtime[] | undefined }> = ({ showSlots }) => {
  const navigate = useNavigate();
  const { user } = useAuth()
  const { setTicketData } = useTicketStore();

  // Xử lý khi chọn suất chiếu
  const handleSlotSelect = (slotTime: string, id_showtime: number) => {
    if (!id_showtime) {
      console.error("ID phòng không hợp lệ.");
      return;
    }

    // Cập nhật thời gian suất chiếu
    setTicketData({ selectedShowTime: slotTime });

    try {
      if (!user) {
        toast.error("Vui lòng đăng nhập để có thể đặt vé")
      } else {

        navigate(`/Seat/${id_showtime}`);
        console.log(idRoom);

      }
    } catch (error) {
      console.error("Không thể điều hướng đến trang ghế:", error);
    }
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
              {showSlots.map((slot, i) => (
                <div
                  className="group w-fit cursor-pointer"
                  key={i}
                  onClick={() => handleSlotSelect(slot.slot_time, slot.id_showtime)}
                >
                  <CardDescription className="border w-fit border-yellow-500 text-primary rounded-md px-3 py-1.5 group-hover:border-white group-hover:bg-yellow-500">
                    {moment(slot.slot_time, "HH:mm:ss").format("HH:mm")}
                  </CardDescription>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Không có suất chiếu nào khả dụng cho ngày này.
            </p>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default ShowTimeSlot;
