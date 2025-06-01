// Pages/MentorDetailPage/index.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaChevronLeft, FaGoogle } from 'react-icons/fa';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import Button from '../../Components/shared/Button';
import MentorCard from '../../Components/MentorCard';
import LoadingScreen from '../../Components/shared/LoadingScreen';
import { toast } from 'react-toastify';
import { mentors as mockMentors } from './mockData'; // Create this file to store the mock data

// Define the Mentor type
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
  bio: string;
  languages: string[];
  reviews?: { name: string; date: string; rating: number; comment: string; }[];
  availabilitySlots?: { day: string; slots: string[]; }[];
}

const MentorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    // Find mentor by ID from mock data
    const foundMentor = mockMentors.find(m => m.id === id);
    
    if (!foundMentor) {
      toast.error('Mentor not found');
      navigate('/mentors');
      return;
    }

    // Add additional mentor details that aren't in the main list
    const enrichedMentor = {
      ...foundMentor,
      bio: 'Frontend specialist with 8+ years of experience building scalable web applications. I specialize in React ecosystem and performance optimization. Passionate about mentoring junior developers and sharing industry best practices.',
      languages: ['English', 'French'],
      isTopMentor: foundMentor.isTopMentor || false,
      isNearYou: foundMentor.isNearYou || false,
      reviews: [
        { name: 'Samuel T.', date: '2023-05-15', rating: 5, comment: 'Helped me debug a complex issue in minutes. Great explanation!' },
        { name: 'Fatima K.', date: '2023-04-22', rating: 5, comment: 'Best mentor ever! Practical advice for technical interviews.' },
        { name: 'David M.', date: '2023-03-10', rating: 4.5, comment: 'Great session on best practices. Would book again!' }
      ],
      availabilitySlots: [
        { day: 'Mon', slots: ['10:00-12:00', '14:00-16:00'] },
        { day: 'Wed', slots: ['09:00-11:00', '15:00-17:00'] },
        { day: 'Fri', slots: ['13:00-15:00', '16:00-18:00'] }
      ]
    };

    setMentor(enrichedMentor);
    setLoading(false);
  }, [id, navigate]);

  const handleBookSession = async () => {
    if (!user) {
      toast.error('Please login to book a session');
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingRef = doc(db, 'bookings', `${Date.now()}`);
      const bookingData = {
        mentorId: mentor?.id,
        mentorName: mentor?.name,
        learnerId: user.uid,
        learnerName: user.displayName || user.email,
        date: selectedDate,
        time: selectedTime,
        topic: selectedTopic || 'General Mentorship',
        status: 'pending',
        price: mentor?.price,
        createdAt: serverTimestamp(),
        sessionLink: '', // To be updated by mentor
      };

      await setDoc(bookingRef, bookingData);

      toast.success(
        <div>
          <p className="font-medium">Session booked successfully!</p>
          <p className="text-sm">
            With {mentor?.name} on {selectedDate} at {selectedTime}
          </p>
        </div>,
        {
          autoClose: 5000,
          position: 'top-center',
        }
      );

      // Redirect to bookings page after short delay
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);

    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="py-4 px-4 md:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <FaChevronLeft className="mr-2" /> Back to Mentors
        </button>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-start">
              <img 
                src={mentor?.profileImage} 
                alt={mentor?.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{mentor?.name}</h1>
                    <p className="text-gray-600 mt-1">{mentor?.title}</p>
                    
                    <div className="mt-3 flex items-center">
                      <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        <FaStar className="mr-1 text-yellow-500" />
                        <span className="font-medium">{mentor?.rating}</span>
                        <span className="ml-1">({mentor?.sessions} sessions)</span>
                      </div>
                      
                      <div className="ml-4 flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-1 text-blue-600" />
                        <span>{mentor?.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="primary" className="hidden md:flex">
                    Book a Session
                  </Button>
                </div>
                
                <Button>
                  Book a Session
                </Button>
              </div>
            </div>
            
            {/* About Section */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                About {mentor?.name}
              </h2>
              
              <p className="text-gray-700 mb-6">
                {mentor?.bio}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-600 mr-3 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{mentor?.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaCalendarAlt className="text-blue-600 mr-3 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500">Sessions Completed</p>
                    <p className="font-medium">{mentor?.sessions}+</p>
                  </div>
                </div>
                
                {mentor?.languages && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Languages</p>
                      <p className="font-medium">{mentor.languages.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Skills & Expertise */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Skills & Expertise
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {mentor?.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Availability */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Availability
                </h2>
                
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                  <FaGoogle className="mr-2" /> Sync with Calendar
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div 
                    key={day} 
                    className="text-center py-2 font-medium text-gray-700"
                  >
                    {day}
                  </div>
                ))}
                
                {mentor?.availabilitySlots?.flatMap(daySlot => 
                  daySlot.slots.map((slot, idx) => (
                    <div 
                      key={`${daySlot.day}-${idx}`}
                      className={`text-center py-2 rounded-lg ${
                        daySlot.day === 'Mon' || daySlot.day === 'Wed' || daySlot.day === 'Fri'
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {slot}
                    </div>
                  ))
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                Times shown in your local timezone
              </p>
            </div>
            
            {/* Reviews */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Reviews & Testimonials
              </h2>
              
              <div className="flex items-center mb-6">
                <div className="text-4xl font-bold mr-4">{mentor?.rating}</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(mentor?.rating || 0) ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <p className="text-gray-600">{mentor?.sessions} sessions • {mentor?.reviews?.length} reviews</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {mentor?.reviews?.map((review, index) => (
                  <div key={index} className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-900">{review.name}</h3>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    
                    <div className="flex text-yellow-400 my-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(review.rating) ? 'fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Book a Session
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Choose Topic (Optional)
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a topic</option>
                    <option>Career Advice</option>
                    <option>Technical Interview Prep</option>
                    <option>Code Review</option>
                    <option>Project Guidance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!selectedDate}
                  >
                    <option value="">Select time</option>
                    {mentor?.availabilitySlots?.flatMap(daySlot => 
                      daySlot.slots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))
                    )}
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Price per session:</span>
                    <span className="text-xl font-bold">{mentor?.price.toLocaleString()} XAF</span>
                  </div>
                  
                  <Button 
                    onClick={handleBookSession}
                    disabled={isSubmitting || !selectedDate || !selectedTime}
                    className="w-full"
                  >
                    {isSubmitting ? 'Booking...' : 'Book Now'}
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Have a promo code?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Mentors */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* In real app: fetch similar mentors based on skills/location */}
            {[1, 2, 3].map((i) => (
              <MentorCard 
                key={i} 
                mentor={{
                  id: `${i}`,
                  name: `Mentor ${i}`,
                  title: `Position ${i}`,
                  skills: ['React', 'Node.js'],
                  rating: 4.5,
                  sessions: 50 + i * 10,
                  price: 2000 + i * 500,
                  location: 'Yaoundé, Cameroon',
                  availability: 'Flexible',
                  //isTopMentor: true,
                  profileImage: 'https://via.placeholder.com/200'
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetailPage;