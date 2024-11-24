"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../Account/data-table-column-header"
import { Product } from "@/types/product"
import { DataTableRowActions } from "./ProductRowAction"
import { API_URL } from "@/constants/api"
import { formatDate } from "../GenreMovie/columns"

export const columns: ColumnDef<Product>[] = [
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
        accessorKey: "id_product",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="ID" />
            )
        },
    },

    {
        accessorKey: "product_name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Tên sản phẩm" />
            )
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Giá" />
            )
        },

    },
    {
        accessorKey: "image_product",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Ảnh" />
            )
        },
        cell: ({ row }) => {
            const image_product = row.getValue("image_product"); // Lấy URL của ảnh
            return (
                <div className="text-left">
                    {image_product ? (
                        <img
                            loading="lazy"
                            src={`${API_URL.baseUrl}/${image_product}`}
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
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Mô tả' />
        )
    },
    {
        accessorKey: "is_active",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Hiển thị sản phẩm' />
        ),
        cell: ({ row }) => {
            const status = row.getValue("is_active");

            return <div className={`text-center px-1 py-2 rounded-lg font-medium ${status == true ? "bg-green-200 text-green-800" : "bg-yellow-800 text-yellow-300"} }`}>{status == true ? "Có" : "Ẩn"}</div>
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
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]
