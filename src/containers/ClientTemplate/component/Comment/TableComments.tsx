import { Star, Edit2, Trash } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Comment as CommentInterface } from "@/types/comment";

interface TableCommentProps {
  reviews: (CommentInterface & { user: User | null })[];
  user: User | null; // Thêm user hiện tại
  onEdit: (id_comment: number) => void; // Callback khi sửa
  onDelete: (id_comment: number) => void; // Callback khi xóa
}

export default function TableComment({ reviews, user, onEdit, onDelete }: TableCommentProps) {
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
                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                <span className="font-medium">{review.rating}/5</span>
              </div>
              <p className="text-gray-700 mb-4">{review.content}</p>

              {/* Chỉ hiển thị nút khi user hiện tại là chủ sở hữu bình luận */}
              {user && user.id_account === review.id_account && (
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(review.id_comment)}
                    className="text-blue-500"
                  >
                    <Edit2 className="w-4 h-4" /> Sửa
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(review.id_comment)}
                    className="text-red-500"
                  >
                    <Trash className="w-4 h-4" /> Xóa
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
