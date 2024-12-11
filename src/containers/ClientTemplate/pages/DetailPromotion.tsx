import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PromotionAPI from "@/apis/promotion"
import { Promotion } from "@/types/promotion"
import PromotionDetail from "../component/Promotion/PromotionDetail"


const PromotionDetailPage = () => {
  const { id } = useParams() 
  const [promotion, setPromotion] = useState<Promotion | null>(null)

  useEffect(() => {
    const fetchPromotionDetail = async (id:number) => {
      try {
        if (id) {
          const resp = await PromotionAPI.getPromotionById(id)
          setPromotion(resp)
        }
      } catch (error) {
        console.error("Failed to fetch promotion details:", error)
      }
    }   
    fetchPromotionDetail(Number(id))
  }, [id])

  if (!promotion) return <p>Đang tải thông tin khuyến mãi...</p>

  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
      Chi Tiết Khuyến Mãi
    </h2>
    <PromotionDetail promotion={promotion} />
  </div>
  )
}

export default PromotionDetailPage
