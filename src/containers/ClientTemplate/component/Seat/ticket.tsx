import useShowtimeStore, { useMovieStore } from "@/store/Showtime";

const Ticket = () => {
  const { selectedShowDate, selectedShowTime, selectedRoomId } = useShowtimeStore((state) => state);
  const { movieName, movieImage } = useMovieStore();


  return (
    <div className="w-1/4 p-6 bg-white text-black rounded-lg ml-8 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{movieName}</h3>
        <span className="bg-yellow-400 text-black px-2 py-1 rounded">
          T18
        </span>
      </div>
      
      <img
        src={movieImage}
        alt="Poster"
        className="mb-4 w-full rounded-lg"
      />
      <p className="text-sm mb-1">DeCine: <b> Rạp Decine 12 </b></p>
      <p className="text-sm mb-1">Suất: <b>{selectedShowTime}</b> - {selectedShowDate}</p>
      <p className="text-sm mb-1">Phòng : <b>{selectedRoomId}</b>  </p>

      <hr className="my-4" />
      <p className="text-sm mb-1">2 Ghế: H1, H2</p>
      <p className="font-bold text-lg">120.000 đ</p>
      <button className="bg-yellow-400 text-black px-4 py-2 rounded mt-4 hover:bg-yellow-500 transition-colors duration-200">
        Quay Lại 
      </button>
      <button className="bg-yellow-400 text-black px-4 py-2 rounded mt-4 hover:bg-yellow-500 transition-colors duration-200 ml-16">
        Tiếp tục
      </button>
    </div> 
  );
};

export default Ticket;
