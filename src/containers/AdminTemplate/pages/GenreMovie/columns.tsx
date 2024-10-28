"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { GenreMovie } from "@/types/movie"
import moment from 'moment-timezone';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<GenreMovie>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id_genre",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="ID" />
      )
    },
  },
  {
    accessorKey: "genre_name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Tên Thể Loại" />
      )
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày tạo' />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDate(row.getValue("created_at"))}</div>
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày cập nhật' />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDate(row.getValue("updated_at"))}</div>
    },
  },

  {
    accessorKey: "Chức năng",
    cell: ({ row }) => {

      const genreMovie = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
            >
              Cập nhật
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link to={`/admin/listGenreMovies/${genreMovie.id_genre}`}>Xóa Chủ đề</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

 export function formatDate (date : string) {
  return  moment.utc(date).tz('Asia/Ho_Chi_Minh').format("DD-MM-YYYY HH:mm")
  }