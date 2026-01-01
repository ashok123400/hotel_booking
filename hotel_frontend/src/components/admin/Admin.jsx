import React from "react";
import { useAuth } from "../auth/AuthProvider";

const Admin = () => {
  const { user } = useAuth();
  const userRole = localStorage.getItem("userRole");

  // Your background image - make sure to import it or use the correct path
  const bgImage = "/path/to/your/background-image.jpg"; // Update this path

  return (
    <div className="container-fluid">
      {userRole === "ROLE_ADMIN" && (
        <div 
          className="mt-3 text-center rounded-lg p-4"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "400px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <h2 className="text-primary mb-4">Admin Dashboard</h2>
          <p style={{ color: "red", fontSize: "1.2rem", fontWeight: "bold" }}>
            Manage rooms, bookings, and user roles below.
          </p>

          <div className="d-flex flex-column align-items-center gap-3 mt-4 mb-5">
            <div className="row g-3 w-100 justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="d-grid gap-3">
                  <a href="/add-room" className="btn btn-outline-success btn-lg">
                    Add New Room
                  </a>
                  
                  <a href="/existing-rooms" className="btn btn-outline-info btn-lg">
                    View / Manage Rooms
                  </a>
                  
                  <a href="/existing-bookings" className="btn btn-outline-warning btn-lg">
                    View All Bookings
                  </a>
                  
                  <a href="/register-admin" className="btn btn-outline-primary btn-lg">
                    Register Admin
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-12">
              <div className="bg-dark bg-opacity-75 p-4 rounded">
                <h4 className="text-warning mb-3">User Management</h4>
                {/* Your RoleList and UserList components will be loaded in their own routes */}
                <p className="text-light">
                  Use the sidebar navigation to manage roles and users.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;