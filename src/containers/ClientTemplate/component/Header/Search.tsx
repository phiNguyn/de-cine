import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { FC, ReactNode } from "react"
const SearchBar : FC<{className? : ReactNode}> = ({className}) => {
    return (
        <>
           <div className={cn("w-auto  relative py-2", className)}>
            <Input placeholder="Tìm phim ..." className="w-full h-full border-primary border"/>
            <Button variant={"primary"} size={"icon"} className="absolute right-0 top-1/2 transform -translate-y-1/2"><Search className="text-primary"/></Button>
           </div>
        </>
    )
}

export default SearchBar