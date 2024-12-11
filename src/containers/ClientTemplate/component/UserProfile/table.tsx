import BookingAPI from '@/apis/booking';
import { DataTable } from '@/containers/AdminTemplate/components/table/data-table'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import Loader from '@/components/loader';
import { Booking } from '@/types/Booking';
import { StorageKeys } from '@/constants/StorageKeys';

const UserInfoBooking = () => {
    const userData = JSON.parse(localStorage.getItem(StorageKeys.USERDATA) || '{}');
    const id = userData.id_account
    const [Bookings, setBookings] = useState<Booking[] | []>([])
    const { data, isLoading } = useQuery({
        queryKey: ["BookingAccount", id],
        queryFn: () => BookingAPI.getBookingsByAccountId(id),
        staleTime: 60 * 1000,

    })
    useEffect(() => {
        if (data) {
            setBookings(data)
        }
    }, [data, setBookings])

    if (isLoading) return <Loader />
    return (
        <div className=" w-full col-span-1 xl:col-span-3">
            <DataTable name="Mã đơn hàng" value="booking_code" columns={columns} data={Bookings || []} />
        </div>

    )
}

export default UserInfoBooking