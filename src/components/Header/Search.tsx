import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
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