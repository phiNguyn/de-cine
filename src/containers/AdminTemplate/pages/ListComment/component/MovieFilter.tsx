import moviesAPI from "@/apis/movie";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

interface MovieComment {
  onFilterChange: (id?: number | string) => void;
}

const MovieFillter = ({ onFilterChange }: MovieComment) => {
  const [movieFillter, setMovieFillter] = useState<Movie[] | []>([]);


  const { data } = useQuery({
    queryKey: ['MovieActive'],
    queryFn: () => moviesAPI.getAllMovieActive("active"),
    staleTime: 60 * 1000
  })
  useEffect(() => {
    if (data) {
      setMovieFillter(data)
    }
  }, [data, setMovieFillter])
  const handleMovieChange = (value: string) => {
    const movieId = value === "undefined" ? undefined : Number(value);
    onFilterChange(movieId);
  };

  return (
    <div>
      <Select onValueChange={handleMovieChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn phim" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Phòng chiếu</SelectLabel>
            {movieFillter.map((movie) => (
              <SelectItem key={movie.id_movie} value={String(movie.id_movie)}>
                {movie.movie_name}
              </SelectItem>
            ))}
            <SelectItem value="undefined">Bỏ chọn</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MovieFillter;
