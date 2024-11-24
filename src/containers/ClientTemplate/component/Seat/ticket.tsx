import { ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useChairStore } from "@/store/Chair";
import { useProductStore } from "@/store/Products";
import useShowtimeStore, { useMovieStore } from "@/store/Showtime";
import { API_URL } from '@/constants/api';

interface TicketProps {
  children?: ReactNode;
}

const Ticket: React.FC<TicketProps> = ({children}) => {
  // const navigate = useNavigate();
  const { selectedShowDate, selectedShowTime, selectedRoomId } = useShowtimeStore((state) => state);
  const { movieName, movieImage } = useMovieStore();
  const { selectedSeats } = useChairStore();
  const { selectedProducts } = useProductStore();

  // const handleProceed = () => {
  //   navigate('/products', { state: { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats, selectedProducts } });
  // };

  // Tính tổng tiền ghế đã chọn
  const totalSeatsPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  // Tính tổng tiền sản phẩm đã chọn
  const totalProductsPrice = selectedProducts.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

  // Tính tổng tiền
  const totalPrice = totalSeatsPrice + totalProductsPrice;

  return (
    <div className="w-full  p-6 bg-black text-white rounded-lg shadow-lg mx-auto md:ml-8 my-4 md:my-0 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{movieName}</h3>
        <span className="bg-yellow-400 text-black px-2 py-1 rounded">
          T18
        </span>
      </div>
      
      <img
        src={`${API_URL.baseUrl}/${movieImage}`}
        alt="Poster"
        className="mb-4 w-60 rounded-lg shadow-lg "
      />
      <p className="text-sm mb-1">DeCine: <b> Rạp Decine 12 </b></p>
      <p className="text-sm mb-1">Suất: <b>{selectedShowTime}</b> - {selectedShowDate}</p>
      <p className="text-sm mb-1">Phòng: <b>{selectedRoomId}</b></p>

      <hr className="my-4 border-gray-600" />
      {selectedSeats.length > 0 ? (
        <div>
          <p className="text-sm mb-1">Ghế: {selectedSeats.map((seat) => seat.chair_name).join(', ')}</p>
        </div>
      ) : (
        <p className="text-sm mb-1">Không có ghế nào được chọn</p>
      )}

      <hr className="my-4 border-gray-600" />
      {selectedProducts.length > 0 ? (
        <div>
          <p className="font-bold text-lg mb-2">Sản phẩm đã chọn:</p>
          {selectedProducts.map(({ product, quantity }) => (
            <div key={product.id_product}>
              <p className="text-sm mb-1">
                {quantity} x {product.product_name}
              </p>
              <p className="font-bold text-lg">
                {(product.price * quantity).toLocaleString('vi-VN')} đ
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm mb-1">Không có sản phẩm nào được chọn</p>
      )}

      <hr className="my-4 border-gray-600" />
      <p className="font-bold text-xl mt-4">
        Tổng cộng: {totalPrice.toLocaleString('vi-VN')} đ
      </p>

      <div className="flex justify-between mt-4">
        <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-200">
          Quay Lại 
        </button>
        {children}
      </div>
    </div> 
  );
};

export default Ticket;
