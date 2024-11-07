import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilmItemHover } from "../Film/index"
import RootLayout from "@/components/Layout/RootLayout"
import { useMovieStore } from "@/store/Movie"
import { useQuery } from "@tanstack/react-query"
import moviesAPI from "@/apis/movie"
import { ReactNode, useEffect } from "react"
import { cn } from "@/lib/utils"

const ListFilm = ({ className }: { className?: ReactNode }) => {
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
      <RootLayout className={cn("", className)}>
        <Tabs defaultValue="future" className=" mx-auto">
          <TabsList className="w-full gap-x-5 md:w-auto ">
            {updatedTabs.map((item) => (
              <TabsTrigger className="cursor-pointer " key={item.id} value={item.slug}>{item.title}</TabsTrigger>

            ))}
          </TabsList>

          {updatedTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.slug}>
              <div className="py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {tab.List.map((film) => (
                  <FilmItemHover key={film.id_movie} Film={film} />
                ))}
              </div>
            </TabsContent>
          ))}

        </Tabs>
      </RootLayout>

    </>
  )
}

export default ListFilm