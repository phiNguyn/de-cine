import { useTicketStore } from "@/store/intex";
import { ChairByShowtime } from "@/types/chair";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Seats: React.FC<{ showChair?: ChairByShowtime[] }> = ({ showChair }) => {

  const { selectedSeats, addSelectedSeat, removeSelectedSeat } = useTicketStore()
  const alpha = Array.from({ length: Math.floor(Number(showChair?.length) / 10) }, (_, index) => String.fromCharCode(65 + index));
  const handleSeatClick = (seat: ChairByShowtime) => {
    if (seat.chair_status === "sold" || seat.chair_status === 'booked') return;

    const isSelected = selectedSeats.find(selected => selected.id === seat.id);

    if (isSelected) {
      removeSelectedSeat(seat.id);
    } else {
      addSelectedSeat(seat);
    }
  };

  return (
    <div className="flex flex-col items-center gap-x-6 p-4">
      <ToastContainer />
      {/* Ghế và Nhãn hàng */}
      <div className="grid grid-cols-11  gap-4">
        {/* Ghế */}
        <div className="w-full grid grid-cols-10 gap-1 md:gap-2 justify-center mx-auto col-span-10">
          {showChair?.map((seat) => (
            <div key={seat.id} className="group">
              <button
                onClick={() => handleSeatClick(seat)}
                className={`
                size-7  md:size-12 
                  rounded 
                  text-xs md:text-lg 
                  flex items-center justify-center 
                  transition-colors duration-200 
                  ${selectedSeats.some(selected => selected.id === seat.id)
                    ? "bg-yellow-300 text-black"
                    : seat.chair_status === "sold"
                      ? "bg-slate-500 text-primary cursor-not-allowed"
                      : seat.chair_status === "booked"
                        ? "bg-blue-500 text-primary"
                        : "bg-gray-300 text-gray-900 group-hover:bg-yellow-400"
                  }`}
              >
                {seat.chair_name}
              </button>
            </div>
          ))}
        </div>
        {/* Nhãn hàng ghế */}
        <div className="flex flex-col  items-center gap-3 col-span-1">

          {alpha.map((item, i) => (
            <div
              key={i}
              className="size-7 md:size-12  bg-green-300 text-black rounded flex items-center justify-center "
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seats;
