import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { useTheme } from "../theme-provider"
  
  const Dropdown = () => {
    const { setTheme } = useTheme()
    return (


    <DropdownMenu >
  <DropdownMenuTrigger >
  <Button    variant="destructive">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel onClick={() => setTheme("light")}>Light</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    )

  }

  export default Dropdown