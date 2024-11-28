import { Button } from "@/components/ui/button";
import { useTicketStore } from "@/store/intex";
import { Chair } from "@/types/chair";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Seats: React.FC<{ showChair: Chair[] | null }> = ({ showChair }) => {
  const { selectedSeats, addSelectedSeat, removeSelectedSeat } = useTicketStore();
  const alpha = Array.from({ length: 6 }, (_, index) => String.fromCharCode(65 + index));

  const handleSeatClick = (seat: Chair) => {
    if (seat.chair_status === "sold") return;

    const isSelected = selectedSeats.find(selected => selected.id_chair === seat.id_chair);

    if (isSelected) {
      removeSelectedSeat(seat.id_chair);
    } else {
      addSelectedSeat(seat);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <ToastContainer />
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <div className="grid grid-cols-10 gap-3">
          {showChair?.map((seat) => (
            <div key={seat.id_chair} className="group">
              <button
                onClick={() => handleSeatClick(seat)}
                className={`
                  w-12 h-12 
                  rounded 
                  text-sm md:text-base 
                  flex items-center justify-center 
                  transition-colors duration-200 
                  ${selectedSeats.some(selected => selected.id_chair === seat.id_chair) 
                    ? "bg-yellow-300 text-black" 
                    : seat.chair_status === "sold"
                      ? "bg-blue-500 text-white cursor-not-allowed"
                      : seat.chair_status === "pending"
                        ? "bg-yellow-300 text-black"
                        : "bg-gray-300 text-gray-900 group-hover:bg-yellow-400"
                  }`}
              >
                {seat.chair_name}
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-3 ml-5">
          {alpha.map((item, i) => (
            <Button
              key={i}
              size="icon"
              variant="primary"
              className="w-12 h-12 bg-green-300 text-black"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seats;
