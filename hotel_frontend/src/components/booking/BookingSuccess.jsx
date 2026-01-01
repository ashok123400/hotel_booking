import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const message = location.state?.message;
  const error = location.state?.error;

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="container text-center">
      <Header title="Booking Success" />

      <div className="mt-5">
        {message ? (
          <div>
            <h3 className="text-success mb-3">Booking Success!</h3>
            <p className="text-success">{message}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-danger mb-3">Error Booking Room!</h3>
            <p className="text-danger">{error}</p>
          </div>
        )}

        {/* Redirect button */}
        <button
          onClick={handleGoToProfile}
          className="btn btn-primary mt-4"
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
