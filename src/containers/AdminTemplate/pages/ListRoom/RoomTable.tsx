/* eslint-disable @typescript-eslint/no-explicit-any */
// RoomTable.tsx
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
  } from "@/components/ui/table"; // Giả sử bạn có các component table trong thư mục này
import { flexRender } from "@tanstack/react-table";
import { ComponentType, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import RoomActions from "./RoomAction";

type RoomTableProps = {
  rows: any[]; // Thay đổi kiểu dữ liệu này thành kiểu chính xác nếu cần
  columns: any[];
};

const RoomTable: React.FC<RoomTableProps> = ({ rows, columns }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {columns.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: { id: Key | null | undefined; isPlaceholder: any; column: { columnDef: { header: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ComponentType<any> | null | undefined; }; }; getContext: () => any; }) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: { id: Key | null | undefined; column: { columnDef: { cell: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ComponentType<any> | null | undefined; }; }; getContext: () => any; }) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {/* Thêm RoomActions vào mỗi hàng */}
                <TableCell>
                  <RoomActions room={row.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                Không tìm thấy phòng nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoomTable;
