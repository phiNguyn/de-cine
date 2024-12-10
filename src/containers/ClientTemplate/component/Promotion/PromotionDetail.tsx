import { useState } from "react"
import { Promotion } from "@/types/promotion"
import { API_URL } from "@/constants/api"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import RedeemSection from "./RedeemSection"

interface PromotionDetailProps { 
  promotion: Promotion
}

const PromotionDetail = ({ promotion }: PromotionDetailProps) => {
  const [showRedeem, setShowRedeem] = useState(false) 

  // Định dạng tiền tệ
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value)
  }

  const handleRedeemClick = () => {
    setShowRedeem((prev) => !prev)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-6 rounded-lg shadow-lg">
      {/* Hình ảnh */}
      <div className="bg-white rounded-lg overflow-hidden w-full lg:w-1/3">
        <img
          src={`${API_URL.baseUrl}/${promotion.promotion_image}`}
          alt={promotion.promotion_name}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Thông tin khuyến mãi */}
      <div className="text-white space-y-4 flex-1">
        <h3 className="text-3xl font-bold">{promotion.promotion_name}</h3>
        <p>
          <b className="text-primary">Mô tả:</b> {promotion.description}
        </p>
        <p>
          <b className="text-primary">Số điểm để đổi:</b> {promotion.promotion_point}
        </p>
        <p>
          <b className="text-primary">Ngày bắt đầu:</b>{" "}
          {format(new Date(promotion.start_date), "dd/MM/yyyy", { locale: vi })}
        </p>
        <p>
          <b className="text-primary">Ngày kết thúc:</b>{" "}
          {format(new Date(promotion.end_date), "dd/MM/yyyy", { locale: vi })}
        </p>
        <p>
          <b className="text-primary">Giá trị đơn hàng tối thiểu:</b>{" "}
          {formatCurrency(promotion.min_purchase_amount)}
        </p>
        <p>
          <b className="text-primary">Giảm tối đa:</b> {formatCurrency(promotion.max_discount_amount)}
        </p>

        {/* Nút Đổi mã ngay */}
        <button
          onClick={handleRedeemClick}
          className="mt-4 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition duration-300"
        >
          Đổi mã ngay
        </button>

        {/* Hiển thị RedeemSection */}
        {showRedeem && <RedeemSection promotion={promotion} />}
      </div>
    </div>
  )
}

export default PromotionDetail
