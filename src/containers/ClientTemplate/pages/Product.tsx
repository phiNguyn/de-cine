import productAPI from "@/apis/product";
import { useProductStore } from "@/store/Products";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Ticket from "../component/Seat/ticket";
import TableProduct from "../component/Products";
import ButtonNext from "../component/Seat/button";
import { useNavigate } from "react-router-dom";
import { useTicketStore } from "@/store/intex";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import ShowtimeAPI from "@/apis/showtime";

export default function Product() {
  const { Product, setProduct } = useProductStore((state) => state);
  const { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats, clearTicketData } = useTicketStore()
  const navigate = useNavigate()
  const [cancleLoading, setCancelLoading] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey: ['productActive'],
    queryFn: () => productAPI.getAllProductActive(true),
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data, setProduct]);

  const handleProceed = async () => {

    try {
      navigate("/payments", {
        state: {
          selectedShowDate,
          selectedShowTime,
          selectedRoomId,
          movieName,
          movieImage,
          selectedSeats,
        },
      });
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };
  const handleCancle = async () => {
    setCancelLoading(true)
    try {
      await ShowtimeAPI.updateChairByShowtime(Number(selectedShowDate?.id_showtime), selectedSeats.map(item => ({
        id_chair: item.id,
        chair_status: 'available',
      })));
      await clearTicketData();
      navigate("/Booking");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi ko bt ở đâu luôn")
    } finally {
      setCancelLoading(false)
    }
  };

  const handleBack = async () => {
    setCancelLoading(true)
    try {
      await ShowtimeAPI.updateChairByShowtime(Number(selectedShowDate?.id_showtime), selectedSeats.map(item => ({
        id_chair: item.id,
        chair_status: 'available',
      })));
      navigate(`/seat/${selectedShowDate?.id_showtime}`)
    } catch (error) {
      console.log(error);
      toast.error('Khong bt loi o dau de tam o day')
    } finally {
      setCancelLoading(false)
    }
  }
  return (
    <>
      <div className="mx-5">
        <div className="w-full flex justify-end items-center ">
          <Button className="" variant={"outline"} size={"default"} onClick={handleCancle}>Hủy giao dịch</Button>
        </div>
        <div className="mx-auto sm:px-8 my-5">
          <h2 className="text-2xl font-semibold mb-6">Chọn Combo</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3  gap-x-10">
            <div className="md:col-span-2">
              {isLoading ? <Loader /> : <TableProduct products={Product} />}
            </div>
            <div className="w-full md:col-span-1 items-start mt-5 lg:mt-0">
              <Ticket handleBack={handleBack} handleProceed={handleProceed}>
                <ButtonNext disabled={cancleLoading} text="Tiếp Tục" onClick={handleProceed} />
              </Ticket>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
