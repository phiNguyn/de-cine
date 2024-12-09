import { commentAPI } from "@/apis/comment";
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
import { Star } from "lucide-react"; // Import biểu tượng Star từ lucide-react

interface MovieComment {
  onFilterChange: (rating?: number | string) => void;
}

const StartFilter = ({ onFilterChange }: MovieComment) => {
  const [ratings, setRatings] = useState<number[]>([]); // Lưu các mức đánh giá

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const resp = await commentAPI.getAllComments();
        if (resp && Array.isArray(resp)) {
          // Kiểm tra `resp` có giá trị và là một mảng
          const uniqueRatings = Array.from(new Set(resp.map((comment) => comment.rating)));
          setRatings(uniqueRatings.sort((a, b) => a - b)); // Sắp xếp tăng dần
        } else {
          console.warn("API không trả về danh sách bình luận.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bình luận:", error);
      }
    };
    fetchRatings();
  }, []);

  const handleRatingChange = (value: string) => {
    const ratingId = value === "undefined" ? undefined : Number(value);
    onFilterChange(ratingId);
  };

  return (
    <div>
      <Select onValueChange={handleRatingChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn mức đánh giá" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mức đánh giá</SelectLabel>
            {ratings.map((rating) => (
              <SelectItem
                key={rating}
                value={String(rating)}
                className="flex items-center space-x-2"
              >
                <div className="flex items-center space-x-1">
                  {Array.from({ length: rating }, (_, index) => (
                    <Star
                      key={index}
                      className="text-yellow-500 w-5 h-5"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </SelectItem>
            ))}
            <SelectItem value="undefined" className="flex items-center">
              <span>Bỏ chọn</span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StartFilter;
