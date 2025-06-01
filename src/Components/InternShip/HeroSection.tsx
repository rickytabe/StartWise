// Pages/Internship/HeroSection.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const HeroSection: React.FC<{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}> = ({ searchTerm, setSearchTerm }) => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Internship Opportunities</h1>
      <p className="text-xl max-w-3xl mx-auto mb-10">
        Kickstart your career with internships at top companies in Cameroon and around the world
      </p>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company, role, or industry..."
            className="block w-full pl-10 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;