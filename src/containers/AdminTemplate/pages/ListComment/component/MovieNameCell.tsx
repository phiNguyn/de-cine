import moviesAPI from "@/apis/movie";
import { useState, useEffect } from "react";

interface MovieNameCellProps {
  idMovie: string;
}

const MovieNameCell = ({ idMovie }: MovieNameCellProps) => {
  const [nameMovie, setNameMovie] = useState<string>("Đang tải...");

  useEffect(() => {
    const fetchUserName = async (idMovie:number) => {
      try {
        const resp = await moviesAPI.getMovieById(idMovie);
        if (resp) {
            setNameMovie(resp.movie_name);
        }
      } catch (error) {
        console.error("Lỗi khi lấy movie_name:", error);
        setNameMovie("Không xác định");
      }
    };

    fetchUserName(Number(idMovie));
  }, [idMovie]);

  return <div>{nameMovie}</div>;
};

export default MovieNameCell;
