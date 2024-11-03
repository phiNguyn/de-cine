import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const Promotions = ({children , className} : {children? : ReactNode, className? : ReactNode} ) => {
  return (
    <div className={cn("my-5 px-5", className)}>
        <div className="flex gap-x-5">
          <span className="border-l-2 border-yellow-300"></span>  
        <h1 className="text-2xl font-bold">TIN KHUYẾN MÃI</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {children}
        </div>
    </div>
  )
}

export default Promotions