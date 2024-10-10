import {movie } from "@/types/movie"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import PopupYoutube from "./PopupYoutube"



const FilmItem = ({ Film }: { Film: movie }) => {
    return (
        <Link to={`/${Film.id}`} key={Film.id}>
                <div className="relative group w-[150px]">
                <img  src={Film.image} alt={Film.name} />
                <div className="absolute opacity-0 group-hover:opacity-50 top-0 bg-slate-900 w-full h-full group-hover:duration-500"></div>
                <div className="flex flex-col gap-y-5 absolute left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2  opacity-0   group-hover:top-1/2  group-hover:opacity-100 transition group-hover:duration-700 ease-in-out">
                    <Button size={"sm"} variant={"primary"}>Mua Vé</Button>
                </div>
                </div>
                <div className="mt-5">{Film.name}</div>
            </Link>
    )
}

const FilmItemHover = ({ Film }: { Film: movie }) => {
    return (
        <>
            <div key={Film.id}>
                <div className="relative group">
                <img className="w-full h-full" src={Film.image} alt={Film.name} />
                <div className="absolute opacity-0 group-hover:opacity-50 top-0 bg-slate-900 w-full h-full group-hover:duration-500"></div>
                <div className="flex flex-col gap-y-5 absolute left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2  opacity-0   group-hover:top-1/2  group-hover:opacity-100 transition group-hover:duration-700 ease-in-out">
                    <Button variant={"primary"}>Mua Vé</Button>
                    <PopupYoutube ytSlug={Film.ytSlug} title="Xem Trailer"/>
                </div>
                </div>
                <div className="mt-5">{Film.name}</div>
            </div>
        </>
    )
}


export { FilmItem, FilmItemHover }