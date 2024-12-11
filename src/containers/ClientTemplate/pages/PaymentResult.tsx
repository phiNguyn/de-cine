import PaymentAPI from "@/apis/payment";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentResult = () => {
  const location = useLocation();

  // Lấy query parameters từ URL
  const queryParams = new URLSearchParams(location.search);

  // Lấy từng giá trị cụ thể
  const orderId = queryParams.get("orderId");
  const requestId = queryParams.get("requestId");
  const amount = queryParams.get("amount");
  const resultCode = queryParams.get("resultCode");
  const updateBooking = async () => {
    try {
      const data = {
        orderId,
        requestId,
        amount,
        resultCode
      }
      const resp = await PaymentAPI.WebhookMOMO(data)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  // useEffect(() => {
  //   updateBooking()
  // }, [])
  return (
    <div>PaymentResult</div>
  )
}

export default PaymentResult