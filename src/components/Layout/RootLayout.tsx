import { ReactNode } from "react"

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-5">{children}</div>
  )
}

export default RootLayout