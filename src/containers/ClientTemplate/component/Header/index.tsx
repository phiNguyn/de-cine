import {

  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import ticketBlack from '@/assets/ic-ticket-black.svg'
import { FC, useEffect } from "react"
import { Auth } from "@/containers/ClientTemplate/component/Auth/index"
import RootLayout from "@/components/Layout/RootLayout"
import SheetDemo from "./mobile"
import { FilmItem } from "@/containers/ClientTemplate/component/Film"
import { useQuery } from "@tanstack/react-query"
import moviesAPI from "@/apis/movie"
import { useMovieStore } from "@/store/Movie"
const Header: FC = () => {
  const { movie, setMovie } = useMovieStore((state) => state)

  const { data } = useQuery({
    queryKey: ['movie'],
    queryFn: moviesAPI.getAllMovie,
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (data) {
      setMovie(data)
    }
  }, [data])

  // Thêm dữ liệu tag giả
  const test = [
    {
      id_tag: 1,
      title: "Phim",
      content: [
        {
          id: 1, tiltle: "Đang chiếu", list: [...movie].splice(0, 3)
        },
        {
          id: 2, tiltle: "Sắp chiếu", list: [...movie].splice(0, 3)
        }
      ]
    },

  ]

  return (
    <>
      <RootLayout>
        <div className="flex justify-between mt-5 font-bold">
          <div>
            <img src="https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg" alt="" className="w-10" />
          </div>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <Button size={"default"} variant={"primary"} className="flex gap-x-5 font-bold text-lg">
                <img src={ticketBlack}></img>
                <span>
                  Mua vé ngay
                </span>
              </Button>
              {test.map((item, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuTrigger className="text-lg font-bold">{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2">
                    {item?.content?.map((c, i) => (
                      <NavigationMenuLink key={i} className="flex flex-col p-2">
                        <Link className="text-2xl" to={"/"}>{c.tiltle}</Link>
                        <div className="flex justify-between gap-6 mt-2">
                          {c.list?.map((l) => (
                            <FilmItem key={l.id_movie} Film={l} />
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
          {/* <Dropdown /> */}
          <Auth />
          <SheetDemo />
        </div>

      </RootLayout>
    </>


  )
}


export default Header