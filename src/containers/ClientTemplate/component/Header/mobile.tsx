import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SearchInput from "./Search"
import { Dropdown } from "@/components/Auth"
import ComboFoodPopup from "@/components/ComboFood"
const  SheetDemo = () => {
  return (
    <div className="block md:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}><Menu/></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-5">
          
          <SearchInput/>
        </SheetHeader>

        <SheetFooter className="mt-5">

         <Dropdown />
        <ComboFoodPopup/>
        </SheetFooter>
      </SheetContent>

    </Sheet>
    </div>
  )
}


export default SheetDemo