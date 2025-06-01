
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaBook, 
  FaStar, 
  FaDollarSign, 
  FaCog,
  FaClock, 
} from 'react-icons/fa';
import { useState } from 'react';

const DashboardLayout1 = () => {
  const [isSidebarOpen, _setIsSidebarOpen] = useState(false);
  
  

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`
          fixed md:block w-64 bg-white shadow-lg h-screen pt-4
          transition-transform duration-300 ease-in-out z-30
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col border-r border-gray-200
        `}>
        <div className="px-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Mentor<span className="text-blue-600">Dashboard</span></h1>
          <p className="text-sm text-gray-500 mt-1">Empowering tech mentors</p>
        </div>
        
        <nav className="flex-1">
          {[
            { name: 'Dashboard', icon: FaHome, path: '/mentor_dashboard/home' },
            { name: 'Sessions', icon: FaCalendarAlt, path: '/mentor_dashboard/sessions' },
            { name: 'Availability', icon: FaClock, path: '/mentor_dashboard/availability' },
            { name: 'Resources', icon: FaBook, path: '/mentor_dashboard/resources' },
            { name: 'Reviews', icon: FaStar, path: '/mentor_dashboard/reviews' },
            { name: 'Earnings', icon: FaDollarSign, path: '/mentor_dashboard/earnings' },
            { name: 'Settings', icon: FaCog, path: '/mentor_dashboard/settings' }
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-6 py-3 text-sm font-medium ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon size={18} className="mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="px-6 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Senior Frontend Developer</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area with Outlet */}
      <div className="flex-1 overflow-y-auto p-10 md:pl-66">
        <div className="max-w-7xl mx-auto">
          <Outlet /> {/* This is where nested routes will render */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout1;