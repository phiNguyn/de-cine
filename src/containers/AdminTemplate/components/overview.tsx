"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import RevenueAPI from "@/apis/revenue"
import { DailyRevenue, MonthlyDetails } from "@/types/revenue"

const chartConfig = {
  total_revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
}
export function Overview() {
  const [revenue, setRevenue] = useState<MonthlyDetails | null>(null)
  const { data } = useQuery({
    queryKey: ['revenueDefault'],
    queryFn: () => RevenueAPI.getRevenueByMonth(2024, 12),
    staleTime: 5 * 60 * 1000
  })
  useEffect(() => {
    if (data) {
      setRevenue(data)
    }
  }, [data, setRevenue])

  if (revenue?.revenue_by_day) {
    const chartData = Object.values(revenue.revenue_by_day).map((entry: DailyRevenue) => ({
      day: entry.day,
      total_revenue: entry.total_revenue,
      total_bookings: entry.total_bookings,
    }));
    return (
      <Card>
        <CardHeader>
          <CardTitle>Doanh thu theo tháng - Năm </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent >
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} margin={{ top: 20 }}  >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="total_revenue"
                fill="var(--color-total_revenue)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>

      </Card>
    )
  }

}
