import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlus,
  FaBed,
  FaClipboardList,
  FaUserShield,
  FaSignOutAlt,
  FaHotel
} from "react-icons/fa";
import { AuthContext } from "../auth/AuthProvider";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem("userName") || "Admin";

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { state: { message: "You have been logged out!" } });
  };

  const linkClasses = ({ isActive }) =>
    isActive
      ? "bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200  "
      : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200  hover:border-gray-500 mx-2";

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: <FaTachometerAlt className="text-lg" />, end: true },
    { path: "/admin/add-room", label: "Add New Room", icon: <FaPlus className="text-lg" /> },
    { path: "/admin/manage-rooms", label: "Manage Rooms", icon: <FaBed className="text-lg" /> },
    { path: "/admin/bookings", label: "View All Bookings", icon: <FaClipboardList className="text-lg" /> },
    { path: "/admin/register-admin", label: "Register Admin", icon: <FaUserShield className="text-lg" /> },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-7 pb-4 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
            <FaHotel className="text-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <NavLink 
              to="/" 
              className="text-xl font-bold text-white hover:text-gray-300 transition-colors truncate block"
            >
              Jolly Hotel
            </NavLink>
            <p className="text-gray-400 text-sm truncate">Admin Panel</p>
          </div>
        </div>
        <div className="text-sm text-gray-300 px-1">
          Welcome, <span className="font-semibold text-yellow-400 truncate block">{userName}</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={linkClasses}
            end={item.end || false}
          >
            {item.icon}
            <span className="font-medium flex-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-semibold shadow-lg"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;