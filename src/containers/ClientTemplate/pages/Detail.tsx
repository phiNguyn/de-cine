import { BreadcrumbComponent } from "@/components/Breadcrumb"
import Detail from "@/containers/ClientTemplate/component/Film/Detail"
import RootLayout from "@/components/Layout/RootLayout"
import { ShowTimeTabs } from '@/containers/ClientTemplate/component/Film/ShowTimeTabs';
import MovieIsShowing from "@/containers/ClientTemplate/component/Film/MovieIsShowing";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moviesAPI from "@/apis/movie";
import { Movie } from "@/types/movie";

const DetailMoviePage = () => {
    const {id} = useParams()
    const [movieDetail, setMovieDetail] = useState<Movie>()
    useEffect(() => {
      const fetchMovieDetail =async () => {
        try {
          const resp = await moviesAPI.getMovieById(Number(id))
          setMovieDetail(resp)
        } catch (error) {
          console.log(error);
          
        }
      }
      fetchMovieDetail()
    },[id])
    return (
        <div >
            <RootLayout>
                <BreadcrumbComponent href="/dat-ve" prop="Đặt Vé" title={movieDetail?.movie_name} />
            </RootLayout>
            <Detail movie={movieDetail} />
            <RootLayout className="max-w[1240px] mx-auto grid grid-cols-1 md:grid-cols-[70%_30%] gap-x-5">
                <ShowTimeTabs />
                <MovieIsShowing className="hidden md:block" />
            </RootLayout>
        </div>
    )
}

export default DetailMoviePage