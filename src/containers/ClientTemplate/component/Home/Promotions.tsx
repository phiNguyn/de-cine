import PromotionAPI from "@/apis/promotion";
import { API_URL } from "@/constants/api";
import { cn } from "@/lib/utils";
import { Promotion } from "@/types/promotion";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Promotions = ({ children, className }: { children?: ReactNode, className?: ReactNode }) => {
  const [promotions, setPromotions] = useState<Promotion[] | []>([]);
  
  const { data } = useQuery({
    queryKey: ['promotionsClient'],
    queryFn: PromotionAPI.getAllPromotion,
    staleTime: 60 * 1000
  });

  useEffect(() => {
    if (data) {
      setPromotions(data);
    }
  }, [data, setPromotions]);

  return (
    <div className={cn("my-10 px-5", className)}>
      <div className="flex gap-x-5 items-center">
        <span className="border-l-2 border-yellow-300"></span>
        <h1 className="text-2xl font-bold">TIN KHUYẾN MÃI</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {children}
        {promotions.slice(0, 3).map((promotion) => (
          <div key={promotion.id_promotion} className="rounded-lg border-2 border-yellow-500 overflow-hidden shadow-lg p-4 flex flex-col items-center">
            <Link to={"/Promotions"}>
            <img 
              src={`${API_URL.baseUrl}/${promotion.promotion_image}`} 
              alt={promotion.promotion_name} 
              className="w-full h-48 object-cover mb-4 rounded"
            />
            </Link>
            <div className="text-center font-semibold  mt-2">
              {promotion.promotion_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promotions;
