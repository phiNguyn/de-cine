import { ReactNode } from 'react';
import { API_URL } from '@/constants/api';
import { useTicketStore } from '@/store/intex';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
interface TicketProps {
  children?: ReactNode;
}

const Ticket: React.FC<TicketProps> = ({ children }) => {
  const { movieName, movieImage, selectedShowDate, selectedShowTime, selectedRoomId, selectedSeats, selectedProducts } = useTicketStore()

  const navigate = useNavigate()

  // Tính tổng tiền ghế đã chọn
  const totalSeatsPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  // Tính tổng tiền sản phẩm đã chọn
  const totalProductsPrice = selectedProducts.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

  // Tính tổng tiền
  const totalPrice = totalSeatsPrice + totalProductsPrice;

  return (
    <div className="w-full  p-4 md:p-6  bg-black text-white rounded-lg shadow-lg mx-auto my-4 md:my-0 border border-gray-700">
      <div className="flex  mb-4">

        <div >
          <img
            src={`${API_URL.baseUrl}/${movieImage}`}
            alt="Poster"
            className="mb-4 w-28 rounded-lg shadow-lg "
          />
        </div>
        <div className='flex items-start gap-x-5 pl-2'>
          <h3 className="font-bold text-sm md:text-md lg:text-lg">{movieName}</h3>
          <span className="bg-yellow-400 text-black px-2 py-1 rounded">
            T18
          </span>
        </div>
      </div>

      <p className="text-sm mb-1">Suất: <b>{selectedShowTime}</b> - {selectedShowDate}</p>
      <p className="text-sm mb-1">Phòng: <b>{selectedRoomId}</b></p>

      <hr className="my-4 border-gray-600" />
      {selectedSeats.length > 0 ? (
        <div className='flex items-center justify-between'>
          <p className="text-sm mb-1">
             {selectedSeats.length} x Ghế: {selectedSeats.map((seat) => seat.chair_name).join(', ')}</p>
          <p className="text-sm mb-1">
              </p>
        </div>
      ) : (
        <p className="text-sm mb-1">Không có ghế nào được chọn</p>
      )}

      <hr className="my-4 border-gray-600" />
      {selectedProducts.length > 0 ? (
        <div>
          <p className="font-bold text-lg mb-2">Sản phẩm đã chọn:</p>
          {selectedProducts.map(({ product, quantity }) => (
            <div key={product.id_product} className='flex items-center justify-between'>
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
        <Button variant={"trailer"} size={"default"} onClick={() => navigate('/')}>
          Quay Lại
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Ticket;
