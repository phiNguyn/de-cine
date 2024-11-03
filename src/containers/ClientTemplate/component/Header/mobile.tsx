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
import ComboFoodPopup from "@/containers/ClientTemplate/component/ComboFood"
const SheetDemo = () => {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"}><Menu /></Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mt-5">

            <SearchInput />
          </SheetHeader>

          <SheetFooter className="mt-5">

            <ComboFoodPopup />
          </SheetFooter>
        </SheetContent>

      </Sheet>
    </div>
  )
}


export default SheetDemo