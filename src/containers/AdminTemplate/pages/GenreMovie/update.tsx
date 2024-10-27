import moviesAPI from "@/apis/movie"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGenreMovieStore } from "@/store/GenreMove"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const UpdateGenreMovie = () => {
  const [open, setOpen] = useState(false)
    const [genreName, setGenreName] = useState(""); // State để lưu tên thể loại
    const add = useGenreMovieStore((state) => state.addGenreMovie)
    const handleAddGenreMovie = async () => {
      if (!genreName) return; // Kiểm tra nếu không có tên thể loại
  
      try {
        // Gọi API để thêm thể loại phim
      const resp =   await moviesAPI.addGenreMovie(genreName);
        setGenreName(""); // Reset lại input
        // Có thể thêm thông báo thành công ở đây nếu cần
        if(resp.status === 201) {
          add(resp.data)
         toast.success("Đã thêm thành công")

         setTimeout(() => {
          setOpen(false)
         }, 500);

        }
      } catch (error) {
        console.error("Error adding genre movie:", error);
        // Xử lý lỗi ở đây, ví dụ: thông báo cho người dùng
      }
    
    };
  return (
    <Dialog open = {open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Thêm Mới</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Thể Loại Phim</DialogTitle>
        <DialogDescription>
          Thêm mới thể loại phim
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Tên thể loại
          </Label>
          <Input
            id="name-genremovie"
            value={genreName}
              onChange={(e) => setGenreName(e.target.value)} // Cập nhật state khi nhập liệu
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleAddGenreMovie}>Thêm</Button>
      </DialogFooter>
    </DialogContent>
    <Toaster/>
  </Dialog>
  )
}

export default UpdateGenreMovie