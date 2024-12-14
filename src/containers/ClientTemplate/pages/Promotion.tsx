import { Link } from "react-router-dom"
import PromotionAPI from "@/apis/promotion"
import { Promotion } from "@/types/promotion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { API_URL } from "@/constants/api"
import { useQuery } from "@tanstack/react-query"

const PromotionPage = () => {
  const [promotions, setPromotions] = useState<Promotion[] | []>([])
  const { data } = useQuery({
    queryKey: ['promotionsClient'],
    queryFn: PromotionAPI.getAllPromotion,
    staleTime: 60 * 1000
  })

  useEffect(() => {
    if (data) {
      setPromotions(data)
    }
  }, [data, setPromotions])


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Khuyến Mãi Đặc Biệt
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promotion, index) => (
          <Link to={`/promotions/${promotion.id_promotion}`} key={index}>
            <Card
              className="group overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow rounded-lg"
            >
              <CardContent className="flex justify-center p-4">
                <img
                  src={`${API_URL.baseUrl}/${promotion.promotion_image}`}
                  alt={promotion.promotion_name}
                  className="w-40 h-40 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                />
              </CardContent>
              <p className="text-center text-lg font-medium text-gray-800 mt-4 group-hover:text-primary transition-colors">
                {promotion.promotion_name}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PromotionPage
