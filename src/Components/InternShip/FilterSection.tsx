// Pages/Internship/FiltersSection.tsx
import React from 'react';
import { Filters } from './types';

const FiltersSection: React.FC<{
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  industries: string[];
  filteredCount: number;
  totalCount: number;
  userLevel: string;
}> = ({
  filters,
  setFilters,
  activeCategory,
  setActiveCategory,
  industries,
  filteredCount,
  totalCount,
  userLevel
}) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold mb-4">Filter Opportunities</h2>
    
    <div className="flex flex-wrap gap-4 mb-6">
      <div>
        <label className="font-medium block mb-2">Location</label>
        <select
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value as any})}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Locations</option>
          <option value="cameroon">Cameroon</option>
          <option value="international">International</option>
        </select>
      </div>
      
      <div>
        <label className="font-medium block mb-2">Experience Level</label>
        <select
          value={filters.level}
          onChange={(e) => setFilters({...filters, level: e.target.value as any})}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="pro">Pro</option>
        </select>
      </div>
      
      <div className="flex-1">
        <label className="font-medium block mb-2">Industry</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All Industries
          </button>
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => setActiveCategory(industry)}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === industry
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>
    </div>
    
    <div className="flex justify-between items-center">
      <p className="text-gray-600">
        Showing {filteredCount} of {totalCount} opportunities
      </p>
      <div className="text-sm text-gray-600">
        <span className="font-medium">Your Level:</span> {userLevel}
      </div>
    </div>
  </div>
);

export default FiltersSection;