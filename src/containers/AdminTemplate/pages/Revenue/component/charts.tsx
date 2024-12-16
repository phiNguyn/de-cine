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
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
// Cấu hình biểu đồ
interface YearlyData {
    month: number;
    total_revenue: number;
    total_bookings: number;
}

interface MonthlyData {
    day: number;
    total_revenue: number;
    total_bookings: number;
}

const chartConfig = {
    total_revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;
export interface ChartComponentProps {
    year?: string; // Năm được chọn
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;    // Dữ liệu có thể là theo tháng hoặc theo ngày
    isYearly: boolean; // Kiểm tra xem có phải là dữ liệu theo năm hay không
}
export const ChartComponent: React.FC<ChartComponentProps> = ({ year, data, isYearly }) => {
    if (isYearly && data?.revenue_by_month) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chartData: YearlyData[] = Object.values(data.revenue_by_month).map((entry: any) => ({
            month: entry.month,
            total_revenue: entry.total_revenue,
            total_bookings: entry.total_bookings,
        }));
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Doanh thu năm {year}</CardTitle>
                    <CardDescription>{year}</CardDescription>
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
        );
    }

    if (!isYearly && data.revenue_by_day) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chartData: MonthlyData[] = Object.values(data.revenue_by_day).map((entry: any) => ({
            day: entry.day,
            total_revenue: entry.total_revenue,
            total_bookings: entry.total_bookings,
        }));

        return (
            <Card>
                <CardHeader>
                    <CardTitle>Doanh thu Tháng {data.month} - {year}</CardTitle>
                    <CardDescription>{year}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            data={chartData} // Sử dụng chartData đã map
                            margin={{ top: 20 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="day" // Sử dụng "day" cho dữ liệu theo ngày
                                tickLine={false}
                                tickMargin={10}
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
        );
    }

};

export default ChartComponent
