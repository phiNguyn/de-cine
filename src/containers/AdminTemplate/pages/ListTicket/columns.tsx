"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { Booking } from "@/types/Booking"
import { DataTableRowActions } from "./TicketAction"

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
                <DataTableColumnHeader column={column} title="Mã vé" />
            )
        },
    },
    {
        accessorKey: "movie_name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Tên Phim" />
            )
        },

    },
    {
        accessorKey: "booking_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Ngày đặt' />
        ),
        cell: ({ row }) => {

            return <div className="text-left font-medium">{row.getValue('booking_date')}</div>

        },
    },
    {
        accessorKey: "payment_status",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Trạng thái thanh toán" />
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("payment_status");

            return <div className={`text-center px-1 py-2 rounded-lg font-medium 
        ${status === 'success' ? "bg-green-200 text-green-800"
                    : status === 'pending' ? "text-yellow-700 bg-yellow-200" : "text-red-700 bg-red-200"} }`}>
                {status === 'success' ? "Thành công" : status === 'pending' ? "Đang giao dịch" : "Đã hủy"}</div>
        },
    },
    {
        accessorKey: "total_amount",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Tổng hóa đơn" />
            )
        },
        cell: ({ row }) => {
            // switch ()
            const total_amount = row.getValue("total_amount") as number
            return <div className={`text-left px-1 py-2 rounded-lg font-medium  }`}>{total_amount.toLocaleString()}</div>
        },
    },

    {
        accessorKey: "Chức năng",
        cell: ({ row }) => {


            return (
                <DataTableRowActions row={row} />
            )
        },
    },
]

