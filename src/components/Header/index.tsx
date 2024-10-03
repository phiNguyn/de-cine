import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"
import Dropdown from "../Auth"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import ticketBlack from '@/assets/ic-ticket-black.svg'
import { FilmItem } from "../Film"
const Header = () => {
    const menu = [
         {id : 1, title : "Phim", content : [
          {id: 1 , title : "Sắp Chiếu" , list : [
            {id: 1, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
            {id: 2, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
            {id: 3, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
            {id: 4, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"}

          ]
          },
          {id: 2 , title : "Đang chiếu" , 
            list : [
              {id: 1, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
              {id: 2, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
              {id: 3, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
              {id: 4, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"}
  
            ]
          },
          {id: 3 , title : "Suất chiếu đặt biệt", 
            list : [
              {id: 1, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
              {id: 2, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
              {id: 3, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
              {id: 4, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"}
  
            ]
          }

        ]},

    ]

  return (
    <>
    <div className="flex justify-between  px-5 font-bold">
    <div>
        <img src="https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg" alt="" className="w-10"/>
    </div>
    <div className="flex gap-x-10">
    <Button size={"default"}  variant={"primary"} className="flex gap-x-5 font-bold text-lg">
      <img src={ticketBlack}></img> 
        <span>
      Mua vé ngay
      </span>
      </Button>

    <NavigationMenu>
    <NavigationMenuList>
        {menu.map((item) => (
            <NavigationMenuItem key={item.id}>
        <NavigationMenuTrigger className="text-lg font-bold">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="p-2">
          {item.content.map((c) => (
            <NavigationMenuLink key={c.id} className="flex flex-col p-2">
              <Link className="text-2xl" to={"/"}>{c.title}</Link>
              <div className="flex gap-x-5 justify-between mt-2">
            {c.list?.map((l) => (
             <FilmItem key={l.id} Film={l}  />
            ))}
            </div>
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>

))}
  <Link to={"/"} className="text-xl">Vé</Link>
    </NavigationMenuList>
  </NavigationMenu>
    </div>
  <Dropdown />
</div>
</>
  
  )
}

export default Header