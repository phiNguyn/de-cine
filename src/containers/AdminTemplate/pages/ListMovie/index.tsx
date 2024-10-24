/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import {
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnFiltersState,
  ColumnDef,
} from "@tanstack/react-table";
import { ThemeProvider } from "@/components/theme-provider";
import MovieFilter from "./MovieFilter";
import MovieTable from "./MovieTable";

export interface Ticket {
  id: string;
  tenPhim: string;
  theLoai: string;
  thoiLuong: number; 
  ngaySanXuat: string; 
}

// Dữ liệu của bạn
const data: Ticket[] = [
  {
    id: "phim001",
    tenPhim: "Bí Mật Đen Tối",
    theLoai: "Kinh Dị",
    thoiLuong: 120,
    ngaySanXuat: "2022-10-01",
  },
  {
    id: "phim002",
    tenPhim: "Cuộc Đua Kỳ Thú",
    theLoai: "Hành Động",
    thoiLuong: 135,
    ngaySanXuat: "2021-05-12",
  },
  {
    id: "phim003",
    tenPhim: "Bên Kia Giấc Mơ",
    theLoai: "Khoa Học Viễn Tưởng",
    thoiLuong: 110,
    ngaySanXuat: "2023-02-20",
  },
  {
    id: "phim004",
    tenPhim: "Tình Yêu Màu Nắng",
    theLoai: "Tình Cảm",
    thoiLuong: 95,
    ngaySanXuat: "2020-07-15",
  },
  {
    id: "phim005",
    tenPhim: "Vũ Trụ Lạc Lối",
    theLoai: "Phiêu Lưu",
    thoiLuong: 140,
    ngaySanXuat: "2019-12-03",
  },
];

// Định nghĩa các cột
export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'tenPhim',
    header: 'Tên Phim',
    filterFn: 'includesString', // nếu bạn muốn hỗ trợ lọc theo chuỗi
  },
  {
    accessorKey: 'theLoai',
    header: 'Thể Loại',
  },
  {
    accessorKey: 'thoiLuong',
    header: 'Thời Lượng (phút)',
  },
  {
    accessorKey: 'ngaySanXuat',
    header: 'Ngày Sản Xuất',
  },
];

export default function ListMovies() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full p-8">
        <MovieFilter
          filterValue={(table.getColumn("tenPhim")?.getFilterValue() as string) ?? ""}
          onFilterChange={(value) => table.getColumn("tenPhim")?.setFilterValue(value)}
          columns={table.getAllColumns()}
        />
        <MovieTable rows={table.getRowModel().rows} columns={table.getHeaderGroups()} />
      </div>
    </ThemeProvider>
  );
}
