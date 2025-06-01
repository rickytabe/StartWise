import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {  
  FaUserCircle, 
  FaCalendar, 
  FaCog, 
  FaBook, 
  FaBars, 
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarLinks = [
    { icon: FaUserCircle, label: 'Profile', path: '/mentee_dashboard/profile' },
    { icon: FaCalendar, label: 'Sessions', path: '/mentee_dashboard/mentee_sessions' },
    { icon: FaBook, label: 'Payments', path: '/mentee_dashboard/payment' },
    { icon: FaCog, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:block w-64 bg-white shadow-lg h-screen
          transition-transform duration-300 ease-in-out z-30
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col border-r border-gray-200
        `}
      >
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Mentee Dashboard</h2>
            {isMobile && (
              <button 
                onClick={toggleSidebar}
                className="text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close sidebar"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="mt-4 flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="ml-4">
              <p className="font-medium">Alex Johnson</p>
              <p className="text-blue-100 text-sm">Mentee Account</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          <ul>
            {sidebarLinks.map(({ icon: Icon, label, path }) => (
              <li key={path} className="px-4 py-1">
                <NavLink
                  to={path}
                  onClick={() => isMobile && toggleSidebar()}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="mr-3 text-lg flex-shrink-0" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaSignOutAlt className="mr-3 text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        flex-1 min-h-screen md:ml-64 transition-spacing duration-300
      `}>
        <div className="p-4 md:p-0">
          <button
            onClick={toggleSidebar}
            className="md:hidden mb-4 p-2 rounded-lg bg-white shadow text-gray-600 hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <FaBars className="w-5 h-5" />
          </button>
          <div className="bg-white md:p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;