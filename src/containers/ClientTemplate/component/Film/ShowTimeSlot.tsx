import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ShowtimeSlot } from "@/types/movie";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

const ShowTimeSlot: React.FC<{ showSlots: ShowtimeSlot[] | undefined }> = ({ showSlots }) => {
  return (
    <div className="mx-auto max-w-2xl mb-5">
      <Card >
        <CardHeader>
          <CardDescription>Chọn giờ xem bạn nhé</CardDescription>
        </CardHeader>
        <CardContent>
          {showSlots && showSlots.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 max-w-md">
              {showSlots.map((slot) => (
                <Link to={`/Seat`} className="group w-fit cursor-pointer" key={slot.id_slot}>
                  <CardDescription className="border w-fit border-yellow-500 text-primary rounded-md px-3 py-1.5 group-hover:border-white group-hover:bg-yellow-500">
                    {moment(slot.slot_time, 'HH:mm:ss').format('HH:mm')}
                  </CardDescription>
                </Link>
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
