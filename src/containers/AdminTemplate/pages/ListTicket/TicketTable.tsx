/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
  } from "@/components/ui/table"; 
  import { flexRender } from "@tanstack/react-table";
  import TicketAction from './TicketAction'; 
import { ComponentType, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
  
  type TicketTableProps = {
    rows: any[];
    columns: any[];
  };
  
  const TicketTable: React.FC<TicketTableProps> = ({ rows, columns }) => {
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
                  {/* Sử dụng component TicketAction cho hành động */}
                  <TableCell>
                    <TicketAction ticket={row.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  Không tìm thấy vé nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default TicketTable;
  