import { Film } from "@/types/Film"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"



const FilmItem  = ({Film} : {Film : Film}) => {
    return (
<Link to={`/dat-ve/${Film.id}`} key={Film.id} className="flex flex-col w-[120px]">
                <img src={Film.image} alt={Film.name} />
               <div >
                {Film.name}
                </div>
              </Link>
    )
}

 const FilmItemHover = ({Film} : {Film : Film}) => {
    return (
        <>
        <div key={Film.id} className="w-[294px] relative group">
            <img src={Film.image} alt={Film.name} />
            <div className="mt-5">{Film.name}</div>
            <div className="flex flex-col absolute left-1/2 bottom-0 transform -translate-x-1/2 -translate-y-1/2  opacity-0  group-hover:top-1/2  group-hover:opacity-100 duration-700">
            <Button variant={"primary"}>Mua Vé</Button>
            <Button variant={"trailer"}>Xem Trailer</Button>
            </div>
        </div>
        </>
    )
 }

 
export  { FilmItem, FilmItemHover}