import { BreadcrumbComponent } from "@/components/Breadcrumb";
import Detail from "@/containers/ClientTemplate/component/Film/Detail";
import RootLayout from "@/components/Layout/RootLayout";
import { ShowTimeTabs } from '@/containers/ClientTemplate/component/Film/ShowTimeTabs';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moviesAPI from "@/apis/movie";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import MovieComment from "../component/Comment";
import { User } from "@/types/user";
import { StorageKeys } from "@/constants/StorageKeys";

const DetailMoviePage = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);

  const { data } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => moviesAPI.getMovieById(Number(id)),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setMovieDetail(data);
    }
  }, [data]);

  const user: User | null = localStorage.getItem(StorageKeys.USERDATA) ? JSON.parse(localStorage.getItem(StorageKeys.USERDATA)!) : null;

  if (!movieDetail) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <RootLayout>
        <BreadcrumbComponent href="/dat-ve" prop="Đặt Vé" title={movieDetail.movie_name} />
      </RootLayout>
      <Detail movie={movieDetail} />
      <RootLayout className="max-w[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-5">
        <ShowTimeTabs showDay={movieDetail} />
        {/* <MovieIsShowing className="col-span-1 row-span-3"/> */}
        <div className="col-span-1 row-span-3"></div>
        <MovieComment id_movies={Number(id)} user={user} /> {/* Truyền thông tin user từ cha xuống con */}
      </RootLayout>
    </div>
  );
}

export default DetailMoviePage;
