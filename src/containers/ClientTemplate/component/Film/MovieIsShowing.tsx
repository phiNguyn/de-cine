import { FC, useEffect, useState } from "react"
import { FilmItem } from "."
import { cn } from '../../../../lib/utils';
import moviesAPI from "@/apis/movie";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
export interface ClassName {
    className?: string
}
const MovieIsShowing: FC<ClassName> = ({ className }) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const { data, isLoading } = useQuery({
        queryKey: ['moviesActive',],
        queryFn: () => moviesAPI.getAllMovieActive('active'),
        staleTime: 60 * 1000,
    });
    useEffect(() => {
        if (data) {
            setMovies(data)
        }
    }, [data, setMovies]);




    return (
        <>
            <div className={cn("grid grid-cols-1",
                className
            )}>

                <div className='flex  md:my-0'>
                    <span className='border-l-4 border-solid border-yellow-500 mr-2'></span><h1 className="text-2xl ">Phim Đang Chiếu</h1>
                </div>
                <div className="grid grid-cols-1 justify-between items-center mt-5 gap-y-5">
                    {isLoading ?
                        <Loader /> :
                        <>
                            {movies.splice(0, 3).map(item => (
                                <FilmItem key={item.id_movie} Film={item} />
                            ))}
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default MovieIsShowing