import { Chair } from "@/types/chair"

const Seats: React.FC<{ showChair: Chair[] | null }> = ({ showChair }) => {
    return (
        <div>
            {showChair?.map((chair)=>(
            <button

                className="w-10 h-10 rounded bg-gray-300 hover:bg-yellow-400 hover:text-black text-gray-900 transition-colors duration-200"
            >
                {chair.chair_name}
            </button>
            ))}
        </div>
    )
}

export default Seats
