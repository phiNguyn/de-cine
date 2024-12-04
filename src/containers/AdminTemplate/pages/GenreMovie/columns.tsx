"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { GenreMovie } from "@/types/movie"
import moment from 'moment-timezone';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import EditGenreMovie from "./editGenreMovie"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
      const movie = row.original;
  
      const [isDialogOpen, setIsDialogOpen] = useState(false);
     
      const handleOpenDialog = () => {
        setIsDialogOpen(true);
      };
      const handleCloseDialog = () => {
        setIsDialogOpen(false);
      };
      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={handleOpenDialog}>
                 Cập nhật thể loại
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thể loại phim</DialogTitle>
                  <DialogDescription>
                   Thể loại phim
                  </DialogDescription>
                </DialogHeader>
               <EditGenreMovie onClose={handleCloseDialog} selectedId={movie.id_genre}/>
              </DialogContent>
            </Dialog>
            <DropdownMenuItem>Ẩn thể loại</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </>
      );
    },
  }
  
  
]

 export function formatDate (date : string) {
  return  moment.utc(date).tz('Asia/Ho_Chi_Minh').format("DD-MM-YYYY HH:mm")
  }