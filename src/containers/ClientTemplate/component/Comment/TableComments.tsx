import { Star, Edit2, Trash, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Comment as CommentInterface } from "@/types/comment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

interface TableCommentProps {
  reviews: (CommentInterface & { user: User | null })[];
  user: User | null;
  onEdit: (id_comment: number, newContent: string, newRating: number) => void; // Cập nhật callback sửa bình luận và rating
  onDelete: (id_comment: number) => void;
}

export default function TableComment({ reviews, user, onEdit, onDelete }: TableCommentProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [editedRating, setEditedRating] = useState<number>(0);

  const handleEditClick = (id_comment: number, content: string, rating: number) => {
    setEditingCommentId(id_comment);
    setEditedContent(content);
    setEditedRating(rating);
  };

  const handleSaveEdit = async (id_comment: number) => {
    if (!editedContent.trim()) {
      alert("Bình luận không thể để trống!");
      return;
    }

    try {
      // Gọi API để cập nhật bình luận
      await onEdit(id_comment, editedContent.trim(), editedRating);
      // Cập nhật danh sách bình luận ngay lập tức
      setEditingCommentId(null);
      setEditedContent("");
      setEditedRating(0);
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật bình luận. Vui lòng thử lại.");
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div>
      {reviews.map((review) => (
        <Card key={review.id_comment} className="mb-4 p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback>{review.user?.full_name?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{review.user?.full_name || "Người dùng ẩn danh"}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {editingCommentId === review.id_comment ? (
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 cursor-pointer ${star <= editedRating ? "fill-yellow-400 stroke-yellow-400" : "fill-gray-300 stroke-gray-300"}`}
                        onClick={() => setEditedRating(star)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="font-medium">{review.rating}/5</span>
                  </div>
                )}
              </div>
              {editingCommentId === review.id_comment ? (
                <div>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-2 border rounded mb-2 text-black"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setEditingCommentId(null)}>
                      Hủy
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => handleSaveEdit(review.id_comment)}>
                      Lưu
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mb-4">{review.content}</p>
              )}
              {user && user.id_account === review.id_account && (
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <MoreHorizontal className="w-4 h-4" />  
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black shadow-lg rounded-lg w-40 p-2">
                      <DropdownMenuItem
                        onClick={() => handleEditClick(review.id_comment, review.content, review.rating)}
                        className="flex items-center p-2 rounded-lg text-white hover:bg-blue-100 hover:text-blue-600 transition-all"
                      >
                        <Edit2 className="w-4 h-4 mr-2" /> Sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(review.id_comment)}
                        className="flex items-center p-2 rounded-lg text-white hover:bg-red-100 hover:text-red-600 transition-all"
                      >
                        <Trash className="w-4 h-4 mr-2" /> Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
