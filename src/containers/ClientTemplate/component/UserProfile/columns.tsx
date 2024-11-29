"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment-timezone"
import { DataTableColumnHeader } from "@/containers/AdminTemplate/pages/Account/data-table-column-header"
import { Booking, TicketBooking } from "@/types/Booking"

export const columns: ColumnDef<Booking>[] = [
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
        accessorKey: "booking_code",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Mã đơn hàng" />
            )
        },
    },
    {
        accessorKey: "ticket",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Tên Phim" />
            )
        },
        cell: ({ row }) => {
            const movie = row.getValue('ticket') as TicketBooking
            return <div className="text-left font-medium">{movie.showtime.movie.movie_name}</div>
        },
    },
    {
        accessorKey: "booking_date",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Ngày mua vé" />
            )
        },
    },
    {
        accessorKey: "ticket",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Ghế đặt" />
            )
        },

        cell: ({ row }) => {
            const chairs = row.getValue("ticket") as TicketBooking; // Lấy URL của ảnh
            return <div className="flex gap-x-2"> {chairs.chairs.map(item => (
                <Button key={item.id_chair} variant={"primary"} size={"icon"}>{item.chair_name}</Button>
            ))} </div>
        },
    },
    {
        accessorKey: "total_amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Tổng tiền' />
        ),

    },
    {
        accessorKey: "account_promotion_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Giảm giá' />
        ),
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue('account_promotion_id') != null ? row.getValue('account_promotion_id') : 0}</div>
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
            const status = row.getValue("status");

            return <div className={`text-center px-1 py-2 rounded-lg font-medium 
        ${status === 'success' ? "bg-green-200 text-green-800"
                    : status === 'pendding' ? "text-yellow-700 bg-yellow-200" : "text-red-700 bg-red-200"} }`}>
                {status === 'success' ? "Thành công" : status === 'pendding' ? "Đang giao dịch" : "Đã hủy"}</div>
        },
    },


    // {
    //     accessorKey: "Chức năng",
    //     cell: ({ row }) => {

    //         const movie = row.original

    //         return (

    //         )
    //     },
    // },
]

export function formatDay(date: string) {
    return moment.utc(date).tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY")
}