import moviesAPI from '@/apis/movie';
import Loader from '@/components/loader';
import { useMovieStore } from '@/store/Movie';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FilmItemHover } from '../component/Film';

const MoviesPage = () => {
  const { movie, setMovie } = useMovieStore((state) => state)
  const { data, isLoading } = useQuery({
    queryKey: ['movie'],
    queryFn: moviesAPI.getAllMovie,
    staleTime: 60 * 1000,

  })


  useEffect(() => {
    if (data) {
      setMovie(data)
    }
  }, [data, setMovie])
  
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      {/* <NavLink to={''}></NavLink> */}
      {isLoading ? <Loader /> : <>
        <div className=' sm:max-w-2xl md:max-w-3xl lg:max-w-5xl  2xl:max-w-[1440px] mx-auto'>
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 my-10 px-4">
            {movie.map((item) => (
              <FilmItemHover className="col-span-1" key={item.id_movie} Film={item} />
            ))}
          </div>
        </div>
      </>}
    </div>
  )
}


export default MoviesPage
