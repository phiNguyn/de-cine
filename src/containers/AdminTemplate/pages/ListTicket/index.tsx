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
import TicketFilter from "./TicketFilter"; // Đổi tên thành TicketFilter
import TicketTable from "./TicketTable"; // Đổi tên thành TicketTable
// import BookingAPI from "@/apis/booking";

export interface Ticket {
  id: string;
  tenVe: string; // Thay đổi thuộc tính theo nhu cầu
  suKien: string; // Thay đổi thuộc tính theo nhu cầu
  gia: number; 
  ngayMua: string; 
}

// Dữ liệu mẫu
const data: Ticket[] = [
  {
    id: "ve001",
    tenVe: "Vé Phim Bí Mật Đen Tối",
    suKien: "Bí Mật Đen Tối",
    gia: 100000,
    ngayMua: "2024-10-01",
  },
  {
    id: "ve002",
    tenVe: "Vé Phim Cuộc Đua Kỳ Thú",
    suKien: "Cuộc Đua Kỳ Thú",
    gia: 120000,
    ngayMua: "2024-10-02",
  },
  {
    id: "ve003",
    tenVe: "Vé Phim Bên Kia Giấc Mơ",
    suKien: "Bên Kia Giấc Mơ",
    gia: 90000,
    ngayMua: "2024-10-03",
  },
  {
    id: "ve004",
    tenVe: "Vé Phim Tình Yêu Màu Nắng",
    suKien: "Tình Yêu Màu Nắng",
    gia: 80000,
    ngayMua: "2024-10-04",
  },
  {
    id: "ve005",
    tenVe: "Vé Phim Vũ Trụ Lạc Lối",
    suKien: "Vũ Trụ Lạc Lối",
    gia: 150000,
    ngayMua: "2024-10-05",
  },
];

// Định nghĩa các cột
export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'tenVe',
    header: 'Tên Vé',
    filterFn: 'includesString', // nếu bạn muốn hỗ trợ lọc theo chuỗi
  },
  {
    accessorKey: 'suKien',
    header: 'Sự Kiện',
  },
  {
    accessorKey: 'gia',
    header: 'Giá (VND)',
  },
  {
    accessorKey: 'ngayMua',
    header: 'Ngày Mua',
  },
];

export default function ListTickets() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  // const [showBooking, setShowBooking] = React.useState([]);

//  React.useEffect(()=> { 
//   const fetchBookings = async () => { 
//     try {
//       const resp = await BookingAPI.createTicket();
//     } catch (error) {
//       console.error("Fetching bookings failed", error);
//       setShowBooking(resp)
//     }
//   }
//   fetchBookings();
//  },[])

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
        <TicketFilter
          filterValue={(table.getColumn("tenVe")?.getFilterValue() as string) ?? ""}
          onFilterChange={(value) => table.getColumn("tenVe")?.setFilterValue(value)}
          columns={table.getAllColumns()}
        />
        <TicketTable rows={table.getRowModel().rows} columns={table.getHeaderGroups()} />
      </div>
    </ThemeProvider>
  );
}
