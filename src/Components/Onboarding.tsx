
import { FaSearch, FaCalendarCheck, FaUserFriends, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OnboardingSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Find Your Ideal Mentor",
      description: "Browse from 500+ vetted mentors and choose your ideal mentor according to your preferences and aspirations.",
      buttonText: "Find Your Mentor",
      icon: <FaSearch className="text-2xl" />
    },
    {
      number: 2,
      title: "Book a FREE Trial Session",
      description: "Connect with a mentor and see how they'll help you achieve your goals faster without needing referrals.",
      buttonText: "Book a FREE Trial",
      icon: <FaCalendarCheck className="text-2xl" />
    },
    {
      number: 3,
      title: "Start 1:1 Long Term Mentorship",
      description: "Boost skill depth with personalized mentorship in the right direction with a mentor of your choice.",
      buttonText: "Start Preparing",
      icon: <FaUserFriends className="text-2xl" />
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Started in 3 Easy Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these three simple steps to begin your journey with Long Term Mentorship
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Step Number Badge */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  {step.number}
                </div>
                <div className="ml-4 text-blue-600">
                  {step.icon}
                </div>
              </div>
              
              {/* Step Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              
              {/* Step Description */}
              <p className="text-gray-600 mb-6 flex-grow">{step.description}</p>
              
              {/* Call-to-Action Button */}
              <Link to="/explore-mentors" className="flex items-center justify-between group w-full max-w-[250px] py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all">
                <span>{step.buttonText}</span>
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <Link to='/explore-mentors' className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-8 rounded-full text-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg">
            Begin Your Mentorship Journey
          </Link>
          <p className="text-gray-600 mt-4 text-sm">
            Join <span className='text-blue-600'>Hundreds</span> of learners who have transformed their careers with our mentorship program
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSteps;