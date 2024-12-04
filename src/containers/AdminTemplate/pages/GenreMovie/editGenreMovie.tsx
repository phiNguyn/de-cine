import moviesAPI from "@/apis/movie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGenreMovieStore } from "@/store/GenreMove";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditGenreMovie({ selectedId, onClose }: { selectedId?: number, onClose: () => void }) {
  const [genreName, setGenreName] = useState(""); // State để lưu tên thể loại
  const { updateGenreMovie, getGenre } = useGenreMovieStore((state) => state);
  const genreMovie = getGenre(selectedId);

  useEffect(() => {
    if (genreMovie) {
      setGenreName(genreMovie.genre_name);
    }
  }, [selectedId, genreMovie]);

  const handleEditGenreMovie = async () => {
    if (!genreName || selectedId === undefined) return; // Kiểm tra nếu không có tên thể loại hoặc ID không hợp lệ

    try {
      const resp = await moviesAPI.updateGenreMovie(selectedId, genreName);
      setGenreName(""); // Reset lại input

      if (resp?.status === 200) {
        updateGenreMovie(resp.data);
        toast.success("Đã cập nhật");
        onClose(); // Đóng dialog sau khi cập nhật thành công
      }
    } catch (error) {
      console.error("Error updating genre movie:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật thể loại phim");
    }
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name-genremovie" className="text-right">
            Tên thể loại
          </Label>
          <Input
            id="name-genremovie"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>
      <Button onClick={handleEditGenreMovie}>Cập nhật</Button>
      <Toaster />
    </>
  );
}

