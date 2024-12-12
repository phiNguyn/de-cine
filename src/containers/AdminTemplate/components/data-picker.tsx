"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import dayjs from "dayjs"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
interface DatePickerProp {
  className?: React.ReactNode,
  onApply?: (dateRange: DateRange | undefined) => void;
}
export function DatePickerWithRange({
  className,
  onApply,
}: DatePickerProp) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dayjs().startOf('day').toDate(),
    to: dayjs().endOf('day').toDate(),
  })

  const handleSelectChangeMonth = (value: string) => {
    let from, to;
    switch (value) {
      case 'this-month':
        from = dayjs().startOf('month');
        to = dayjs().endOf('day');
        break;
      case 'last-month':
        from = dayjs().subtract(1, 'month').startOf('month');
        to = dayjs().subtract(1, 'month').endOf('month');
        break;
      case 'last-30-days':
        from = dayjs().subtract(29, 'day').startOf('day');
        to = dayjs().endOf('day');
        break;
      default:
        from = dayjs().startOf('month');
        to = dayjs().endOf('day');
    }
    setDate({ from: from.toDate(), to: to.toDate() });
  }

  const handleSelectChangeWeek = (value: string) => {
    let from, to
    switch (value) {
      case 'this-week':
        from = dayjs().startOf('week');
        to = dayjs().endOf('day');
        break;
      case 'last-week':
        from = dayjs().subtract(1, 'week').startOf('week');
        to = dayjs().subtract(1, 'week').endOf('week');
        break;
      case 'last-7days':
        from = dayjs().subtract(7, 'day').startOf('day');
        to = dayjs().endOf('day');
        break;
      default:
        from = dayjs().startOf('month');
        to = dayjs().endOf('day');
    }

    setDate({ from: from.toDate(), to: to.toDate() });


  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("DD-MM-YYYY")} -{" "}
                  {dayjs(date.to).format("DD-MM-YYYY")}
                </>
              ) : (

                dayjs(date.from).format("DD/MM/YYYY")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex justify-between gap-x-2">

            <Select
              onValueChange={(value: string) =>
                setDate({
                  from: dayjs().subtract(parseInt(value), 'day').startOf('day').toDate(),
                  to: dayjs().endOf('day').toDate()
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Theo ngày" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="0">Hôm nay</SelectItem>
                  <SelectItem value="1">Hôm qua</SelectItem>

                </SelectGroup>
              </SelectContent>

            </Select>
            <Select
              onValueChange={handleSelectChangeWeek}
            >
              <SelectTrigger>
                <SelectValue placeholder="Theo tuần" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="this-week">Tuần này</SelectItem>
                  <SelectItem value="last-week">Tuần trước</SelectItem>
                  <SelectItem value="last-7days">7 ngày qua</SelectItem>
                </SelectGroup>
              </SelectContent>

            </Select>
            <Select
              onValueChange={handleSelectChangeMonth}
            >
              <SelectTrigger>
                <SelectValue placeholder="Theo tháng" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="this-month">Tháng này</SelectItem>
                  <SelectItem value="last-month">Tháng trước</SelectItem>
                  <SelectItem value="last-30-days">30 ngày qua</SelectItem>
                </SelectGroup>
              </SelectContent>

            </Select>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={() => onApply && onApply(date)}>Áp Dụng</Button>
    </div>
  )
}
