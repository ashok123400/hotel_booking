import React from "react";
import { Link } from "react-router-dom";
import RoleList from "../roles/RoleList";
import UserList from "../roles/UserList";

const AdminDashboard = () => {
  const bgImage = "/path/to/your/background-image.jpg"; // Update this path

  return (
    <div className="">
          <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Error Display */}
       
      {/* Users and Roles in Dashboard */}
      <div className="container mt-4">
        <UserList />
      </div>
      <div className="container mt-4">
        <RoleList />
      </div>
    </div>
  );
};

export default AdminDashboard;