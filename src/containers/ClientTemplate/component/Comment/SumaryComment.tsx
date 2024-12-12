import { Star } from "lucide-react";
import { SumaryCommentAndStart } from "@/types/comment";
import { useEffect, useState } from "react";
import { commentAPI } from "@/apis/comment";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
// import Loader from "@/components/loader";

// Cập nhật props nhận vào để nhận dữ liệu từ component cha
const SumaryComment = ({ id_movie }: { id_movie: number }) => {
  const [sumaryComment, setSumaryComment] = useState<SumaryCommentAndStart | null>(null);
  const { data, isLoading,  isError } = useQuery({
    queryKey: ['sumaryComment', id_movie],
    queryFn: () => commentAPI.sumaryCommnet(id_movie),
    staleTime: 20 * 1000
  })
  useEffect(() => {
    if (data) {
      setSumaryComment(data)
    }
  }, [data, setSumaryComment])
  if(isError) return <div>Chưa có bình luận </div>
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Bình luận từ người xem</h2>
      {isLoading ? <Loader /> :
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
          <span className="text-2xl font-bold">{sumaryComment?.average_rating}</span>
          <span className="text-gray-500">/5 · {sumaryComment?.total_comments} đánh giá</span>
        </div>
      }
    </div>
  );
};

export default SumaryComment;
