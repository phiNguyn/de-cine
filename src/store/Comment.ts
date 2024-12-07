import { GetCommentFilter } from "@/apis/comment";
import { Comment } from "@/types/comment"; // Điều chỉnh đường dẫn import
import { create } from "zustand";

interface CommentStore {
  comments: Comment[]; // Đổi 'Room' thành 'comments'
  setComments: (comments: Comment[]) => void; // Đổi 'setRoom' thành 'setComments'
  addComment: (newComment: Comment) => void; // Đổi 'addRoom' thành 'addComment'
  updateComment: (updatedComment: Comment) => void; // Đổi 'updateRoom' thành 'updateComment'
  getCommentById: (id: number) => Comment | undefined; // Đổi 'getRoomById' thành 'getCommentById'
  commentDetail: Comment | null; // Đổi 'RooDetail' thành 'commentDetail'
  setCommentDetail: (comment: Comment) => void; // Đổi 'setRooDetail' thành 'setCommentDetail'
  filters?: GetCommentFilter;
  setFilters: (filters: GetCommentFilter) => void;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [], // Khởi tạo mảng 'comments' thay vì 'Room'
  setComments: (comments) => set({ comments }), // Cập nhật state 'comments'
  addComment: (newComment) =>
    set((state) => ({
      comments: [...state.comments, newComment], // Thêm 'newComment' vào mảng 'comments'
    })),
  updateComment: (updatedComment) =>
    set((state) => ({
      comments: state.comments.map(
        (u) => (u.id_comment === updatedComment.id_comment ? updatedComment : u) // Cập nhật bình luận
      ),
    })),
  getCommentById: (id) => {
    return get().comments.find((u) => u.id_comment === id); // Tìm bình luận theo ID
  },
  commentDetail: null, // Khởi tạo giá trị mặc định là null
  setCommentDetail: (comment) => set({ commentDetail: comment }), // Cập nhật 'commentDetail'
  filters: undefined,
  setFilters: (filters) => set({ filters }),
}));
