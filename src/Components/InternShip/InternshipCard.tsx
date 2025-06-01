// Pages/Internship/InternshipCard.tsx
import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUserGraduate, FaClock } from 'react-icons/fa';
import { Internship } from './types';
import Button from '../shared/Button';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const InternshipCard: React.FC<{ internship: Internship }> = ({ internship }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]`}>
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            {internship.logo ? (
              <img 
                src={internship.logo} 
                alt={internship.company} 
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <FaBuilding className="text-gray-400 text-2xl" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">{internship.company}</h3>
            <p className="text-gray-600">{internship.industry}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2 text-blue-600" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <FaUserGraduate className="mr-2 text-blue-600" />
            <span className="capitalize">{internship.level} level</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <FaClock className="mr-2 text-blue-600" />
            <span>{internship.duration}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Available Roles:</h4>
          <div className="flex flex-wrap gap-2">
            {internship.roles.map((role, idx) => (
              <span 
                key={idx} 
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{internship.description}</p>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Application Deadline:</h4>
          <div className={`px-3 py-1 rounded-full inline-block ${
            new Date(internship.applicationDeadline) > new Date()
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {formatDate(internship.applicationDeadline)}
          </div>
        </div>
        
        <Button variant="primary" className="w-full">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default InternshipCard;