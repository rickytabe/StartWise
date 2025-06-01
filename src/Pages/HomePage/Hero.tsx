import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const trustItems = [
    "No Payment Required",
    "Verified Mentors Only",
    "Reschedule Anytime",
  ];

  return (
    <section className="w-full bg-blue-100 py-12 md:py-20 px-4 flex flex-col items-center">
      <div className="max-w-3xl text-center">
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Empowering <span className="text-green-700">Cameroonian Youth</span> 
          <br /> with Accelerated Mentorship on{" "}
          <span className="text-blue-600">StartWise</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of young Cameroonians on a journey to fast-track your career, 
          gain skills, and connect with verified mentors committed to your success.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Book a Free Trial
          </button>
          <Link
            to="/explore-mentors"
            className="px-6 py-3 bg-black text-white rounded-md flex items-center justify-center hover:bg-blue-800 transition-colors"
          >
            Find Your Mentor
            <span className="ml-2 animate-ping">→</span>
          </Link>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-gray-800">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-green-700 mr-2 font-bold">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
