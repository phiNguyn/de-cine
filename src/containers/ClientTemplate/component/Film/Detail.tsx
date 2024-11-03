import { FC, ReactNode} from "react"
import { Movie } from "@/types/movie";
import moment from "moment-timezone";
import { PopupYoutubeDetail } from "./PopupYoutube";
import { CalendarFold, Clock } from "lucide-react";
import { Blockquote } from "@/components/Typography/blockquote";
import { cn } from "@/lib/utils";

const Detail: FC<{ movie: Movie | undefined , className ?: ReactNode}> = ({ movie, className }) => {
  // const image = 'https://files.betacorp.vn/media/images/2024/10/15/1702wx621h-2-162415-151024-72.jpg'
  return (
    <div className="w-full my-5 h-[80vh] md:h-[480px]">
      <div className={cn("relative w-full h-full bg-gradient-to-t from-black md:bg-gradient-to-r md:from-black", className)}>
        <div className={'absolute  h-full w-full overflow-hidden bg-fixed  bg-center bg-no-repeat -z-[1]'}  >
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-y-5 md:gap-x-5 md:flex-row   md:items-start ">
            <div className="w-[200px] md:w-fit relative">
              <img src={movie?.image_main} className="h-auto" alt={movie?.movie_name} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <PopupYoutubeDetail ytSlug={movie?.youtube_url} />
              </div>

            </div>
            <div className="ml-5 flex flex-col gap-y-2 w-full h-full md:gap-y-5">
              <div className="flex flex-col gap-x-2">
                <div className="flex  justify-center items-center w-fit px-2 py-1 border rounded-md bg-red-800 text-sm text-white font-bold">T18</div>
                <h1 className="text-white text-xl font-bold md:text-4xl">{movie?.movie_name}</h1>
                <div className="text-md text-gray-300 flex gap-x-1 mt-2">
                  <div className="flex gap-x-2 items-center">

                  <Clock size={25} className="text-yellow-300"/>
                   {moment.utc(movie?.release_date).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY")} -
                  </div>
                  <div className="flex items-center gap-x-2"></div>
                <CalendarFold size={25} className="text-yellow-300"/> {movie?.duration} phút
                  </div>

              </div>
              {/* decripetion */}
              <div className="text-white">
                <h2 className=" text-xl font-bold md:text-2xl">Nội dung</h2>
                <Blockquote>{movie?.description}</Blockquote>
              </div>
              {/* Country */}
              <div className="flex justify-between items-center text-white w-fit gap-x-5">
                <span>Quốc Gia: </span> <span className="border border-white rounded-md px-2 py-1">{movie?.country}</span>
              </div>
              {/* Thể Loại */}
              <div className="flex justify-between items-center text-white w-fit gap-x-5">
              <span>Thể Loại: </span>
                {movie?.genres?.map((item) => (
                  <>
                <span key={item.id_genre} className="border border-white rounded-md px-2 py-1">{item.genre_name}</span>
                  </>
                ))}
              </div>
              {/* actor */}
              <div className="flex justify-between items-center text-white w-fit gap-x-5">
                <span>Diễn viên: </span>
                  <span  className="border border-white rounded-md px-2 py-1">{movie?.cast}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}





export default Detail