"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { Comment } from "@/types/comment"
import { formatDate } from "../GenreMovie/columns"

// Cấu hình bảng dữ liệu cho bình luận
export const columns: ColumnDef<Comment>[] = [
  {
    accessorKey: "id_comment",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="ID" />
      )
    },
  },
  {
    accessorKey: "user_name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Tên người dùng" />
      )
    },
  },
  {
    accessorKey: "comment_content",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Nội dung bình luận" />
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <div
          className={`text-center px-1 py-2 rounded-lg font-medium ${
            status === "approved" ? "bg-green-200 text-green-800" : "bg-yellow-800 text-yellow-300"
          }`}
        >
          {status === "approved" ? "Đã duyệt" : "Chờ duyệt"}
        </div>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDate(row.getValue("created_at"))}</div>
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày cập nhật" />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDate(row.getValue("updated_at"))}</div>
    },
  },
  {
    accessorKey: "Chức năng",
    cell: ({ row }) => {
      const comment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to={`/admin/listComment/${comment.id_comment}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/admin/listComment/delete/${comment.id_comment}`}>Xóa bình luận</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
