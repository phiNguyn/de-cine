import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const RootLayout = ({ children, className }: { children: ReactNode, className? : string }) => {
  return (
    <div className={cn("px-5",
      className
    )}>{children}</div>
  )
}

export default RootLayout