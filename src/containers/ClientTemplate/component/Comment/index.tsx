import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Comment as CommentInterface } from "@/types/comment";
import { commentAPI } from "@/apis/comment";
import { UserAPI } from "@/apis/user";
import { User } from "@/types/user";
import TableComment from "./TableComments";

interface CommentProps {
  id_movies: number;
  user: User | null;
}

export default function MovieComment({ id_movies }: CommentProps) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<(CommentInterface & { user: User | null })[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchCommentsAndUsers = async () => {
      try {
        const comments = await commentAPI.getCommentsByMovieId(id_movies);
        if (!comments) {
          setReviews([]);
          return;
        }

        const enrichedComments = await Promise.all(
          comments.map(async (comment) => {
            const userDetail = await UserAPI.userDetail(comment.id_account);
            return { ...comment, user: userDetail };
          })
        );

        setReviews(enrichedComments);
      } catch (error) {
        console.error("Failed to fetch comments and users:", error);
      }
    };

    fetchCommentsAndUsers();
  }, [id_movies]);

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }

    if (!newComment.trim() || rating === 0) {
      alert("Vui lòng nhập nội dung bình luận và đánh giá!");
      return;
    }

    const newReview: Omit<CommentInterface, "id" | "created_at" | "updated_at"> = {
      id_movies,
      id_account: user.id_account,
      content: newComment.trim(),
      rating,
      id_comment: 0
    };

    try {
      const createdComment = await commentAPI.createComment(newReview);
      const userDetail = await UserAPI.userDetail(user.id_account);

      setReviews((prev) => [
        ...prev,
        { ...createdComment, user: userDetail } as CommentInterface & { user: User | null },
      ]);

      setNewComment("");
      setRating(0);
      setIsCommenting(false);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleEditComment = async (commentId: number) => {
    const updatedContent = prompt("Nhập nội dung mới cho bình luận:");
    if (!updatedContent) return;
    
    try {
      // Chỉ cần gọi API mà không gán giá trị
      await commentAPI.updateComment(commentId, {
        content: updatedContent,
      });
  
      // Cập nhật danh sách bình luận
      setReviews((prev) =>
        prev.map((review) =>
          review.id_comment === commentId ? { ...review, content: updatedContent } : review
        )
      );
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };
  

  const handleDeleteComment = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return;

    try {
      await commentAPI.deleteComment(id);
      setReviews((prev) => prev.filter((review) => review.id_comment !== id));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleStartCommenting = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }
    setIsCommenting(true);
  };

  return (
    <div className="max-w-2xl mr-5 mb-4 pl-32 ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Bình luận từ người xem</h2>
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
          <span className="text-2xl font-bold">8.8</span>
          <span className="text-gray-500">/10 · 2.5K đánh giá</span>
        </div>
      </div>

            {reviews.map((review) => (
                <Card key={review.id} className="mb-4 p-4">
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{review.author}</h3>
                                <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                                <span className="font-medium">{review.rating}/10</span>
                            </div>
                            <p className="text-gray-700 mb-4">{review.content}</p>
                          
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <span className="ml-1 text-gray-500">{review.reactions.calm}</span>
                                </Button>
                                <Button variant="outline" size="sm">
                                    Đồng cảm
                                    <span className="ml-1 text-gray-500">{review.reactions.empathy}</span>
                                </Button>
                                <Button variant="outline" size="sm">
                                    Nhận văn
                                    <span className="ml-1 text-gray-500">{review.reactions.literary}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
            <div className="flex justify-end">
                {!isCommenting ? (
                    <Button variant="primary" size="sm" onClick={() => setIsCommenting(true)}>
                        Bình Luận
                    </Button>
                ) : (
                    <div className="w-full mt-4">
                        <textarea
                            className="w-full p-2 border rounded mb-2"
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Viết bình luận của bạn..."
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" size="sm" onClick={() => setIsCommenting(false)}>
                                Hủy
                            </Button>
                            <Button variant="primary" size="sm" onClick={handleCommentSubmit}>
                                Gửi
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
