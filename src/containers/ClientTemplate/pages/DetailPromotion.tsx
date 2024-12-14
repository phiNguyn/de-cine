import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PromotionAPI from "@/apis/promotion"
import { Promotion } from "@/types/promotion"
import PromotionDetail from "../component/Promotion/PromotionDetail"
import { useQuery } from "@tanstack/react-query"
import Loader from "@/components/loader"


const PromotionDetailPage = () => {
  const { id } = useParams()
  const [promotion, setPromotion] = useState<Promotion | null>(null)
  const { data, isLoading } = useQuery({
    queryKey: ['promotionDetail', id],
    queryFn: () => PromotionAPI.getPromotionById(Number(id)),
    staleTime: 5 * 60 * 1000
  })
  useEffect(() => {
    if (data) {
      setPromotion(data)
    }
  }, [data, setPromotion])

  if (!promotion) return <div>Lỗi</div>
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Chi Tiết Khuyến Mãi
      </h2>
      {isLoading ? <Loader /> :
        <PromotionDetail promotion={promotion} />
      }
    </div>
  )
}

export default PromotionDetailPage
