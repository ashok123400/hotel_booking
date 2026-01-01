import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";
import { getBookingsByUserEmail, getAllBookings, cancelBooking } from "../utils/ApiFunctions";
import { useNavigate, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        const email = localStorage.getItem("userEmail");

        if (!token) {
          throw new Error("User not logged in.");
        }

        let data = [];
        if (role === "ROLE_ADMIN") {
          data = await getAllBookings();
        } else if (role === "ROLE_USER") {
          if (!email) throw new Error("User email not found.");
          data = await getBookingsByUserEmail(email, token);
        } else {
          throw new Error("Invalid user role.");
        }

        setBookingInfo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const token = localStorage.getItem("token");
        await cancelBooking(bookingId, token);

        setBookingInfo((prev) => prev.filter((b) => b.bookingId !== bookingId));
        setSuccessMsg("✅ Booking cancelled successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (error) {
        setError(error.message);
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Header Section */}
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-gray-800">View All Bookings</h1>
							<p className="text-gray-600 mt-1">Manage all your Bookings in this inventory</p>
						</div>
        <div className="text-muted">Total Bookings: {bookingInfo.length}</div>
      </div>

      {/* Alert Messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success fade show">{successMsg}</div>}

      {/* Home Button */}
      <div className="d-flex justify-content-end mb-4">
        <Link to="/admin" className="btn btn-outline-primary btn-sm d-flex align-items-center">
          <FaHome className="me-2" />
          Home
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-4">
          <p>Loading bookings...</p>
        </div>
      ) : bookingInfo.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted">
            {role === "ROLE_ADMIN" 
              ? "No bookings found." 
              : "You have no bookings yet."}
          </p>
        </div>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
        />
      )}
    </div>
    
  );
};

export default Bookings;