"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { Promotion } from "@/types/promotion"
import { formatDate } from "../GenreMovie/columns"
import { DataTableRowActions } from "./PromotionAction"
import { API_URL } from "@/constants/api"

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
           accessorKey: "promotion_image",
           header: ({ column }) => {
               return (
                   <DataTableColumnHeader column={column} title="Ảnh" />
               )
           },
           cell: ({ row }) => {
               const promotion_image = row.getValue("promotion_image"); // Lấy URL của ảnh
               return (
                   <div className="text-left">
                       {promotion_image ? (
                           <img
                               loading="lazy"
                               src={`${API_URL.baseUrl}/${promotion_image}`}
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
