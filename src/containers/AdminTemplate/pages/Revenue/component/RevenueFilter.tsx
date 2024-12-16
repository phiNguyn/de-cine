import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Đường dẫn đến UI library
import { useQuery } from '@tanstack/react-query';
import moviesAPI from '@/apis/movie';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types/movie';

interface FilterProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onApplyFilters?: (filters: any) => void; // Callback khi nhấn nút "Lọc"
    onResetFilters?: () => void; // Callback khi nhấn nút "Reset"
}

export const FilterComponent: React.FC<FilterProps> = ({ onApplyFilters, onResetFilters }) => {
    const [movie, setMovie] = useState<Movie[]>([]);
    const [filters, setFilters] = useState({
        id_movie: undefined,
        month: undefined,
        year: undefined,
    });
    // Fetch danh sách phim
    const { data: dataMovie } = useQuery({
        queryKey: ['RevenueMovies'],
        queryFn: moviesAPI.getAllMovie,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (dataMovie) {
            setMovie(dataMovie);
        }
    }, [dataMovie]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSetFilters = (key: string, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleApplyFilters = () => {
        if (onApplyFilters) {
            onApplyFilters(filters);
        }
    };

    const handleResetFilters = () => {
        setFilters({
            id_movie: undefined,
            month: undefined,
            year: undefined,
        });
        if (onResetFilters) {
            onResetFilters(); // Callback khi reset bộ lọc
        }
    };

    const years = Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - index);
    const months = Array.from({ length: 12 }, (_, index) => index + 1);

    return (
        <div className="w-full flex flex-col md:flex-row items-center space-x-6 space-y-4 md:space-y-0">
            {/* Dropdown chọn phim */}
            <Select
                onValueChange={(value) => handleSetFilters('id_movie', value)}
                value={filters.id_movie || ''}
            >
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Chọn phim" />
                </SelectTrigger>
                <SelectContent>
                    {movie.map((movie) => (
                        <SelectItem key={movie.id_movie} value={String(movie.id_movie)}>
                            {movie.movie_name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Dropdown chọn tháng */}
            <Select
                onValueChange={(value) => handleSetFilters('month', value)}
                value={filters.month || ''}
            >
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Chọn tháng" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                            {`Tháng ${month}`}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Dropdown chọn năm */}
            <Select
                onValueChange={(value) => handleSetFilters('year', value)}
                value={filters.year || ''}
            >
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Chọn năm" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex space-x-2">
                {/* Nút áp dụng */}
                <Button onClick={handleApplyFilters}>Lọc</Button>

                {/* Nút reset */}
                <Button variant="outline" onClick={handleResetFilters}>Bỏ lọc</Button>
            </div>
        </div>
    );
};
