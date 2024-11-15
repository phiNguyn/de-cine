import { FC, ReactNode, useEffect } from "react";
import { Movie } from "@/types/movie";
import moment from "moment-timezone";
import { PopupYoutubeDetail } from "./PopupYoutube";
import { CalendarFold, Clock } from "lucide-react";
import { Blockquote } from "@/components/Typography/blockquote";
import { cn } from "@/lib/utils";
import { API_URL } from "../../../../constants/api";
import { useMovieStore } from "@/store/Showtime";

const Detail: FC<{ movie: Movie | undefined; className?: ReactNode }> = ({
  movie,
  className,
}) => {
  const { setMovie } = useMovieStore();

  // Sử dụng useEffect để tự động lưu movie khi component được render
  useEffect(() => {
    if (movie) {
      setMovie(movie.movie_name, movie.image_main); // Lưu tên và ảnh phim
    }
  }, [movie, setMovie]); // useEffect chỉ chạy khi movie thay đổi

  return (
    <div className="w-full my-5 h-[100vh] md:h-[70vh] ">
      <div
        className={cn(
          `relative w-full h-full md:bg-gradient-to-r from-black`,
          className
        )}
      >
        <div
          style={{
            backgroundImage: `url(${API_URL.baseUrl}/${movie?.poster_url})`,
          }}
          className="absolute hidden w-full h-[50vh] my-auto md:block bg-cover bg-center bg-no-repeat overflow-hidden -z-[1]"
        >
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-x-10 gap-y-5 md:flex-row md:items-start ">
            <div className="w-[200px] md:w-fit relative">
              <img
                loading="lazy"
                src={`${API_URL.baseUrl}/${movie?.image_main}`}
                className="w-80"
                alt={movie?.movie_name}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <PopupYoutubeDetail ytSlug={movie?.youtube_url} />
              </div>
            </div>
            <div className="flex flex-col gap-y-2 w-full h-full md:gap-y-5">
              <div className="flex flex-col gap-x-2">
                <div className="flex justify-center items-center w-fit px-2 py-1 border rounded-md bg-red-800 text-sm text-white font-bold">
                  T18
                </div>
                <h1 className="text-movie text-xl font-bold md:text-4xl">
                  {movie?.movie_name}
                </h1>
                <div className="text-md text-gray-300 flex gap-x-1 mt-2">
                  <div className="flex gap-x-2 items-center">
                    <Clock size={25} className="text-yellow-300" />
                    {moment
                      .utc(movie?.release_date)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("DD/MM/YYYY")}
                    {" "} -{" "}
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CalendarFold size={25} className="text-yellow-300" />{" "}
                    {movie?.duration} phút
                  </div>
                </div>
              </div>
              <div className="text-movie">
                <h2 className="text-xl font-bold md:text-2xl">Nội dung</h2>
                <Blockquote>{movie?.description}</Blockquote>
              </div>
              <div className="flex justify-between items-center text-movie w-fit gap-x-5">
                <span>Quốc Gia: </span>
                <span className="border border-primary rounded-md px-2 py-1">
                  {movie?.country}
                </span>
              </div>
              <div className="flex justify-between items-center text-movie w-fit gap-x-5">
                <span>Thể Loại: </span>
                {movie?.genres?.map((item, i) => (
                  <span
                    key={i}
                    className="border border-primary rounded-md px-2 py-1"
                  >
                    {item.genre_name}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center text-movie w-fit gap-x-5">
                <span>Diễn viên: </span>
                <span className="border border-primary rounded-md px-2 py-1">
                  {movie?.cast}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
