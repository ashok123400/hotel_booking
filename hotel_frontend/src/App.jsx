import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";

import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";

import Home from "./components/home/Home";
import ExistingRooms from "./components/room/ExistingRooms";
import EditRoom from "./components/room/EditRoom";
import AddRoom from "./components/room/AddRoom";
import RoomListing from "./components/room/RoomListing";
import AdminDashboard from "./components/layout/AdminDashboard";
import Checkout from "./components/booking/Checkout";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import FindBooking from "./components/booking/FindBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import RegisterAdmin from "./components/auth/RegisterAdmin";
import Profile from "./components/auth/Profile";
import RoleList from "./components/roles/RoleList";
import UserList from "./components/roles/UserList";

// Simple admin check component
function AdminCheck({ children }) {
  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const isAdmin = isLoggedIn && userRole === "ROLE_ADMIN";

  if (!isAdmin) {
    return (
      <UserLayout>
        <div className="container mt-5">
          <div className="alert alert-danger text-center">
            <h4>Access Denied</h4>
            <p>Administrator access required.</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with User Layout */}
          <Route path="/" element={<UserLayout><Home /></UserLayout>} />
          <Route path="/browse-all-rooms" element={<UserLayout><RoomListing /></UserLayout>} />
          <Route path="/find-booking" element={<UserLayout><FindBooking /></UserLayout>} />
          <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
          <Route path="/register" element={<UserLayout><Registration /></UserLayout>} />

          {/* Admin Routes - Nested with AdminLayout using Outlet */}
          <Route 
            path="/admin" 
            element={
              <RequireAuth>
                <AdminCheck>
                  <AdminLayout />
                </AdminCheck>
              </RequireAuth>
            } 
          >
            {/* Index route - /admin */}
            <Route index element={<AdminDashboard />} />
            
            {/* Nested admin routes */}
            <Route path="add-room" element={<AddRoom />} />
            <Route path="manage-rooms" element={<ExistingRooms />} />
            <Route path="edit-room/:roomId" element={<EditRoom />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="register-admin" element={<RegisterAdmin />} />
            <Route path="users" element={<UserList />} />
            <Route path="roles" element={<RoleList />} />
          </Route>

          {/* User Routes with User Layout */}
          <Route 
            path="/book-room/:roomId" 
            element={
              <RequireAuth>
                <UserLayout>
                  <Checkout />
                </UserLayout>
              </RequireAuth>
            } 
          />
          <Route 
            path="/booking-success" 
            element={
              <RequireAuth>
                <UserLayout>
                  <BookingSuccess />
                </UserLayout>
              </RequireAuth>
            } 
          />
          <Route 
            path="/existing-bookings" 
            element={
              <RequireAuth>
                <UserLayout>
                  <Bookings />
                </UserLayout>
              </RequireAuth>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <RequireAuth>
                <UserLayout>
                  <Profile />
                </UserLayout>
              </RequireAuth>
            } 
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<UserLayout><div className="container mt-5"><h2>Page Not Found</h2></div></UserLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;