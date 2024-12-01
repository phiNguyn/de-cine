"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import {  MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { User } from "@/types/user"
import { Link } from "react-router-dom"
import { formatDate } from "../GenreMovie/columns"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
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
        accessorKey: "id_account",
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
            <DataTableColumnHeader column={column} title="Tài Khoản" />
          )
        },
      },
      {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Tên" />
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title="Email" />
        )
      },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Số Điện Thoại" />
      )
    },
  },
  {
    accessorKey: "loyalty_points",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Điểm thưởng" />
      )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Thành viên' />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role")
      return <div className={`text-center font-bold p-2 rounded-lg  ${role == 'admin' ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"}`}>{row.getValue("role")}</div>
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày cập nhật' />
    ),
    cell: ({ row }) => {
      return <div className="text-right font-medium">{formatDate(row.getValue("updated_at"))}</div>
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày cập nhật' />
    ),
    cell: ({ row }) => {
      return <div className="text-right font-medium">{formatDate(row.getValue("updated_at"))}</div>
    },
  },
  {
    accessorKey: "Chức năng",
    cell: ({ row }) => {
      
      const user = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(user.id_account ))}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem><Link to={`/admin/users/${user.id_account}`}>Xem chi tiết khách hàng</Link></DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
