// src/components/SessionsPage.jsx
import { useState } from 'react';
import {  
  FaCheckCircle, 
  FaTimesCircle 
} from 'react-icons/fa';

const SessionsPage = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'completed'>('pending');

  const sessions = {
    pending: [
      { id: 1, name: 'Jamie Smith', topic: 'JavaScript Async Patterns', time: 'Jun 12, 4:00 PM' },
      { id: 2, name: 'Taylor Wilson', topic: 'React State Management', time: 'Jun 14, 11:00 AM' }
    ],
    confirmed: [
      { id: 1, name: 'Alex Johnson', topic: 'React Fundamentals', time: 'Today, 3:00 PM' },
      { id: 2, name: 'Samira Khan', topic: 'Node.js Backend', time: 'Tomorrow, 10:00 AM' }
    ],
    completed: [
      { id: 1, name: 'Riley Davis', topic: 'CSS Flexbox Mastery', time: 'Jun 5, 2:00 PM' },
      { id: 2, name: 'Jordan Miller', topic: 'GraphQL Basics', time: 'Jun 7, 1:30 PM' }
    ]
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Session Management</h1>
        <p className="text-gray-600">Manage your mentorship sessions</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-4">
            {['pending', 'confirmed', 'completed'].map(tab => (
              <button
                key={tab}
                className={`px-3 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          {sessions[activeTab].map((session) => (
            <div key={session.id} className="flex items-center p-4 border border-gray-200 rounded-xl">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-800">{session.name}</h3>
                <p className="text-sm text-gray-600">{session.topic}</p>
              </div>
              <div className="text-sm text-gray-600">{session.time}</div>
              <div className="ml-4 flex space-x-2">
                {activeTab === 'pending' && (
                  <>
                    <button className="bg-black text-white rounded-lg px-3 py-1.5 text-sm font-medium flex items-center">
                      <FaCheckCircle size={16} className="mr-1" /> Accept
                    </button>
                    <button className="border border-gray-300 text-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium flex items-center">
                      <FaTimesCircle size={16} className="mr-1" /> Decline
                    </button>
                  </>
                )}
                {activeTab === 'confirmed' && (
                  <button className="bg-black text-white rounded-lg px-3 py-1.5 text-sm font-medium flex items-center">
                    Mark Complete
                  </button>
                )}
                {activeTab === 'completed' && (
                  <button className="border border-gray-300 text-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium flex items-center">
                    View Notes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;