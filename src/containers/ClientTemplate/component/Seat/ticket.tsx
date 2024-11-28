/* eslint-disable @typescript-eslint/no-explicit-any */
import {  cloneElement } from 'react';
import { API_URL } from '@/constants/api';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTicketStore } from '@/store/intex';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chair } from "@/types/chair"; // Nhập khẩu loại Chair



interface TicketProps {
  handleProceed: () => void;
    children: React.ReactNode;
}
const Ticket: React.FC<TicketProps> = ({ handleProceed, children }) => {
  const { movieName, movieImage, selectedShowDate, selectedShowTime, selectedRoomId, selectedSeats, selectedProducts,clearSelectedSeats ,clearSelectedProducts} = useTicketStore();

  const navigate = useNavigate();

  // Tính tổng tiền ghế đã chọn
  const totalSeatsPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  // Tính tổng tiền sản phẩm đã chọn
  const totalProductsPrice = selectedProducts.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

  // Tính tổng tiền
  const totalPrice = totalSeatsPrice + totalProductsPrice;

  // Kiểm tra số lượng ghế đã chọn
  const isContinueDisabled = selectedSeats.length === 0;

  const handleContinue = () => {
    if (!isValidSelection(selectedSeats)) {
      toast.error("Không thể chừa một ghế trống giữa các ghế đã chọn.");
      return;
    }
    handleProceed();
  };
  
  const handleBack = () => { 
    clearSelectedSeats(); // Clear selected seats
     clearSelectedProducts(); // Clear selected products 
     navigate(-1); // Navigate back to the previous page 
     };

  const isValidSelection = (selectedSeats: Chair[]): boolean => {
    for (const seat of selectedSeats) {
      const row = seat.chair_name[0];
      const col = parseInt(seat.chair_name.slice(1));

      const leftSeatSelected = selectedSeats.some(s => s.chair_name === `${row}${col - 1}`);
      const rightSeatSelected = selectedSeats.some(s => s.chair_name === `${row}${col + 1}`);
      const leftGapSeatSelected = selectedSeats.some(s => s.chair_name === `${row}${col - 2}`);
      const rightGapSeatSelected = selectedSeats.some(s => s.chair_name === `${row}${col + 2}`);

      if (leftGapSeatSelected && !leftSeatSelected && col - 1 > 0) {
        return false;
      }

      if (rightGapSeatSelected && !rightSeatSelected && col + 1 <= 10) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="w-full p-6 bg-black text-white rounded-lg shadow-lg mx-auto md:ml-8 my-4 md:my-0 border border-gray-700">
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{movieName}</h3>
        <span className="bg-yellow-400 text-black px-2 py-1 rounded">
          T18
        </span>
      </div>

      <img
        src={`${API_URL.baseUrl}/${movieImage}`}
        alt="Poster"
        className="mb-4 w-60 rounded-lg shadow-lg"
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
        <Button variant={"trailer"} size={"default"} onClick={handleBack}>
          Quay Lại
        </Button>
        {children && cloneElement(children as React.ReactElement<any>, { onClick: handleContinue ,handleProceed, disabled: isContinueDisabled })}
      </div>
    </div>
  );
};

export default Ticket;