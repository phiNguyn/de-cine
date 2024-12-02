import "./Booking.css";
import BookingInformation from "./BookingInformation";
const Booking = () => {
  return (
    <>
    <div className="line-default"></div>
    <div className="booking-wrapper border-gray-600 pb-10">
        <BookingInformation/>
    </div>
    </>
  )
}

export default Booking