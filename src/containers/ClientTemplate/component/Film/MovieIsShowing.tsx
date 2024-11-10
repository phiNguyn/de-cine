import { FC, useEffect, useState } from "react"
import { FilmItem } from "."
import { cn } from '../../../../lib/utils';
import moviesAPI from "@/apis/movie";
import { Movie } from "@/types/movie";
export interface ClassName {
    className?: string
}
const MovieIsShowing: FC<ClassName> = ({ className }) => {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {

        const fetchMovies = async () => {
            try {
                const resp = await moviesAPI.getAllMovie()
                setMovies(resp)
            } catch (error) {
                console.log(error);

            }
        }
        fetchMovies()
    }, [])




    return (
        <>
            <div className={cn("grid grid-cols-1",
                className
            )}>

                <div className='flex  md:my-0'>
                    <span className='border-l-4 border-solid border-yellow-500 mr-2'></span><h1 className="text-2xl ">Phim Đang Chiếu</h1>
                </div>
                <div className="grid grid-cols-1 justify-between items-center mt-5 gap-y-5">
                    {movies.splice(0, 3).map(item => (

                        <FilmItem key={item.id_movie} Film={item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MovieIsShowing