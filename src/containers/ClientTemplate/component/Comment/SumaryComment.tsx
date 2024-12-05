import { Star } from "lucide-react";
import { SumaryCommentAndStart } from "@/types/comment";
import { useEffect, useState } from "react";
import { commentAPI } from "@/apis/comment";
// import Loader from "@/components/loader";

// Cập nhật props nhận vào để nhận dữ liệu từ component cha
const SumaryComment = ({id_movie} : {id_movie : number}) => {
    const [sumaryComment, setSumaryComment] = useState<SumaryCommentAndStart | null>(null);
    // const [isLoading,setIsLoading] = useState(false)
    useEffect(() => {
      const fetchSumaryComment = async () => {
        // setIsLoading(true)
        try {
          const resp = await commentAPI.sumaryCommnet(id_movie);
          console.log("Dữ liệu trả về từ API:", resp.data); 
          setSumaryComment(resp); 
        } catch (error) {
          console.error("Lỗi khi gọi API:", error); 
        }
        // finally{
        // setIsLoading(false)

        // }
      };
    
      if (id_movie) {
        fetchSumaryComment(); // Gọi API khi id_movie có giá trị
      }
    }, [id_movie]);
    if (!sumaryComment) {
        return <p>Đang tải bình luận...</p>;
    }

  return (
            <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Bình luận từ người xem</h2>
            <div className="flex items-center gap-2">
            <Star className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
            <span className="text-2xl font-bold">{sumaryComment.average_rating}</span>
            <span className="text-gray-500">/5 · {sumaryComment.total_comments} đánh giá</span>
            </div>
            </div>
  );
};

export default SumaryComment;
