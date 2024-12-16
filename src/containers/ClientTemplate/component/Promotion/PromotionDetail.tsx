import { useEffect, useState } from "react";
import { Promotion } from "@/types/promotion";
import { API_URL } from "@/constants/api";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BookingDialog } from "./RedeemSection";
import PromotionAPI from "@/apis/promotion";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { UserAPI } from "@/apis/user";
import { StorageKeys } from "@/constants/StorageKeys";

interface PromotionDetailProps {
  promotion: Promotion;
}

const PromotionDetail = ({ promotion }: PromotionDetailProps) => {
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Lấy dữ liệu user từ localStorage
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setLoyaltyPoints(parsedUser?.loyalty_points || 0);
        console.log("User data:", parsedUser);
      } catch (err) {
        console.error("Failed to parse userData from localStorage", err);
      }
    } else {
      console.log("No userData found in localStorage");
    }
  }, []);

  // Định dạng tiền tệ
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleRedeemClick = async () => {
    if (!user || !user.id_account) {
      alert("Bạn cần đăng nhập để đổi mã khuyến mãi.");
      return;
    }

    try {
      const resp = await PromotionAPI.redeemDiscount(promotion.id_promotion, user.id_account);
      if (resp?.status == 200) {
        const result = await UserAPI.userDetail(user.id_account)
        localStorage.setItem(StorageKeys.USERDATA, JSON.stringify(result))
        alert(`Đổi mã khuyến mãi thành công Thành công`);
      }
    } catch (error) {
      console.error(error);
      alert("Đổi mã khuyến mãi thất bại. Vui lòng thử lại sau.");
    }
  };

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
          <b className="text-primary">Số điểm để đổi:</b>{" "}
          <b className="text-red-400 text-xl">{promotion.promotion_point}</b>
        </p>
        <p className="text-primary flex gap-x-2">
          <b >Ngày bắt đầu:</b>
          {format(new Date(promotion.start_date), "dd/MM/yyyy", { locale: vi })}
        </p>
        <p className="text-primary flex gap-x-2">
          <b className="text-primary">Ngày kết thúc:</b>{" "}
          {format(new Date(promotion.end_date), "dd/MM/yyyy", { locale: vi })}
        </p>
        <p className="text-primary flex gap-x-2">
          <b>Giá trị đơn hàng tối thiểu:</b>
         <div className="">
           {formatCurrency(promotion.min_purchase_amount)}
          </div>
        </p>
        <p className="text-primary flex gap-x-2">
          <b >Giảm tối đa: </b>
          {formatCurrency(promotion.max_discount_amount)}
        </p>
        <p className="flex gap-x-2">
          <b className="text-primary">Số điểm bạn đang có : </b><div className="text-primary">{loyaltyPoints}</div>
        </p>

        {/* Nút Đổi mã ngay */}
        <div className="">
          <Button onClick={() => setOpen(true)}>Đổi mã ngay</Button>
          {/* Truyền promotion vào BookingDialog */}
          <BookingDialog
            promotion={promotion}
            onBooking={handleRedeemClick}
            open={open}
            onOpenChange={setOpen}
          />
        </div>

      </div>
    </div>
  );
};

export default PromotionDetail;
