// Pages/ExploreMentors/index.tsx
import  { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import MentorCard from '../../Components/MentorCard';
import Button from '../../Components/shared/Button';
import LoadingScreen from '../../Components/shared/LoadingScreen';



interface Mentor {
  id: string;
  name: string;
  title: string;
  skills: string[];
  rating: number;
  sessions: number;
  price: number;
  location: string;
  availability: string;
  isTopMentor: boolean;
  isNearYou: boolean;
  profileImage: string;
}

const ExploreMentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    skills: [] as string[],
    minRating: 0,
    maxPrice: 10000,
    availability: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    const mockMentors: Mentor[] = [
      {
        id: '1',
        name: 'Alex Johnson',
        title: 'Senior Frontend Engineer at Google',
        skills: ['React', 'TypeScript', 'Next.js'],
        rating: 4.9,
        sessions: 142,
        price: 2500,
        location: 'Yaoundé, Cameroon',
        availability: 'Mon, Wed, Fri',
        isTopMentor: true,
        isNearYou: true,
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: '2',
        name: 'Sarah Williams',
        title: 'Lead Data Scientist at Microsoft',
        skills: ['Python', 'Machine Learning', 'TensorFlow'],
        rating: 4.8,
        sessions: 98,
        price: 3000,
        location: 'Douala, Cameroon',
        availability: 'Tue, Thu, Sat',
        isTopMentor: true,
        isNearYou: false,
        profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: '3',
        name: 'Michael Chen',
        title: 'UX Design Director at Apple',
        skills: ['Figma', 'UI/UX Design', 'Prototyping'],
        rating: 4.7,
        sessions: 87,
        price: 2800,
        location: 'Bamenda, Cameroon',
        availability: 'Flexible',
        isTopMentor: false,
        isNearYou: true,
        profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: '4',
        name: 'Priya Patel',
        title: 'Software Engineering Lead at Amazon',
        skills: ['Node.js', 'AWS', 'Serverless'],
        rating: 4.9,
        sessions: 156,
        price: 3200,
        location: 'Buea, Cameroon',
        availability: 'Weekends',
        isTopMentor: true,
        isNearYou: false,
        profileImage: 'https://images.unsplash.com/photo-1611689103472-1def9b4c5c47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: '5',
        name: 'David Brown',
        title: 'Mobile Development Lead at MTN',
        skills: ['Flutter', 'Dart', 'Firebase'],
        rating: 4.6,
        sessions: 75,
        price: 2300,
        location: 'Yaoundé, Cameroon',
        availability: 'Mon-Fri evenings',
        isTopMentor: false,
        isNearYou: true,
        profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: '6',
        name: 'Fatima Diallo',
        title: 'DevOps Engineer at Orange',
        skills: ['Docker', 'Kubernetes', 'CI/CD'],
        rating: 4.7,
        sessions: 92,
        price: 2900,
        location: 'Douala, Cameroon',
        availability: 'Tue, Thu, Sun',
        isTopMentor: false,
        isNearYou: false,
        profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setMentors(mockMentors);
      setFilteredMentors(mockMentors);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...mentors];
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(mentor => 
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply skills filter
    if (filters.skills.length > 0) {
      result = result.filter(mentor => 
        filters.skills.every(skill => mentor.skills.includes(skill))
      );
    }
    
    // Apply rating filter
    result = result.filter(mentor => mentor.rating >= filters.minRating);
    
    // Apply price filter
    result = result.filter(mentor => mentor.price <= filters.maxPrice);
    
    // Apply availability filter
    if (filters.availability !== 'all') {
      result = result.filter(mentor => 
        mentor.availability.toLowerCase().includes(filters.availability.toLowerCase())
      );
    }
    
    setFilteredMentors(result);
  }, [searchTerm, filters, mentors]);

  // Handle filter changes
  const handleSkillChange = (skill: string) => {
    setFilters(prev => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  // Get unique skills from all mentors
  const allSkills = Array.from(new Set(mentors.flatMap(mentor => mentor.skills)));

  // Get top mentors
  const topMentors = filteredMentors.filter(mentor => mentor.isTopMentor);
  
  // Get mentors near you
  const nearYouMentors = filteredMentors.filter(mentor => mentor.isNearYou);
  
  // Get other mentors
  const otherMentors = filteredMentors.filter(
    mentor => !mentor.isTopMentor && !mentor.isNearYou
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Find Your Ideal Mentor</h1>
          
          <div className="relative max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, skills, or expertise..."
              className="block w-full pl-10 pr-12 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (shown on large screens or when toggled) */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)} 
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              {/* Skills Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleSkillChange(skill)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.skills.includes(skill)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Minimum Rating</h3>
                <div className="flex items-center space-x-2">
                  {[0, 3, 4, 4.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilters({...filters, minRating: rating})}
                      className={`px-3 py-1 rounded-lg ${
                        filters.minRating === rating
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Max Price (XAF/session)</h3>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0</span>
                  <span>{filters.maxPrice.toLocaleString()} XAF</span>
                  <span>10,000</span>
                </div>
              </div>
              
              {/* Availability Filter */}
              <div>
                <h3 className="font-medium mb-3">Availability</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Any' },
                    { value: 'weekday', label: 'Weekdays' },
                    { value: 'weekend', label: 'Weekends' },
                    { value: 'flexible', label: 'Flexible' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={filters.availability === option.value}
                        onChange={() => setFilters({...filters, availability: option.value})}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <button
                onClick={() => {
                  setFilters({
                    skills: [],
                    minRating: 0,
                    maxPrice: 10000,
                    availability: 'all'
                  });
                }}
                className="mt-6 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Mentors Listings */}
          <div className="lg:w-3/4">
            {/* Results Summary */}
            <div className="mb-8 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredMentors.length} of {mentors.length} mentors
              </p>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Your Location:</span> Yaoundé, Cameroon
              </div>
            </div>
            
            {/* Top Tutors Section */}
            {topMentors.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold">Top Tutors</h2>
                  <div className="ml-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Highest Rated
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topMentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Tutors Near You Section */}
            {nearYouMentors.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold">Tutors Near You</h2>
                  <div className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <FaMapMarkerAlt className="mr-1" /> Yaoundé Area
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearYouMentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </div>
            )}
            
            {/* All Tutors Section */}
            {otherMentors.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">All Tutors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherMentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </div>
            )}
            
            {/* No Results Message */}
            {filteredMentors.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-4">No mentors match your filters</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or resetting your filters
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      skills: [],
                      minRating: 0,
                      maxPrice: 10000,
                      availability: 'all'
                    });
                  }}
                  variant="primary"
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMentors;