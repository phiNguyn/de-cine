"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { Promotion } from "@/types/promotion"
import { formatDate } from "../GenreMovie/columns"
import { DataTableRowActions } from "./PromotionAction"

export const columns: ColumnDef<Promotion>[] = [
    {
        accessorKey: "id_promotion",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="ID" />
            )
        },
    },
    {
        accessorKey: "promotion_name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Tên khuyến mãi" />
            )
        },
    },
    {
        accessorKey: "discount_value",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Phần trăm giảm giá (%)" />
            )
        },
    },
    {
        accessorKey: "start_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày bắt đầu" />
        ),
        cell: ({ row }) => {
            return <div className="text-left font-medium">{formatDate(row.getValue("start_date"))}</div>
        },
    },
    {
        accessorKey: "end_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày kết thúc" />
        ),
        cell: ({ row }) => {
            return <div className="text-left font-medium">{formatDate(row.getValue("end_date"))}</div>
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
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
