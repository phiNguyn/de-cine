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
import RoomFilter from "./RoomFilter"; // Đổi thành RoomFilter
import RoomTable from "./RoomTable";   // Đổi thành RoomTable

export interface Room {
    id: string;
    tenPhong: string;
    loaiPhong: string;
    soChoNgoi: number;
    ngayTao: string;
  }
  
  // Dữ liệu phòng
  const data: Room[] = [
    {
      id: "phong001",
      tenPhong: "Phòng 1",
      loaiPhong: "2D",
      soChoNgoi: 10,
      ngayTao: "2023-01-15",
    },
    {
      id: "phong002",
      tenPhong: "Phòng 2",
      loaiPhong: "3D",
      soChoNgoi: 30,
      ngayTao: "2023-02-20",
    },
    {
      id: "phong003",
      tenPhong: "Phòng 3",
      loaiPhong: "2D",
      soChoNgoi: 5,
      ngayTao: "2023-03-10",
    },
    {
      id: "phong004",
      tenPhong: "Phòng 4",
      loaiPhong: "4D",
      soChoNgoi: 15,
      ngayTao: "2023-04-25",
    },
    {
      id: "phong005",
      tenPhong: "Phòng 5",
      loaiPhong: "3D",
      soChoNgoi: 8,
      ngayTao: "2023-05-30",
    },
  ];

  export const columns: ColumnDef<Room>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'tenPhong',
      header: 'Tên Phòng',
      filterFn: 'includesString', // hỗ trợ lọc theo chuỗi
    },
    {
      accessorKey: 'loaiPhong',
      header: 'Loại Phòng',
    },
    {
      accessorKey: 'soChoNgoi',
      header: 'Số Chỗ Ngồi',
    },
    {
      accessorKey: 'ngayTao',
      header: 'Ngày Tạo',
    },
  ];
  
  
export default function ListRooms() {
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
        <RoomFilter
                  filterValue={(table.getColumn("tenPhong")?.getFilterValue() as string) ?? ""}
                  onFilterChange={(value) => table.getColumn("tenPhong")?.setFilterValue(value)} columns={[]}        />
        <RoomTable rows={table.getRowModel().rows} columns={table.getHeaderGroups()} />
      </div>
    </ThemeProvider>
  );
}
