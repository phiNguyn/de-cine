import BookingAPI from '@/apis/booking';
import { DataTable } from '@/containers/AdminTemplate/components/table/data-table'
import { useBooking } from '@/store/Booking';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { columns } from './columns';
import Loader from '@/components/loader';

const UserInfoBooking = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const id = userData.id_account
    const { Booking, setBooking } = useBooking((state) => state)
    const { data, isLoading } = useQuery({
        queryKey: ["BookingAccount", id],
        queryFn: () => BookingAPI.getBookingsByAccountId(id),
        staleTime: 60 * 1000,

    })
    useEffect(() => {
        if (data) {
            setBooking(data)
        }
    }, [data, setBooking])

    if (isLoading) return <Loader />
    return (
        <div className=" w-full col-span-1 xl:col-span-3">
            <DataTable name="Mã đơn hàng" value="booking_code" columns={columns} data={Booking} />
        </div>

    )
}

export default UserInfoBooking