import { Link } from "react-router-dom"
import { Button } from "../../../../components/ui/button"
import PopupYoutube from "./PopupYoutube"
import { Movie } from "@/types/movie"
import { API_URL } from "@/constants/api"
import { AspectRatio } from "@/components/ui/aspect-ratio"



const FilmItem = ({ Film }: { Film: Movie }) => {
    return (
        <Link to={`/dat-ve/${Film.id_movie}`} key={Film.id_movie}>
            <div className="relative group w-[150px] ">
                <img loading="lazy" className="w-full h-auto rounded-md" src={`${API_URL.baseUrl}/${Film.image_main}`} alt={Film.movie_name} />
                <div className="absolute opacity-0 group-hover:opacity-50 top-0 bg-slate-900 w-full h-full group-hover:duration-500"></div>
                <div className="flex flex-col gap-y-5 absolute left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2  opacity-0   group-hover:top-1/2  group-hover:opacity-100 transition group-hover:duration-700 ease-in-out">
                    <Button size={"sm"} variant={"primary"}>Mua Vé</Button>
                </div>
            </div>
            <div className="mt-5">{Film.movie_name}</div>
        </Link>
    )
}

const FilmItemHover = ({ Film }: { Film: Movie }) => {
    return (
        <>
            <div key={Film.id_genre} className="relative group w-full h-auto">
                <div className="w-[185px] h-[275px] lg:w-[290px] lg:h-[435px]">
                    <AspectRatio ratio={2 / 3}>
                        <img loading="lazy" className="rounded-xl h-full object-cover" src={`${API_URL.baseUrl}/${Film.image_main}`} alt={Film.movie_name} />
                        <div className="absolute opacity-0 group-hover:opacity-50 top-0 bg-gray-900 w-full h-full group-hover:duration-500"></div>
                        <div className="flex flex-col gap-y-5 absolute left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2  opacity-0   group-hover:top-1/2  group-hover:opacity-100 transition group-hover:duration-700 ease-in-out">
                            <Button variant={"primary"}>
                                <Link to={`/dat-ve/${Film.id_movie}`}>Mua Vé</Link>
                            </Button>
                            <PopupYoutube ytSlug={Film.youtube_url} title="Xem Trailer" />
                        </div>
                    </AspectRatio>
                </div>

                <div className="mt-5">{Film.movie_name}</div>
            </div>
        </>
    )
}


export { FilmItem, FilmItemHover }