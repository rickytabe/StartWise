// MenteeDashboard.tsx
import { useState, useEffect } from 'react';
import { FaUser, FaChartLine, FaStar, FaGraduationCap,  FaBullseye, FaCog } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

export interface Learner {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  dob: string;
  sex: 'male' | 'female' | 'other';
  level: 'beginner' | 'intermediate' | 'pro';
  completedMentorships: number;
  profileImage?: string;
  skills?: string[];
  goals?: string[];
  createdAt: string;
  updatedAt: string;
}

interface Mentorship {
  id: string;
  mentorName: string;
  mentorImage: string;
  topic: string;
  date: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'in-progress';
}

const MenteeDashboard = () => {
  const [learner, setLearner] = useState<Learner | null>(null);
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [newGoal, setNewGoal] = useState('');
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    // Simulate API call to fetch learner data
    setTimeout(() => {
      const mockLearner: Learner = {
        id: '12345',
        email: 'emma.wilson@example.com',
        name: 'Emma Wilson',
        phoneNumber: '+1 (555) 123-4567',
        dob: '1998-05-15',
        sex: 'female',
        level: 'intermediate',
        completedMentorships: 7,
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        skills: ['React', 'TypeScript', 'UI/UX Design', 'Node.js'],
        goals: ['Become a senior developer', 'Learn GraphQL', 'Build a portfolio project'],
        createdAt: '2023-01-15',
        updatedAt: '2023-10-20'
      };
      
      const mockMentorships: Mentorship[] = [
        {
          id: 'm1',
          mentorName: 'Alex Johnson',
          mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          topic: 'Advanced React Patterns',
          date: '2023-11-05 14:00',
          duration: '60 mins',
          status: 'upcoming'
        },
        {
          id: 'm2',
          mentorName: 'Sarah Chen',
          mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          topic: 'TypeScript Best Practices',
          date: '2023-11-12 16:30',
          duration: '45 mins',
          status: 'upcoming'
        },
        {
          id: 'm3',
          mentorName: 'Michael Rodriguez',
          mentorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          topic: 'Career Growth Strategies',
          date: '2023-10-28 10:00',
          duration: '90 mins',
          status: 'completed'
        }
      ];
      
      setLearner(mockLearner);
      setMentorships(mockMentorships);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddGoal = () => {
    if (newGoal.trim() && learner) {
      const updatedLearner = {
        ...learner,
        goals: [...(learner.goals || []), newGoal.trim()]
      };
      setLearner(updatedLearner);
      setNewGoal('');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && learner) {
      const updatedLearner = {
        ...learner,
        skills: [...(learner.skills || []), newSkill.trim()]
      };
      setLearner(updatedLearner);
      setNewSkill('');
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!learner) {
    return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">No learner data found</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex">
      {/* Sidebar - update top position */}
      <div className="w-64 bg-white shadow-md fixed h-[calc(100vh-64px)] top-16">
        
        <nav className="mt-8">
          <button 
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartLine className="mr-3" />
            Dashboard
          </button>
          
          <button 
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'mentors' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('mentors')}
          >
            <FaUser className="mr-3" />
            My Mentors
          </button>
          
          <button 
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'goals' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('goals')}
          >
            <FaBullseye className="mr-3" />
            Goals & Progress
          </button>
          
          <button 
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog className="mr-3" />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content - update margin-top */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          
          
          <div className="flex items-center space-x-4">
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={learner.profileImage || 'https://via.placeholder.com/150'} 
                  alt={learner.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-800">{learner.name}</p>
                <p className="text-sm text-gray-500">Mentee</p>
              </div>
              <FiChevronDown className="text-gray-500" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {learner.name}!</h1>
            <p className="text-gray-600">Here's your mentorship progress and upcoming sessions.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={learner.profileImage || 'https://via.placeholder.com/150'} 
                    alt={learner.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{learner.name}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      learner.level === 'beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : learner.level === 'intermediate' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-purple-100 text-purple-800'
                    }`}>
                      {learner.level.charAt(0).toUpperCase() + learner.level.slice(1)}
                    </span>
                    <span className="text-gray-600">{calculateAge(learner.dob)} years</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Email:</span>
                  <span className="font-medium">{learner.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Phone:</span>
                  <span className="font-medium">{learner.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Member since:</span>
                  <span className="font-medium">{new Date(learner.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Mentorship Stats</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaStar className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{learner.completedMentorships}</p>
                    <p className="text-gray-600">Sessions Completed</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <FaGraduationCap className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{learner.skills?.length || 0}</p>
                    <p className="text-gray-600">Skills Learned</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <FaBullseye className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{learner.goals?.length || 0}</p>
                    <p className="text-gray-600">Goals Set</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-medium mb-2">Progress to Next Level</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      learner.level === 'beginner' 
                        ? 'bg-green-600 w-1/3' 
                        : learner.level === 'intermediate' 
                          ? 'bg-yellow-600 w-2/3' 
                          : 'bg-purple-600 w-full'
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Pro</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Upcoming Mentorships */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Upcoming Mentorships</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {mentorships.filter(m => m.status === 'upcoming').map(mentorship => (
                  <div key={mentorship.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={mentorship.mentorImage} 
                        alt={mentorship.mentorName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{mentorship.topic}</h3>
                      <p className="text-gray-600 text-sm">{mentorship.mentorName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{new Date(mentorship.date).toLocaleDateString()}</p>
                      <p className="text-gray-600 text-sm">{new Date(mentorship.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
                
                {mentorships.filter(m => m.status === 'upcoming').length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No upcoming mentorship sessions
                  </div>
                )}
              </div>
            </div>
            
            {/* Goals Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Goals</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="mb-4">
                <ul className="space-y-2">
                  {learner.goals?.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
                
                {(!learner.goals || learner.goals.length === 0) && (
                  <div className="text-gray-500 italic">
                    You haven't set any goals yet
                  </div>
                )}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Add a new goal..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  onClick={handleAddGoal}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Skills</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {learner.skills?.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
                
                {(!learner.skills || learner.skills.length === 0) && (
                  <div className="text-gray-500 italic">
                    You haven't added any skills yet
                  </div>
                )}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FaStar className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Completed mentorship session</p>
                    <p className="text-gray-600 text-sm">Advanced React Patterns with Alex Johnson</p>
                    <p className="text-gray-500 text-xs">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FaUser className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Connected with a new mentor</p>
                    <p className="text-gray-600 text-sm">Sarah Chen - TypeScript Expert</p>
                    <p className="text-gray-500 text-xs">5 days ago</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <FaBullseye className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Achieved a goal</p>
                    <p className="text-gray-600 text-sm">Completed portfolio project</p>
                    <p className="text-gray-500 text-xs">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenteeDashboard;