import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { FC } from "react"
const SearchInput : FC = () => {
    return (
        <>
           <div className="w-full grid grid-cols-[80%_20%] py-2">
            <Input className="w-full"/>
            <Button className="w-full"><Search/></Button>
           </div>
        </>
    )
}

export default SearchInput