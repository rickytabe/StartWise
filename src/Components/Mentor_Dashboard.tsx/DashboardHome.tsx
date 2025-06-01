
import { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaStar, 
  FaClock, 
  FaUser, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaFileAlt, 
  FaLink, 
  FaChevronRight,
  FaPlus,
  FaSearch,
  FaEllipsisH
} from 'react-icons/fa';

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'completed'>('pending');

  // Mock data
  const upcomingSessions = [
    { id: 1, name: 'Alex Johnson', skill: 'React Fundamentals', date: 'Today, 3:00 PM', status: 'confirmed' },
    { id: 2, name: 'Samira Khan', skill: 'Node.js Backend', date: 'Tomorrow, 10:00 AM', status: 'confirmed' },
    { id: 3, name: 'Michael Chen', skill: 'UI/UX Design', date: 'Jun 15, 2:30 PM', status: 'pending' }
  ];

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

  const metrics = [
    { id: 1, title: 'Total Mentees', value: '24', icon: FaUser, color: 'text-blue-500' },
    { id: 2, title: 'Hours Mentored', value: '142', icon: FaClock, color: 'text-purple-500' },
    { id: 3, title: 'Avg. Rating', value: '4.8', icon: FaStar, color: 'text-amber-500' },
    { id: 4, title: 'Sessions', value: '68', icon: FaCalendarAlt, color: 'text-green-500' }
  ];

  const reviews = [
    { id: 1, name: 'Alex Johnson', rating: 5, comment: 'Amazing mentor! Explained complex topics in a simple way.', date: 'Jun 5, 2023' },
    { id: 2, name: 'Samira Khan', rating: 5, comment: 'Very patient and knowledgeable. Highly recommend!', date: 'Jun 3, 2023' },
    { id: 3, name: 'Michael Chen', rating: 4, comment: 'Great insights on design systems. Learned a lot in one session.', date: 'May 28, 2023' }
  ];

  const resources = [
    { id: 1, title: 'JavaScript Best Practices', type: 'PDF', category: 'Frontend', date: 'Jun 1, 2023' },
    { id: 2, title: 'Node.js Security Guide', type: 'PDF', category: 'Backend', date: 'May 28, 2023' },
    { id: 3, title: 'React Design Patterns', type: 'GitHub', category: 'Frontend', date: 'May 22, 2023' }
  ];

  const sessionNotes = [
    { id: 1, mentee: 'Alex Johnson', date: 'Jun 5, 2023', notes: 'Covered React hooks and context API. Alex made great progress on his project.' },
    { id: 2, mentee: 'Samira Khan', date: 'Jun 3, 2023', notes: 'Focused on REST API design and middleware implementation. Samira implemented authentication successfully.' },
    { id: 3, mentee: 'Michael Chen', date: 'May 28, 2023', notes: 'Discussed design systems and component libraries. Michael created a style guide for his team.' }
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mentor Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your mentorship overview</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Overview */}
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Sessions</h2>
            <button className="text-sm font-medium text-blue-600 flex items-center">
              View All <FaChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingSessions.map(session => (
              <div key={session.id} className="flex items-center p-4 border border-gray-200 rounded-xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-800">{session.name}</h3>
                  <p className="text-sm text-gray-600">{session.skill}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{session.date}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mentorship Impact */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mentorship Impact</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {metrics.map(metric => (
              <div key={metric.id} className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center">
                  <metric.icon size={20} className={`${metric.color} mr-2`} />
                  <span className="text-sm text-gray-600">{metric.title}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-2">{metric.value}</p>
              </div>
            ))}
          </div>
          
          {/* Simple Chart */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>This Week</span>
              <span>12 hrs</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-4 mb-1">
              <span>Last Week</span>
              <span>10 hrs</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
        
        {/* Session Management */}
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Session Management</h2>
          </div>
          
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
        
        {/* Reviews & Ratings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Reviews & Ratings</h2>
            <div className="flex items-center">
              <FaStar className="text-amber-400 fill-amber-400" size={20} />
              <span className="text-lg font-bold ml-1">4.8</span>
              <span className="text-gray-500 ml-1">/5.0</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                    <h3 className="font-medium text-gray-800 ml-2">{review.name}</h3>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        size={14} 
                        className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} ml-0.5`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                <p className="text-xs text-gray-500 mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Resource Sharing */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Resource Sharing</h2>
            <button className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center">
              <FaPlus size={16} className="mr-2" /> Add Resource
            </button>
          </div>
          
          <div className="space-y-4">
            {resources.map(resource => (
              <div key={resource.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${
                    resource.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {resource.type === 'PDF' ? (
                      <FaFileAlt className="text-red-600" size={20} />
                    ) : (
                      <FaLink className="text-blue-600" size={20} />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium text-gray-800">{resource.title}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                      <span className="text-xs text-gray-500">{resource.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Session Notes Log */}
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Session Notes</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by mentee..."
                className="border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Mentee</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Notes</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sessionNotes.map(note => (
                  <tr key={note.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                        <span className="ml-3 font-medium text-gray-800">{note.mentee}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{note.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{note.notes}</td>
                    <td className="py-3 px-4">
                      <button className="text-gray-500 hover:text-gray-700">
                        <FaEllipsisH size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© 2023 MentorPro. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Terms</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Help Center</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default DashboardHome;