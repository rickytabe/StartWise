import { useState, useEffect } from 'react';
import { FaStar, FaGraduationCap, FaBullseye } from 'react-icons/fa';

interface Learner {
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

const Profile = () => {
  const [learner, setLearner] = useState<Learner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newGoal, setNewGoal] = useState('');
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    
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
        profileImage: 'https://i.pinimg.com/736x/77/2a/0e/772a0e5c8cda1506181fd68b1d5b72a3.jpg',
        skills: ['React', 'TypeScript', 'UI/UX Design', 'Node.js'],
        goals: ['Become a senior developer', 'Learn GraphQL', 'Build a portfolio project'],
        createdAt: '2023-01-15',
        updatedAt: '2023-10-20'
      };
      setLearner(mockLearner);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddGoal = () => {
    if (newGoal.trim() && learner) {
      setLearner(prev => ({
        ...prev!,
        goals: [...(prev?.goals || []), newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && learner) {
      setLearner(prev => ({
        ...prev!,
        skills: [...(prev?.skills || []), newSkill.trim()]
      }));
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
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!learner) {
    return <div className="p-8 text-center text-gray-600">No profile data found</div>;
  }

  return (
    <div className="bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      
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
          <h2 className="text-xl font-bold mb-4">Progress Overview</h2>
          
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
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">My Skills</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {learner.skills?.map((skill, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
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
        
        {/* Goals Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">My Goals</h2>
          
          <div className="mb-4">
            <ul className="space-y-2">
              {learner.goals?.map((goal, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
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
    </div>
  );
};

export default Profile;