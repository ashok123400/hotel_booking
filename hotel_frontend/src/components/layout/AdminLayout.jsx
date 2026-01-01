import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-gray-900 text-white items-center justify-between fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
              A
            </div>
            <h1 className="text-lg font-medium">Jolly Hotel Admin</h1>
          </div>
        </div>
      </div>

      {/* Overlay (Mobile only) */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - Fixed positioning */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-800 z-40 transition-transform duration-300 ease-in-out flex-shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <AdminSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen md:ml-0 transition-all duration-300 mt-16 md:mt-0 overflow-hidden">
        <div className="h-full overflow-auto">
          <div className="p-4 md:p-6 min-h-full">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;