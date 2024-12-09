import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTableColumnHeader } from "../Account/data-table-column-header";
import { Comment } from "@/types/comment"; // Import Comment interface
import { formatDate } from '../GenreMovie/columns';
import UserNameCell from "./component/UserNameCell";
import MovieNameCell from "./component/MovieNameCell";

export const columns: ColumnDef<Comment>[] = [
  {
    accessorKey: "id_comment",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="ID Bình luận" />
      );
    },
  },


  {
    accessorKey: "id_movies",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="  Phim" />
    ),
    cell: ({ row }) => {
      const idMovies = row.getValue("id_movies") as string;
      return <MovieNameCell idMovie={idMovies}/>
    },

  },


  {
    accessorKey: "id_account",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tài khoản" />
    ),
    cell: ({ row }) => {
      const idAccount = row.getValue("id_account") as string;
      return <UserNameCell idAccount={idAccount} />;
    },
  },
  
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nội dung" />
    ),
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      return <div className="text-left font-medium">{content}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đánh giá" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      const stars = Array.from({ length: 5 }, (_, index) => (
        <Star 
          key={index} 
          className={`h-4 w-4  ${
            index < rating ? "text-yellow-500" : "text-gray-300"
          }`} 
          fill={index < rating ? "currentColor" : "none"} 
          stroke="currentColor" 
        />
      ));
  
      return <div className="flex justify-start">{stars}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDate(row.getValue("created_at"))}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày cập nhật" />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDate(row.getValue("updated_at"))}</div>;
    },
  },
  {
    accessorKey: "Chức năng",
    cell: ({ row }) => {
      const comment = row.original;

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
            <DropdownMenuItem><Link to={``}>Xóa Bình luận</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
