/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneElement, useEffect, useState } from 'react';
import { API_URL } from '@/constants/api';
import { Button } from '@/components/ui/button';
import { useTicketStore } from '@/store/intex';
import "react-toastify/dist/ReactToastify.css";
import { ChairByShowtime } from "@/types/chair";
import toast, { Toaster } from 'react-hot-toast';
import ShowtimeAPI from '@/apis/showtime';
import { useNavigate } from 'react-router-dom';

interface TicketProps {
  handleProceed?: () => void;
  children?: React.ReactNode;
  handleBack?: () => void,
}
const Ticket: React.FC<TicketProps> = ({ handleProceed, children, handleBack }) => {
  const navigate = useNavigate()
  const { expiredAt, getTotalPrice, movieName, movieImage, selectedShowDate, selectedShowTime, selectedRoomId, selectedSeats, selectedProducts, clearTicketData } = useTicketStore();
  // Tính tổng tiền ghế đã chọn
  // Kiểm tra số lượng ghế đã chọn
  const [remainingTime, setRemainingTime] = useState(0); // Thời gian còn lại
  const isContinueDisabled = selectedSeats.length === 0;

  const handleContinue = () => {
    if (!isValidSelection(selectedSeats)) {
      toast.error("Không thể chừa một ghế trống như vậy.");
      return;
    }
    handleProceed?.();
  };

  const isValidSelection = (selectedSeats: ChairByShowtime[]): boolean => {
    const rows = ['A', 'B', 'C', 'D', 'E'];

    for (const row of rows) {
      // Lọc các ghế được chọn trong hàng hiện tại
      const selectedSeatsInRow = selectedSeats
        .filter((seat) => seat.chair_name.startsWith(row))
        .map((seat) => parseInt(seat.chair_name.slice(1)))
        .sort((a, b) => a - b); // Sắp xếp theo thứ tự ghế

      if (selectedSeatsInRow.length === 0) continue; // Bỏ qua nếu không có ghế nào được chọn trong hàng

      // Kiểm tra ghế đầu và ghế cuối
      if (selectedSeatsInRow[0] !== 1 && selectedSeatsInRow[0] - 1 === 1) {
        console.error(`Ghế ${row}1 không được để trống.`);
        return false;
      }
      if (selectedSeatsInRow[selectedSeatsInRow.length - 1] !== 10 && selectedSeatsInRow[selectedSeatsInRow.length - 1] + 1 === 10) {
        console.error(`Ghế ${row}10 không được để trống.`);
        return false;
      }

      // Kiểm tra khoảng trống giữa các ghế đã chọn
      for (let i = 0; i < selectedSeatsInRow.length - 1; i++) {
        if (selectedSeatsInRow[i + 1] - selectedSeatsInRow[i] > 1) {
          console.error(
            `Không được để trống giữa ghế ${row}${selectedSeatsInRow[i]} và ghế ${row}${selectedSeatsInRow[i + 1]}.`
          );
          return false;
        }
      }
    }

    return true;
  };
  const handleExpire = async () => {
    try {
      // Ví dụ: Cập nhật trạng thái ghế qua API
      const chairs = selectedSeats.map(item => ({
        id_chair: item.id,
        chair_status: 'available',
      }));
      if (selectedShowDate?.id_showtime) {
        await ShowtimeAPI.updateChairByShowtime(selectedShowDate.id_showtime, chairs);
      }
      // Ví dụ: Xóa vé hoặc reset vé đã đặt trong store
      clearTicketData();
      navigate('/booking')
    } catch (error) {
      console.error("Lỗi khi xử lý hết giờ:", error);
    }
  };
  useEffect(() => {
    if (!expiredAt) return;

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(expiredAt).getTime();
      const timeLeft = expirationTime - currentTime;

      if (timeLeft <= 0) {
        clearInterval(interval); // Dừng interval
        setRemainingTime(0);

        // Gọi hàm xử lý khi hết giờ
        handleExpire();
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval); // Dọn dẹp interval
  }, [expiredAt]);


  const minutes = remainingTime ? Math.floor(remainingTime / 1000 / 60) : 0;
  const seconds = remainingTime ? Math.floor((remainingTime / 1000) % 60) : 0;

  return (
    <>
      <div className="mb-2">
        { remainingTime > 0 ? (
          <p>
            Thời gian giữ ghế: {minutes} phút {seconds} giây
          </p>
        ) : remainingTime === 0 ? (
          <p>Hết giờ!</p>
        ) : null}
      </div>
      <div className="w-full  p-4 md:p-6  bg-black text-white rounded-lg shadow-lg mx-auto my-4 md:my-0 border border-gray-700">
        {/* <ToastContainer /> */}
        <div className="flex  mb-4">
          <div >
            <img
              src={`${API_URL.baseUrl}/${movieImage}`}
              alt="Poster"
              className="mb-4 w-28 rounded-lg shadow-lg "
            />
          </div>
          <div className='flex items-start gap-x-5 pl-2'>
            <h3 className="font-bold text-sm md:text-md lg:text-lg">{movieName?.movie_name}</h3>
            <span className="bg-yellow-400 text-black px-2 py-1 rounded">
              T18
            </span>
          </div>
        </div>

        <p className="text-sm mb-1">Suất: <b>{selectedShowTime}</b> - {selectedShowDate?.date_time}</p>
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
          <p className={`text-sm mb-1 ${selectedProducts.length == 0 ? "hidden" : ""}`}>Không có sản phẩm nào được chọn</p>
        )}

        <hr className="my-4 border-gray-600" />
        <p className="font-bold text-xl mt-4">
          Tổng cộng: {getTotalPrice().toLocaleString()} đ
        </p>

        <div className="flex justify-between mt-4">
          <Button variant={"trailer"} size={"default"} onClick={handleBack}>
            Quay Lại
          </Button>
          {children && cloneElement(children as React.ReactElement<any>, { onClick: handleContinue, handleProceed, disabled: isContinueDisabled })}
        </div>
        <Toaster />
      </div>
    </>
  );

};

export default Ticket;
