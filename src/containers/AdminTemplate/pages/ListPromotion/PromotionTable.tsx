/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
  } from "@/components/ui/table"; 
  import { flexRender } from "@tanstack/react-table";
  import PromotionAction from './PromotionAction'; // Đổi tên component hành động thành PromotionAction
  import { ComponentType, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
  
  type PromotionTableProps = {
    rows: any[];  // Dữ liệu về khuyến mãi
    columns: any[];  // Các cột cho khuyến mãi
  };
  
  const PromotionTable: React.FC<PromotionTableProps> = ({ rows, columns }) => {
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
                  {/* Sử dụng component PromotionAction cho hành động */}
                  <TableCell>
                    <PromotionAction promotion={row.id} />  {/* Đổi từ TicketAction thành PromotionAction */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  Không tìm thấy khuyến mãi nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default PromotionTable;
  