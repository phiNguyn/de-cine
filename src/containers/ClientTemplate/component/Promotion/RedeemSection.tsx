import { Promotion } from "@/types/promotion"

interface RedeemSectionProps {
  promotion: Promotion
}

const RedeemSection = ({ promotion }: RedeemSectionProps) => {
  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-lg text-white shadow-lg">
      <h4 className="text-xl font-bold">Đổi mã khuyến mãi</h4>
      <p className="mt-2">
        Bạn có thể đổi mã khuyến mãi <b>{promotion.promotion_name}</b> bằng cách nhập số điểm bên dưới.
      </p>
      {/* Thêm form hoặc logic đổi mã tại đây */}
    </div>
  )
}

export default RedeemSection
