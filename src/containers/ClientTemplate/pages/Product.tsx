import productAPI from "@/apis/product";
import { useProductStore } from "@/store/Products";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import Ticket from "../component/Seat/ticket";
import TableProduct from "../component/Products";
import ButtonNext from "../component/Seat/button";
import { useNavigate } from "react-router-dom";
import { useTicketStore } from "@/store/intex";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";

export default function Product() {
  const { Product, setProduct } = useProductStore((state) => state);
  const { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats, clearTicketData } = useTicketStore()
  const navigate = useNavigate()
  const { data, isLoading,error } = useQuery({
    queryKey: ['productActive'],
    queryFn: () => productAPI.getAllProductActive(true),
    staleTime: 60 * 1000,
  });
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setProduct(data);
    }
  }, [data, setProduct]);

  const handleProceed = () => {
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
  };

  const handleCancle = async () => {
    await clearTicketData();
    navigate("/Booking");
  };
  if (error || !data || data.length === 0) {
    return <p>Không có sản phẩm nào khả dụng.</p>;
  }

  return (
    <>
      <div className="mx-5">
        <div className="w-full">
          <Button className="ml-auto" variant={"outline"} size={"default"} onClick={handleCancle}>Hủy giao dịch</Button>
        </div>
        <div className="mx-auto sm:px-8 my-5">
          <h2 className="text-2xl font-semibold mb-6">Chọn Combo</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3  gap-x-10">
            <div className="md:col-span-2">
              {isLoading ? <Loader /> : <TableProduct products={Product} />}
            </div>
            <div className="w-full md:col-span-1 items-start mt-5 lg:mt-0">
              <Ticket handleProceed={handleProceed}>
            <ButtonNext text="Tiếp Tục" onClick={handleProceed} />
            </Ticket>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
