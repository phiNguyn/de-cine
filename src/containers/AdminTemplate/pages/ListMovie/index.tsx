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
} from "@tanstack/react-table";
import { ThemeProvider } from "@/components/theme-provider";
import { useMovieStore } from "@/store/Movie";
import moviesAPI from "@/apis/movie";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataTableFilter } from "./data-table-toolbar";
import MovieFilter from "./MovieFilter";
import AddMovie from "./component/addMovie";


export default function ListMovies() {
  const {movie, setMovie} = useMovieStore((state) => state)

  const { data } = useQuery({
    queryKey: ['movie'],
    queryFn: moviesAPI.getAllMovie,
    staleTime: 5 * 60 * 1000,
  });
  React.useEffect(() => {
    if (data) {
      setMovie(data)
    }
  }, [data])
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
        <div className="flex items-center justify-between">

        <DataTableFilter table={table}/> 
        <AddMovie/>
        </div>

        <div className="container mx-auto">
                <DataTable columns={columns} data={movie} />
              </div>
      </div>
    </ThemeProvider>
  );
}
