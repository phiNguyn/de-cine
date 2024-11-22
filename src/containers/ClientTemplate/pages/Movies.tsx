import moviesAPI from '@/apis/movie';
import Loader from '@/components/loader';
import { useMovieStore } from '@/store/Movie';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FilmItemHover } from '../component/Film';

const MoviesPage = () => {
  const { movie, setMovie } = useMovieStore((state) => state)
  const { data, isLoading } = useQuery({
    queryKey: ['movie'],
    queryFn: moviesAPI.getAllMovie
  })


  useEffect(() => {
    if (data) {
      setMovie(data)
    }
  }, [data, setMovie])

  return (
    <div>
      <NavLink to={''}></NavLink>
      {isLoading ? <Loader /> : <>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6 m-10">
            {movie.map((item) => (
              <FilmItemHover key={item.id_movie} Film={item} />
            ))}
          </div>
        </div>
      </>}
    </div>
  )
}


export default MoviesPage
