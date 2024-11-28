/* eslint-disable @typescript-eslint/no-explicit-any */
// PromotionFilter.tsx
import { Input } from "@/components/ui/input";

type PromotionFilterProps = {
  filterValue: string;
  onFilterChange: (value: string) => void;
  columns: any[]; // Thay đổi kiểu dữ liệu này nếu cần
};

const PromotionFilter: React.FC<PromotionFilterProps> = ({ filterValue, onFilterChange }) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Lọc theo tên khuyến mãi..."
        value={filterValue}
        onChange={(event) => onFilterChange(event.target.value)}
        className="max-w-sm"
      />
      {/* Có thể thêm các bộ lọc khác ở đây */}
    </div>
  );
};

export default PromotionFilter;
