import React, { useState, useEffect } from "react";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import DateSlider from "../common/DateSlider";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);
  const navigate = useNavigate();

  // ✅ Utility: safely convert a date string or number to a Date object
  const parseDate = (dateValue) => {
    if (!dateValue) return null;

    let str = String(dateValue);
    if (str.length === 8) {
      str = `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
    } else if (str.length === 7) {
      str = `${str.slice(0, 4)}-0${str.slice(4, 5)}-${str.slice(5)}`;
    }

    try {
      return parseISO(str);
    } catch {
      return null;
    }
  };

  // ✅ Correct overlapping filter
  const filterBookings = (startDate, endDate) => {
    if (!startDate || !endDate) {
      setFilteredBookings(bookingInfo);
      return;
    }

    const filtered = bookingInfo.filter((booking) => {
      const bookingStart = parseDate(booking.checkInDate);
      const bookingEnd = parseDate(booking.checkOutDate);

      return (
        bookingStart &&
        bookingEnd &&
        bookingStart <= endDate &&
        bookingEnd >= startDate
      );
    });

    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  const handleCancelClick = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
      await handleBookingCancellation(bookingId);
    }
  };

  return (
    <div className="container-fluid px-0">
      {/* Date Slider */}
      <div className="mb-4">
        <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
      </div>

      {/* Bookings Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped rounded-3 overflow-hidden">
          <thead className="table-dark">
            <tr>
              <th className="text-center">S/N</th>
              <th className="text-center">Booking ID</th>
              <th className="text-center">Room Type</th>
              <th className="text-center">Check-In Date</th>
              <th className="text-center">Check-Out Date</th>
              <th className="text-center">Guest Name</th>
              <th className="text-center">Guest Email</th>
              <th className="text-center">Total Guests</th>
              <th className="text-center">Confirmation Code</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td className="text-center align-middle">{index + 1}</td>
                  <td className="text-center align-middle fw-bold text-primary">#{booking.id}</td>
                  <td className="text-center align-middle text-capitalize">
                    {booking.room.roomType}
                  </td>
                  <td className="text-center align-middle">
                    <span className="fw-medium">
                      {booking.checkInDate}
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    <span className="fw-medium">
                      {booking.checkOutDate}
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    {booking.guestName}
                  </td>
                  <td className="text-center align-middle">
                    <span className="text-muted">{booking.guestEmail}</span>
                  </td>
                  <td className="text-center align-middle">
                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                      {booking.totalNumOfGuests} {booking.totalNumOfGuests === 1 ? 'guest' : 'guests'}
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    <code className="text-muted bg-light px-2 py-1 rounded">
                      {booking.bookingConfirmationCode}
                    </code>
                  </td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-danger btn-sm d-flex align-items-center px-3 py-2 fw-medium shadow-sm"
                      onClick={() => handleCancelClick(booking.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center align-middle py-4">
                  <div className="text-muted">
                    <p className="h5 mb-2">No bookings found</p>
                    <p className="mb-0">No bookings match the selected criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;