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
import { FaPercent, FaDollarSign } from "react-icons/fa"; // Import icons
import PromotionFilter from "./PromotionFilter"; // Đổi tên thành PromotionFilter
import PromotionTable from "./PromotionTable"; // Đổi tên thành PromotionTable

export interface Promotion {
  id: string;
  promotionName: string; // Tên chương trình khuyến mãi
  description: string; // Mô tả chương trình khuyến mãi
  discountType: string; // Loại giảm giá
  discountValue: number; // Giá trị giảm giá
  startDate: string; // Ngày bắt đầu
  endDate: string; // Ngày kết thúc
}

// Dữ liệu mẫu
const data: Promotion[] = [
  {
    id: "promo001",
    promotionName: "Khuyến Mãi Mừng Giáng Sinh 2024",
    description: "Giảm giá lên tới 50% cho tất cả sản phẩm",
    discountType: "percent",
    discountValue: 50,
    startDate: "2024-12-01",
    endDate: "2024-12-25",
  },
  {
    id: "promo002",
    promotionName: "Khuyến Mãi Mùa Hè 2024",
    description: "Giảm giá 100.000 VND cho hóa đơn trên 500.000 VND",
    discountType: "fixed",
    discountValue: 100000,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
  },
  {
    id: "promo003",
    promotionName: "Khuyến Mãi Sinh Nhật Tháng 10",
    description: "Giảm 30% cho tất cả sản phẩm trong tháng 10",
    discountType: "percent",
    discountValue: 30,
    startDate: "2024-10-01",
    endDate: "2024-10-31",
  },
  {
    id: "promo004",
    promotionName: "Giảm Giá Cho Người Mới",
    description: "Giảm giá 200.000 VND cho lần mua đầu tiên",
    discountType: "fixed",
    discountValue: 200000,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
  },
  {
    id: "promo005",
    promotionName: "Khuyến Mãi Giáng Sinh 2024",
    description: "Giảm giá 15% cho đơn hàng từ 1.000.000 VND",
    discountType: "percent",
    discountValue: 15,
    startDate: "2024-12-01",
    endDate: "2024-12-31",
  },
];

// Định nghĩa các cột
export const columns: ColumnDef<Promotion>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'promotionName',
    header: 'Tên Khuyến Mãi',
    filterFn: 'includesString', // nếu bạn muốn hỗ trợ lọc theo chuỗi
  },
  {
    accessorKey: 'description',
    header: 'Mô Tả',
  },
  {
    accessorKey: 'discountType',
    header: 'Loại Giảm Giá',
    // Cập nhật cách hiển thị của cột discountType với icon
    cell: ({ getValue }) => {
      const discountType = getValue() as string;
      return discountType === 'percent' ? <FaPercent /> : <FaDollarSign />;
    }
  },
  {
    accessorKey: 'discountValue',
    header: 'Giá Trị Giảm Giá (VND)',
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày Bắt Đầu',
  },
  {
    accessorKey: 'endDate',
    header: 'Ngày Kết Thúc',
  },
];

export default function ListPromotions() {
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
        <PromotionFilter
          filterValue={(table.getColumn("promotionName")?.getFilterValue() as string) ?? ""}
          onFilterChange={(value) => table.getColumn("promotionName")?.setFilterValue(value)}
          columns={table.getAllColumns()}
        />
        <PromotionTable rows={table.getRowModel().rows} columns={table.getHeaderGroups()} />
      </div>
    </ThemeProvider>
  );
}
