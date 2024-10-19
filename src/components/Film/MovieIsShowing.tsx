import { FC } from "react"
import { FilmItem } from "."
import { cn } from '../../lib/utils';
export interface ClassName {
    className ? : string
}
const MovieIsShowing: FC<ClassName> = ({className}) => {
    const List = 
        [
            { id: 1, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg", ytSlug: "xwshpIu6YkQ" },
            { id: 2, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg", ytSlug: "Bfcc7L68d_0" },
            { id: 3, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg", ytSlug: "Bfcc7L68d_0" },
        ]
        
      
    return (
        <>
        <div className={cn("grid grid-cols-1",
            className
        )}>

            <div className='flex  md:my-0'>
                <span className='border-l-4 border-solid border-yellow-500 mr-2'></span><h1 className="text-2xl ">Phim Đang Chiếu</h1>
            </div>
            <div className="grid grid-cols-1 mt-5">
            {List.map(item => (
                
                <FilmItem key={item.id} Film={item}/>
            ))}
            </div>
            </div>
        </>
    )
}

export default MovieIsShowing