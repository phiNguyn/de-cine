"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Promotion } from "@/types/promotion";
// import { useNavigate } from "react-router-dom";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: Promotion;
  onBooking?: () => void;
}

export function BookingDialog({
  open,
  onOpenChange,
  onBooking,
}: BookingDialogProps) {
  const [isChecked, setIsChecked] = useState(false);
  // const navigate = useNavigate();

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleBookingClick = async () => {
    try {
      if (onBooking) {
        await onBooking();
      }
      // Sử dụng useNavigate để chuyển hướng về trang Promotions
      // navigate("/promotions");
    } catch (error) {
      console.error("Thanh toán thất bại", error);
      alert("Thanh toán thất bại. Vui lòng thử lại sau.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="p-6 pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-medium">
              THÔNG TIN KHUYẾN MÃI
            </DialogTitle>

          </div>
        </DialogHeader>

        <div className="p-6 pt-2 space-y-6">
          {/* Checkbox xác nhận thông tin */}
          <div className="flex items-center gap-2">
            <Checkbox id="confirm" checked={isChecked} onCheckedChange={handleCheckboxChange} />
            <label htmlFor="confirm" className="text-sm">
              Tôi xác nhận các thông tin khuyến mãi đã chính xác
            </label>
          </div>

          {/* Nút Thanh toán */}
          <Button
            className={`w-full mt-4 ${isChecked ? "bg-orange-500" : "bg-gray-400"}`}
            disabled={!isChecked}
            onClick={handleBookingClick}
          >
            Thanh Toán
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
