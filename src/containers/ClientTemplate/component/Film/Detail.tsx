import { FC } from "react"
import { movie } from '../../../../types/movie';
import { PopupYoutubeDetail } from "./PopupYoutube";

const Detail: FC<{ movie: movie }> = ({ movie }) => {
  // const image = 'https://files.betacorp.vn/media/images/2024/10/15/1702wx621h-2-162415-151024-72.jpg'
  return (
    <div className="w-full  my-5 h-[80vh] md:h-[480px]">
      <div className="relative w-full h-full bg-gradient-to-t from-black md:bg-gradient-to-r md:from-black">
        <div className="absolute  h-full w-full overflow-hidden bg-fixed  bg-center bg-no-repeat -z-[1] bg-[url('https://files.betacorp.vn/media/images/2024/10/15/1702wx621h-2-162415-151024-72.jpg')] " >
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-y-5 md:gap-x-5 md:flex-row   md:items-start ">
            <div className="w-[200px] md:w-fit relative">
              <img src={movie.image} className="h-auto" alt={movie.name} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <PopupYoutubeDetail ytSlug={movie.ytSlug} />
              </div>

            </div>
            <div className="ml-5 flex flex-col gap-y-2 w-full h-full md:gap-y-5">
              <div className="flex flex-col gap-x-2">
                <div className="flex  justify-center items-center w-fit px-2 py-1 border rounded-md bg-red-800 text-sm text-white font-bold">{movie.tag}</div>
                <h1 className="text-white text-xl font-bold md:text-4xl">{movie.name}</h1>
                <div className="text-md text-gray-300"> {movie.year} - {movie.time}</div>

              </div>
              {/* decripetion */}
              <div className="text-white">
                <h2 className=" text-xl font-bold md:text-2xl">Nội dung</h2>
                <span className="">{movie.decripetion}</span>
              </div>
              {/* Country */}
              <div className="flex justify-between items-center text-white w-fit gap-x-5">
                <span>Quốc Gia: </span> <span className="border border-white rounded-md px-2 py-1">{movie.country}</span>
              </div>
              {/* Thể Loại */}
              <div className="flex justify-between items-center text-white w-fit gap-x-5">
                <span>Thể Loại: </span> <span className="border border-white rounded-md px-2 py-1">{movie.genre}</span>
              </div>
              {/* actor */}
              <div className="flex justify-between items-center text-white w-fit gap-x-5">
                <span>Diễn viên: </span> {movie.actor?.map((item, index) => (
                  <span key={index} className="border border-white rounded-md px-2 py-1">{item}</span>
                )
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}





export default Detail