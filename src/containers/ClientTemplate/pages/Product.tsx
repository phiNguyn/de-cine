
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

export default function Product() {
  const { Product, setProduct } = useProductStore((state) => state);
  const { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats, clearTicketData } = useTicketStore()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['productActive'],
    queryFn: () => productAPI.getAllProductActive(true),
  });

  const handleProceed = () => {
    navigate('/payments ', { state: { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats } });
  };

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data, setProduct]);

  const handleCancle = async () => {
    await clearTicketData()
    navigate('/Booking')
  }
  return (
    <>
      <Button variant={"outline"} size={"default"} onClick={handleCancle}>Hủy giao dịch</Button>
      <div className="container mx-auto p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Chọn Combo</h2>
            <TableProduct products={Product} />
          </div>
          <div className="mt-6 md:mt-0">
            <Ticket>
              <ButtonNext onclick={handleProceed}></ButtonNext>
            </Ticket>
          </div>
        </div>
      </div>
    </>
  );
}
