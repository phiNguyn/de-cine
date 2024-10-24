/* eslint-disable @typescript-eslint/no-explicit-any */
// RoomFilter.tsx
import { Input } from "@/components/ui/input";

type RoomFilterProps = {
  filterValue: string;
  onFilterChange: (value: string) => void;
  columns: any[]; // Thay đổi kiểu dữ liệu này nếu cần
};

const RoomFilter: React.FC<RoomFilterProps> = ({ filterValue, onFilterChange }) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Lọc theo tên phòng..."
        value={filterValue}
        onChange={(event) => onFilterChange(event.target.value)}
        className="max-w-sm"
      />
      {/* Có thể thêm các bộ lọc khác ở đây */}
    </div>
  );
};

export default RoomFilter;
