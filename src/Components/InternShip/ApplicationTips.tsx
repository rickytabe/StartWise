// Pages/Internship/ApplicationTips.tsx
import React from 'react';

const ApplicationTips: React.FC = () => (
  <div className="mt-16">
    <h2 className="text-2xl font-bold mb-6">Internship Application Tips For You</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          1
        </div>
        <h3 className="font-bold mb-2">Tailor Your Resume</h3>
        <p className="text-gray-600">
          Customize your resume for each application to highlight relevant skills and experiences.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          2
        </div>
        <h3 className="font-bold mb-2">Write a Strong Cover Letter</h3>
        <p className="text-gray-600">
          Explain why you're interested in the specific company and role, and what you can contribute.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          3
        </div>
        <h3 className="font-bold mb-2">Prepare for Interviews</h3>
        <p className="text-gray-600">
          Research the company and practice answering common internship interview questions.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          4
        </div>
        <h3 className="font-bold mb-2">Showcase Projects</h3>
        <p className="text-gray-600">
          Create a portfolio of projects that demonstrate your skills and passion for the field.
        </p>
      </div>
    </div>
  </div>
);

export default ApplicationTips;
