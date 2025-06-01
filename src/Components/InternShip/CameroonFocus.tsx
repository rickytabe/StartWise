// Pages/Internship/CameroonFocus.tsx
import React from 'react';

const CameroonFocus: React.FC = () => (
  <div className="mt-16 bg-blue-50 rounded-xl p-8">
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">Why Intern in Cameroon?</h2>
        <p className="text-gray-700 mb-4">
          Cameroon offers unique opportunities to gain hands-on experience in emerging markets while contributing to local economic development.
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            Understand local business practices and challenges
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            Build professional networks within Cameroon
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            Contribute to the growth of local industries
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            Gain unique cultural experiences
          </li>
        </ul>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
          Cameroon Map Illustration
        </div>
      </div>
    </div>
  </div>
);

export default CameroonFocus;