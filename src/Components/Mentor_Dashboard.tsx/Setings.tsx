// src/components/SettingsPage.jsx
import { useState } from 'react';
import { FaUser, FaLock, FaBell, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';

const SettingsPage = () => {
  const [activeSetting, setActiveSetting] = useState('profile');
  
  const settingsMenu = [
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'security', name: 'Security', icon: FaLock },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'billing', name: 'Billing', icon: FaCreditCard },
    { id: 'support', name: 'Support', icon: FaQuestionCircle },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Account Settings</h2>
              <nav>
                {settingsMenu.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSetting(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg text-left ${
                      activeSetting === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={18} className="mr-3" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            {activeSetting === 'profile' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Sarah Johnson"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="sarah@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      rows={4}
                      defaultValue="Senior Frontend Developer with 8 years of experience specializing in React and TypeScript."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white rounded-lg px-6 py-2.5 text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
            
            {activeSetting === 'security' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-black text-white rounded-lg px-6 py-2.5 text-sm font-medium">
                    Update Password
                  </button>
                </div>
              </div>
            )}
            
            {activeSetting === 'notifications' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Session Requests</p>
                      <p className="text-sm text-gray-600">Notify me when I receive new session requests</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Session Reminders</p>
                      <p className="text-sm text-gray-600">Send reminders before upcoming sessions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">New Reviews</p>
                      <p className="text-sm text-gray-600">Notify me when I receive new reviews</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;