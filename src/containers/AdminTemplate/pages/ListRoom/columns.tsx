"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { Room } from "@/types/room"
import { formatDate } from '../GenreMovie/columns';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Room>[] = [
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
    accessorKey: "id_room",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="ID" />
      )
    },
  },
  {
    accessorKey: "room_name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Tên phòng" />
      )
    },
  },
  
  {
    accessorKey: "chair_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Số ghế' />
    ),

  },
  {
    accessorKey: "room_status",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column}  title="Trang thái phòng" />
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("room_status") ;
      
      return <div className={`text-center px-1 py-2 rounded-lg font-medium ${status == 'active' ? "bg-green-200 text-green-800"  : "bg-yellow-800 text-yellow-300"} }`}>{status == 'active' ? "Đang Chiếu" : "Bảo trì"}</div>
    },
  },
  {
    accessorKey: "room_type",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column}  title="Kiểu phòng" />
      )
    },
    cell: ({ row }) => {
      // switch ()
      const room_typeValue = row.getValue("room_type")
      return <div className={`text-left px-1 py-2 rounded-lg font-medium  }`}>Phòng   {room_typeValue =='normal' ? 'Thường' :  row.getValue("room_type")}</div>
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

