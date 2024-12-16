export interface RevenueDetail {
  total_revenue: number; // Hoặc string nếu dữ liệu của bạn không đồng nhất
  total_bookings: number;
}

interface MonthlyRevenue {
  month: number;
  total_revenue: number; // Hoặc string nếu dữ liệu không đồng nhất
  total_bookings: number;
}

interface RevenueByMonth {
  [key: string]: MonthlyRevenue; // Tháng được lưu trữ dưới dạng chuỗi "1", "2", ...
}

export interface DailyRevenue {
  day: number;
  total_revenue: number; // Hoặc string nếu dữ liệu không đồng nhất
  total_bookings: number;
}

export interface RevenueByDay {
  [key: string]: DailyRevenue; // Ngày được lưu trữ dưới dạng chuỗi "1", "2", ...
}

export interface YearlyRevenue {
  year: string;
  revenue_by_month: RevenueByMonth;
}

export interface MonthlyDetails {
  month: string;
  revenue_by_day: RevenueByDay;
}
