import React from 'react';
import { FaBrain } from 'react-icons/fa';

const LoadingScreen: React.FC = () => {
  return (
    <div className='max-h-screen'>
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-600">
        <FaBrain className="text-white text-6xl animate-bounce mb-4" />
        <div className="text-4xl font-bold text-white relative">
          <span className="animate-pulse">S</span>
          <span className="animate-pulse" style={{ animationDelay: '0.1s' }}>t</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>a</span>
          <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>r</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>t</span>
          <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>W</span>
          <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>i</span>
          <span className="animate-pulse" style={{ animationDelay: '0.7s' }}>s</span>
          <span className="animate-pulse" style={{ animationDelay: '0.8s' }}>e</span>
        </div>
        <div className="mt-4">
          <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;