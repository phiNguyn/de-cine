import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"
import Dropdown from "../Auth"

const Header = () => {
    const menu = [
        {"id" : 1, "title" : "Hi", "content" : "hello world"},
        {"id" : 2, "title" : "Ha", "content" : "WTF"},
        {"id" : 3, "title" : "cc", "content" : "Nhinf cai cho gi"},

    ]

  return (
    <>
    <div className="flex justify-between !w-full">
    <div>
        <img src="https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg" alt="" className="w-10"/>
    </div>
    <NavigationMenu>
    <NavigationMenuList>
        {menu.map((item) => (
            <NavigationMenuItem key={item.id}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="max-w-fit p-2">
          <NavigationMenuLink>{item.content}</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>

))}
    </NavigationMenuList>
  </NavigationMenu>
  <Dropdown />
</div>
</>
  
  )
}

export default Header