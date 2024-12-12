"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DialogDescription } from '@radix-ui/react-dialog'
import { useTicketStore } from '@/store/intex'
import { useState } from "react"

interface BookingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void,
    onBooking?: () => void,

}

export function BookingDialog({ open, onOpenChange, onBooking }: BookingDialogProps) {
    const { selectedShowDate, selectedShowTime, selectedProducts, movieName, selectedRoomId, selectedSeats } = useTicketStore()
    const totalSeatsPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    // Tính tổng tiền sản phẩm đã chọn
    const totalProductsPrice = selectedProducts.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

    // Tính tổng tiền
    const totalPrice = totalSeatsPrice + totalProductsPrice;
    const [isChecked, setIsChecked] = useState(false)
    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked)
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md p-0 gap-0">
                <DialogHeader className="p-6 pb-3">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-medium">THÔNG TIN ĐẶT VÉ</DialogTitle>
                        <DialogDescription hidden>
                            THÔNG TIN ĐẶT VÉ
                        </DialogDescription>

                    </div>
                </DialogHeader>
                <div className="p-6 pt-2 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Phim</div>
                            <div className="font-medium text-blue-600">{movieName?.movie_name}</div>
                            <div className="text-sm">2D Lồng Tiếng</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Thời gian</div>
                            <div className="text-sm">{selectedShowTime} - {selectedShowDate?.date_time}</div>
                        </div>
                        <div className="p-4  rounded-lg space-y-2">
                            <div className="font-medium">Phòng: {selectedRoomId}</div>
                            <div className="flex items-center gap-x-2">
                                Ghế:
                                {selectedSeats.map((seat) => (
                                    <div className="text-sm justify-center flex items-center  bg-yellow-500 size-8 rounded-sm" key={seat.id_chair}>{seat.chair_name}</div>
                                ))}
                            </div>
                            {selectedProducts.map((product) => (
                                <div key={product.product.id_product} className="text-sm">
                                    {product.quantity}x {product.product.product_name} {product.product.price.toLocaleString()} đ
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                        <div className="font-medium">Tổng</div>
                        <div className="text-lg font-bold text-blue-600">{totalPrice.toLocaleString()} VNĐ</div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Checkbox id="terms" className="mt-1" checked={isChecked}
                            onCheckedChange={handleCheckboxChange} />
                        <label htmlFor="terms" className="text-sm">
                            Tôi xác nhận các thông tin đặt vé đã chính xác
                        </label>
                    </div>
                    <Button onClick={onBooking} disabled={!isChecked} className="w-full bg-yellow-500 hover:bg-yellow-600">
                        Thanh Toán
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

