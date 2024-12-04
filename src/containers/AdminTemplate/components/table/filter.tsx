import { Table } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'


interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  value : string,
  name : string
}

export function DataTableFilter<TData>({
  table,
  value,
  name
}: DataTableToolbarProps<TData>) {

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={`Tìm theo ${name}`}
          value={(table.getColumn(value)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(value)?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]  placeholder:font-bold'
        />
      </div>
    </div>
  )
}
