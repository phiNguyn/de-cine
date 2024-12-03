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
import { FilmItem } from "@/containers/ClientTemplate/component/Film"
import { useQuery } from "@tanstack/react-query"
import moviesAPI from "@/apis/movie"
import { useMovieStore } from "@/store/Movie"
import { UserNav } from "../Auth/UserNav"
import SearchBar from "./Search"
import SheetMenu from "./mobile"
const Header: FC = () => {
  const { movie, setMovie } = useMovieStore((state) => state)
  const userData = localStorage.getItem("user")

  const { data } = useQuery({
    queryKey: ['movie'],
    queryFn: moviesAPI.getAllMovie,
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (data) {
      setMovie(data)
    }
  }, [data, setMovie])

  const test = [
    {
      id_tag: 1,
      title: "Phim",
      content: [
        {
          id: 1, slug: 'active', tiltle: "Đang chiếu", link: "Movies", list: movie.filter(movie => {
            return movie.status === "active"
          }).splice(0, 4)
        },
        {
          id: 2, slug: 'future', tiltle: "Sắp chiếu", link: "Movies", list: movie.filter(movie => {
            return movie.status === "future"
          }).splice(0, 4)
        }
      ]
    },

  ]

  return (
    <>
      <RootLayout>
        <div className="flex 2xl:max-w-screen-xl items-center justify-between mt-5 font-bold mx-auto">
          <Link to={'/'}>
            <img src="/img/logoDecine.png" alt="" className="w-20" />
          </Link>

          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <Button size={"default"} variant={"primary"} className="flex gap-x-5 font-bold text-lg">
                <img src={ticketBlack}></img>
                <Link to={'/Booking'}>
                  Mua vé ngay
                </Link>
              </Button>
              {test.map((item, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuTrigger className="text-lg font-bold">{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2">
                    {item?.content?.map((c, i) => (
                      <NavigationMenuLink key={i} className="flex flex-col p-2">
                        <Link className="text-2xl" to={`/${c.link}`} >{c.tiltle}</Link>
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
              <Link to={"/booking"} className="text-xl">Vé</Link>
            </NavigationMenuList>
          </NavigationMenu>
          {/* <Dropdown /> */}
          <div className=" flex gap-x-5 items-center">
            {userData ? (
              <div className="flex items-center gap-x-5">
                <SearchBar className="hidden md:block" />
                <UserNav /> {/* Pass user data if needed */}
              </div>
            ) : (
              <Auth /> // Display authentication component if not logged in
            )}
            <SheetMenu />
          </div>
        </div>

      </RootLayout>
    </>


  )
}


export default Header