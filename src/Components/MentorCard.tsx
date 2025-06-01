import React from 'react';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Mentor } from '../types/mock';

interface MentorCardProps {
  mentor: Mentor;
  showTopBadge?: boolean;
  showNearBadge?: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({ 
  mentor, 
  showTopBadge = false, 
  showNearBadge = false 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex items-start">
          <img 
            src={mentor.profileImage} 
            alt={mentor.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4 flex-1">
            <div className="flex justify-between">
              <div>
                {showTopBadge && (
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200 mb-1">
                    Top Mentor
                  </span>
                )}
                {showNearBadge && (
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mb-1">
                    Near You
                  </span>
                )}
                <h3 className="font-bold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.title}</p>
              </div>
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 h-10 rounded text-sm">
                <FaStar className="mr-1" /> {mentor.rating}
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {mentor.skills.map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                <span 
                  key={idx} 
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-blue-600" />
            <span className="text-sm truncate">{mentor.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 text-blue-600" />
            <span className="text-sm">{mentor.availability}</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {mentor.price.toLocaleString()} XAF
            </div>
            <div className="text-sm text-gray-600">per session</div>
          </div>
          <Link 
            to={`/mentor/${mentor.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;