import { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaVideo, 
  FaUserTie, 
  FaComments, 
  FaSearch, 
  FaFilter,
  FaPlus,
  FaEllipsisV
} from 'react-icons/fa';

const MenteeSessions = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock session data
  const sessions = {
    upcoming: [
      {
        id: 1,
        mentor: 'Dr. Sarah Johnson',
        title: 'Career Path Discussion',
        date: '2023-06-15',
        time: '14:00 - 15:00',
        meetingLink: 'https://meet.example.com/session-1',
        mentorImage: null,
        status: 'confirmed',
        description: 'Discussion about career options in software development and next steps for growth.'
      },
      {
        id: 2,
        mentor: 'Alex Rodriguez',
        title: 'Technical Interview Prep',
        date: '2023-06-18',
        time: '11:00 - 12:00',
        meetingLink: 'https://meet.example.com/session-2',
        mentorImage: null,
        status: 'confirmed',
        description: 'Prepare for upcoming technical interviews with mock coding challenges.'
      },
      {
        id: 3,
        mentor: 'Priya Patel',
        title: 'Project Architecture Review',
        date: '2023-06-22',
        time: '16:00 - 17:00',
        meetingLink: 'https://meet.example.com/session-3',
        mentorImage: null,
        status: 'pending',
        description: 'Review the architecture of your current project and discuss improvements.'
      }
    ],
    past: [
      {
        id: 4,
        mentor: 'Dr. Michael Chen',
        title: 'Resume Review',
        date: '2023-05-20',
        time: '10:00 - 11:00',
        meetingLink: null,
        mentorImage: null,
        status: 'completed',
        description: 'Review and feedback on your current resume for tech positions.',
        feedback: 'Excellent session, got great tips on highlighting my projects.'
      },
      {
        id: 5,
        mentor: 'Emma Wilson',
        title: 'Leadership Skills Workshop',
        date: '2023-05-12',
        time: '13:00 - 14:30',
        meetingLink: null,
        mentorImage: null,
        status: 'completed',
        description: 'Developing essential leadership skills for tech managers.',
        feedback: 'Learned valuable communication techniques for team management.'
      }
    ]
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredSessions = sessions[activeTab as keyof typeof sessions].filter(session => {
    if (!searchQuery) return true;
    return (
      session.mentor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mentoring Sessions</h1>
          <p className="text-gray-600 mt-2">
            {activeTab === 'upcoming' 
              ? 'Your upcoming mentoring sessions' 
              : 'Review your past mentoring sessions'}
          </p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
          <FaPlus className="mr-2" />
          Book New Session
        </button>
      </div>

      {/* Tabs and Controls */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handleTabChange('upcoming')}
            >
              Upcoming Sessions
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handleTabChange('past')}
            >
              Past Sessions
            </button>
          </div>
          
          <div className="flex space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="p-4 border-b flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Statuses</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Canceled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Dates</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Next 7 days</option>
                <option>Next 30 days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mentor</label>
              <select className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Mentors</option>
                <option>Dr. Sarah Johnson</option>
                <option>Alex Rodriguez</option>
                <option>Priya Patel</option>
                <option>Dr. Michael Chen</option>
                <option>Emma Wilson</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      session.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : session.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 mt-3">{session.title}</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <FaEllipsisV />
                  </button>
                </div>
                
                <div className="mt-4 flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                    <FaUserTie className="text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">{session.mentor}</p>
                    <p className="text-sm text-gray-500">Mentor</p>
                  </div>
                </div>
                
                <p className="mt-4 text-gray-600">{session.description}</p>
                
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2 text-blue-500" />
                    <span>{session.time}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  {activeTab === 'upcoming' && session.meetingLink && (
                    <a 
                      href={session.meetingLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                      <FaVideo className="mr-2" />
                      Join Session
                    </a>
                  )}
                  {activeTab === 'upcoming' && session.status === 'pending' && (
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition duration-200">
                      Reschedule
                    </button>
                  )}
                  {activeTab === 'past' && (
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition duration-200">
                      View Feedback
                    </button>
                  )}
                </div>
              </div>
              
              {activeTab === 'past' && (session as any)?.feedback && (
                <div className="bg-blue-50 p-4 border-t border-blue-100">
                  <div className="flex items-start">
                    <FaComments className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{(session as any)?.feedback }</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-gray-500 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No sessions found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming sessions. Book a session with a mentor to get started."
                : "You haven't completed any sessions yet. Your past sessions will appear here once completed."}
            </p>
            {activeTab === 'upcoming' && (
              <button className="mt-4 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                <FaPlus className="mr-2" />
                Book New Session
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteeSessions;