import { FC, useEffect } from "react"
import { FilmItem } from "."
import { cn } from '../../../../lib/utils';
import { useMovieStore } from "@/store/Movie";
import { useQuery } from "@tanstack/react-query";
import moviesAPI from "@/apis/movie";
export interface ClassName {
    className?: string
}
const MovieIsShowing: FC<ClassName> = ({ className }) => {
    const { movie, setMovie } = useMovieStore((state) => state)
    const { data } = useQuery({
        queryKey: ['movie'],
        queryFn: moviesAPI.getAllMovie
    })

    useEffect(() => {
        if (data) {
            setMovie(data)
        }
    }, [data])




    return (
        <>
            <div className={cn("grid grid-cols-1",
                className
            )}>

                <div className='flex  md:my-0'>
                    <span className='border-l-4 border-solid border-yellow-500 mr-2'></span><h1 className="text-2xl ">Phim Đang Chiếu</h1>
                </div>
                <div className="grid grid-cols-1 justify-between items-center mt-5 gap-y-5">
                    {movie.splice(0, 3).map(item => (

                        <FilmItem key={item.id_movie} Film={item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MovieIsShowing