"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { formatDate } from '../GenreMovie/columns';
import { ShowTimes } from "@/types/showtime"
import { Movie } from "@/types/movie"
import { Room } from "@/types/room"
import { formatDay } from "../ListMovie/columns"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ShowTimes>[] = [
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
    accessorKey: "id_showtime",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="ID" />
      )
    },
  },
  {
    accessorKey: "date_time",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Ngày chiếu" />
      )
    },
    cell: ({ row }) => {

      return <div className={`text-left px-1 py-2 rounded-lg font-medium  }`}>{formatDay(row.getValue('date_time'))}</div>
    },
  },
  {
    accessorKey: "movie",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Tên phim" />
      )
    },
    cell: ({ row }) => {
      const movie = row.getValue("movie") as Movie;

      return <div className={`text-left px-1 py-2 rounded-lg font-medium  }`}>{movie.movie_name}</div>
    },
  },

  {
    accessorKey: "room",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tên phòng' />
    ),
    cell: ({ row }) => {
      const room = row.getValue("room") as Room;

      return <div className={`text-left px-1 py-2 rounded-lg font-medium  }`}>{room.room_name}</div>
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày tạo phòng' />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDate(row.getValue("created_at"))}</div>
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày tạo phòng' />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{formatDate(row.getValue("updated_at"))}</div>
    },
  },

  {
    accessorKey: "Chức năng",
    cell: ({ row }) => {

      const room = row.original

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
              <Link to={`/admin/listRoom/${room.id_room}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link to={``}>Xóa Chủ đề</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

