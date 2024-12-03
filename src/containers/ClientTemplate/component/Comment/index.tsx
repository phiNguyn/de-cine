import { useState } from "react"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Comment {
    id: string
    author: string
    avatar: string
    date: string
    rating: number
    content: string
    reactions: {
        calm: number
        empathy: number
        literary: number
    }   
    image?: string
}

export default function Comment() { 
    const [isCommenting, setIsCommenting] = useState(false);
    const [newComment, setNewComment] = useState("");

    const reviews: Comment[] = [
        {
            id: "1",
            author: "Mai A. T.",
            avatar: "/placeholder.svg",
            date: "21/11/2024",
            rating: 8,
            content: "Tôi là fan của phiên bản truyện, khi coi phim thì thấy phim cũng tạm ổn dù hơi lê thê. Phần đầu chưa được liền mạch với nhau làm đó phim phải xâu chuỗi khá nhiều sự kiện diễn ra đúng như mạch truyện...",
            reactions: {
                calm: 12,
                empathy: 8,
                literary: 15
            },
            image: "/placeholder.svg?height=150&width=200"
        }
    ];

    const handleCommentSubmit = () => {
        // Xử lý khi gửi bình luận
        alert(`Bình luận mới: ${newComment}`);
        setNewComment("");
        setIsCommenting(false);
    };

    return (
        <div className="max-w-2xl mx-10 p-10">
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
