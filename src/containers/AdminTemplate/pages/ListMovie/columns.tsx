"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import {  Movie } from "@/types/movie"
import moment from "moment-timezone"
import { NavLink } from '../../components/silelinks';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface GenreMovie {
  id_genre: number;
  genre_name: string;
  created_at: Date;
  updated_at: Date;
}
export const columns: ColumnDef<Movie>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id_movie",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="ID" />
      )
    },
  },
  {
    accessorKey: "movie_name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Tên phim" />
      )
    },
  },
  {
    accessorKey: "image_main",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Ảnh banner" />
      )
    },
    cell: ({ row }) => {
      const image_main = row.getValue("image_main"); // Lấy URL của ảnh
      return (
        <div className="text-left">
          {image_main ? (
            <img
              src={`${image_main}`}
              alt="Ảnh banner"
              style={{ width: '100px', height: 'auto', borderRadius: '4px' }} // Tùy chỉnh kích thước ảnh
            />
          ) : (
            "Không có ảnh"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Thời lượng phim' />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{(row.getValue("duration"))} phút</div>
    },
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày ra mắt' />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDay(row.getValue("release_date"))}</div>
    },
  },
  {
    accessorKey: "genres",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Thể loại' />
    ),
    cell: ({ row }) => {
      const genreName = row.getValue("genres") as GenreMovie[] || [];
      return <div className="text-left font-medium">{genreName.map((n) => (
      <div key={n.id_genre} className="flex">
        <div> {n.genre_name}</div>
        </div>
))}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Danh mục" />
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") ;
      
      return <div className={`text-center px-1 py-2 rounded-lg font-medium ${status == 'active' ? "bg-green-200 text-green-800"  : ""} }`}>{status == 'active' ? "Đang Chiếu" : ""}</div>
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Quốc gia" />
      )
    },
  },
  {
    accessorKey: "cast",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Diễn viên" />
      )
    },
  },
  {
    accessorKey: "Chức năng",
    cell: ({ row }) => {

      const movie = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />

            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
            >
              <Link to={`/admin/listMovie/${movie.id_movie}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link to={``}>Xóa Chủ đề</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function formatDay (date : string ) {
  return moment.utc(date).tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY")
}