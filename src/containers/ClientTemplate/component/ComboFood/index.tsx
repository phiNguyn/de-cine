
import { FC, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"

import { Minus, Plus } from "lucide-react"

export interface Combo {
    id: string
    name: string,
    image: string,
    basePrice: number
}

export interface ComboFoodItemProps {
    combo: Combo,
    quantity: number,
    onUpdateQuantity: (id: string, delta: number) => void
}
export const ComboItem = ({ combo, quantity, onUpdateQuantity }: { combo: Combo, quantity: number, onUpdateQuantity: (id: string, delta: number) => void }) => {

    return (
        <>
            <div key={combo.id} className="flex items-center justify-between border-t pt-2 border-black">
                <div className="flex items-center">
                    <img src={combo.image} alt={combo.name} className="w-20 h-20 object-cover rounded mr-4 " />
                    <div>
                        <h3 className="font-semibold">{combo.name}</h3>
                        <p>{combo.basePrice.toLocaleString()}đ</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Button
                        onClick={() => onUpdateQuantity(combo.id, -1)}
                    >
                        <Minus size={16} />
                    </Button>
                    <span className="mx-3">{quantity}</span>
                    {/* <input type="text" value={quantity} /> */}
                    <Button
                        onClick={() => onUpdateQuantity(combo.id, +1)}
                    >
                        <Plus size={16} />
                    </Button>
                </div>


            </div>
        </>
    )
}

const ComboFoodPopup: FC = () => {
    const fakeCombo: Combo[] = [
        { id: "1", name: "A ha ", image: "https://iguov8nhvyobj.vcdn.cloud/media/concession/app/6644731d586ae_1715761949.png", basePrice: 99000, },
        { id: "2", name: "A ha ", image: "https://iguov8nhvyobj.vcdn.cloud/media/concession/app/6644731d586ae_1715761949.png", basePrice: 99000, }
    ]
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
    const updateQuantity = (id: string, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }))
    }
    const totalAmount = fakeCombo.reduce((sum, combo) => sum + (quantities[combo.id] || 0) * combo.basePrice, 0)
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">Xem Combo [test]</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-full">
                <DialogHeader>
                    <DialogTitle className="w-full text-center">Combo Bắp Nước</DialogTitle>

                </DialogHeader>
                {fakeCombo.map((item) => (
                    <ComboItem key={item.id} combo={item}
                        quantity={quantities[item.id] || 0}
                        onUpdateQuantity={updateQuantity} />
                ))}

                <DialogFooter className="!flex !flex-col">
                    <div className="flex justify-between mb-2">
                        <span>Tổng tiền bắp nước:</span>
                        <span>{totalAmount.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="font-bold">Tổng tiền:</span>
                        <span className="font-bold">{totalAmount.toLocaleString()}đ</span>
                    </div>
                    <Button className="w-full text-white" type="submit" variant={"primary"}>Tiếp tục</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ComboFoodPopup