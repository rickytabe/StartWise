
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ValuePropositionSection = () => {
  const mentors = [
    {
      id: 1,
      name: "Mr John Tembu",
      role: "Senior Product Manager",
      badges: ["Domain Switch", "Placed at MAANG"],
      image: "https://i.pinimg.com/736x/41/72/6f/41726fc8d08b304bc6689718fa12f363.jpg"
    },
    {
      id: 2,
      name: "Mbu Williams",
      role: "Lead Data Scientist",
      badges: ["Career Accelerator", "Talk to Me"],
      image: "https://i.pinimg.com/736x/d8/6f/96/d86f96a09d7dc681f85401eb95b1abdf.jpg"
    },
    {
      id: 3,
      name: "Michaella Ngeh",
      role: "UX Design Director",
      badges: ["Domain Switch", "Placed at MAANG"],
      image: "https://i.pinimg.com/736x/0b/2e/98/0b2e988dcec7af0209aa42d919c6967b.jpg"
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Software Engineering Lead",
      badges: ["Career Accelerator", "Talk to Me"],
      image: "https://i.pinimg.com/736x/54/e1/79/54e179e04db25cba8035d3bcc5e5f216.jpg"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-gray-900 py-16 px-4">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl max-w-6xl mx-auto p-8 text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
          Move Over traditional courses – Start Making Progress with <br className="hidden md:block" />
          <span className="bg-white text-blue-700 px-4 py-1 rounded-full inline-block mt-3">
            1:1 Long Term Mentorship
          </span>
        </h2>
      </div>

      {/* Value Proposition Metrics */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-2xl p-6 relative overflow-hidden">
            <span className="absolute -top-8 -right-8 text-[120px] font-bold text-gray-700 opacity-50">30</span>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-2">30% Cheaper</h3>
              <p className="text-blue-300">Compared to any other Platform</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-6 relative overflow-hidden">
            <span className="absolute -top-8 -right-8 text-[120px] font-bold text-gray-700 opacity-50">4x</span>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-2">4x Results</h3>
              <p className="text-blue-300">Compared to any online MentorShip</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-6 relative overflow-hidden">
            <span className="absolute -top-8 -right-8 text-[120px] font-bold text-gray-700 opacity-50">50</span>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-2">50% Faster</h3>
              <p className="text-blue-300">Get a InternShip Opportunities with our Top Partners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Testimonials */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-white text-center mb-12">
          Check out our Top Mentors
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl transform transition-transform hover:scale-105">
              <div className="relative">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <FaPlay className="ml-1" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-white">{mentor.name}</h4>
                    <p className="text-blue-300">{mentor.role}</p>
                  </div>
                  <Link to="/explore-mentors" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <FaArrowRight />
                  </Link>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.badges.map((badge, index) => (
                    <span 
                      key={index} 
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        badge === "Talk to Me" 
                          ? "bg-green-600 text-white"
                          : badge === "Placed at MAANG" 
                            ? "bg-yellow-600 text-gray-900"
                            : "bg-purple-600 text-white"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-blue-700 hover:to-blue-900 transition-all">
            See More Success Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValuePropositionSection;