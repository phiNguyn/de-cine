import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilmItemHover } from "../Film/index"
import { useMovieStore } from "@/store/Movie"
import { useQuery } from "@tanstack/react-query"
import moviesAPI from "@/apis/movie"
import { ReactNode, useEffect } from "react"
import { cn } from "@/lib/utils"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const ListFilm = ({ className }: { className?: ReactNode }) => {
  const { movie, setMovie } = useMovieStore((state) => state)
  const navigate= useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['movie'],
    queryFn: () => moviesAPI.getAllMovie(),
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (data) {
      setMovie(data)

    }
  }, [data, setMovie])

  const fakeTabs = [
    {
      id: 1, slug: 'future', title: 'Sắp Chiếu'
    },
    {
      id: 2, slug: 'active', title: 'Đang chiếu'

    },
    {
      id: 3, slug: 'dac-biet', title: 'Suất Chiếu Đặc Biệt'
    }
  ]
  const updatedTabs = fakeTabs.map(tab => {
    // Lọc các bộ phim theo status dựa trên slug của tab
    const filteredMovies = movie.filter(movie => {
      if (tab.slug === 'active') {
        return movie.status === 'active';
      }
      if (tab.slug === 'future') {
        return movie.status === 'future'; // Hoặc điều kiện phù hợp để xác định "Sắp Chiếu"
      }
      if (tab.slug === 'dac-biet') {
        return movie.status === 'special'; // Hoặc điều kiện phù hợp để xác định "Suất Chiếu Đặc Biệt"
      }
      return false;
    });

    // Trả về tab đã cập nhật với List mới
    return {
      ...tab,
      List: filteredMovies
    };
  });
  return (
    <>
      <div className={cn("", className)}>
        <Tabs defaultValue="future" className="mx-auto">
          <div className="flex items-center gap-x-5">
            <div className="hidden gap-x-5 lg:flex">
              <span className="border-l-2 border-yellow-300"></span>
              <h1 className="text-md font-bold uppercase lg:text-xl">Phim</h1>
            </div>
            <TabsList className="w-full gap-x-5 md:w-auto ">
              {updatedTabs.map((item) => (
                <TabsTrigger className="cursor-pointer text-xs lg:text-lg" key={item.id} value={item.slug}>{item.title}</TabsTrigger>
              ))}
            </TabsList>

          </div>

          {updatedTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.slug}>
              {isLoading ? <Loader /> :
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6 m-10">
                  {tab.List.splice(0,8).map((film) => (
                    <FilmItemHover key={film.id_movie} Film={film} />
                  ))}
                </div>
              }
            </TabsContent>
          ))}
          <div className="w-full flex justify-center">

    <Button onClick={() => navigate('/movies')} variant={"primary"} size={"default"}>Xem Thêm</Button>
          </div>
        </Tabs>

      </div>
    </>
  )
}

export default ListFilm