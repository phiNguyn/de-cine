import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SearchInput from "./Search"
import { Link, useNavigate } from "react-router-dom"
import ticketBlack from '@/assets/ic-ticket-black.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

const SheetMenu = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleNavigate = (value: string) => {
    navigate(value)
    setOpen(false)
  }
  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"}><Menu /></Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mt-5">
            <SheetTitle hidden>Edit profile</SheetTitle>
            <SheetDescription hidden>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
            <SearchInput />
          </SheetHeader>
          <div className="grid grid-cols-1 mt-10">
            <Button size={"default"} variant={"primary"} className="flex gap-x-5 font-bold text-lg">
              <img src={ticketBlack}></img>
              <Link to={'/Booking'}>
                Mua vé ngay
              </Link>
            </Button>
          </div>
          <div className="mt-5">
            <DropdownMenuMobile onClick={handleNavigate} />
          </div>
          <SheetFooter className="mt-5">

          </SheetFooter>
        </SheetContent>

      </Sheet>
    </div>
  )
}


export default SheetMenu



export const DropdownMenuMobile = ({ onClick }: { onClick: (value: string) => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="trailer" size={"default"} className="w-full">Phim</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem onClick={() => onClick('/movies')} value="top" >Đang chiếu</DropdownMenuRadioItem>
          <DropdownMenuRadioItem onClick={() => onClick('/movies')} value="bottom">Sắp chiếu</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}