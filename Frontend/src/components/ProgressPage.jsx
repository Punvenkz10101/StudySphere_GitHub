import React from 'react';
import { useLocation } from 'react-router-dom';

const ProgressPage = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isStandalone = location.pathname === '/progress';

  if (!isStandalone && !isOpen) return null;

  const content = (
    <div className="bg-[#001022]/50 p-4 sm:p-6 rounded-xl w-[95%] sm:w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Progress Made So far</h1>
        {!isStandalone && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="bg-[#001022]/50 p-3 sm:p-4 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">Study Progress</h2>
          <div className="text-sm sm:text-base text-gray-300">
            <p>Total Study Sessions: 0</p>
            <p>Total Study Time: 0h 0m</p>
          </div>
        </div>
        
        <div className="bg-[#001022]/50 p-3 sm:p-4 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">Exercise Progress</h2>
          <div className="text-sm sm:text-base text-gray-300">
            <p>Total Exercise Sessions: 0</p>
            <p>Total Exercise Time: 0h 0m</p>
          </div>
        </div>
        
        <div className="bg-[#001022]/50 p-3 sm:p-4 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">Reading Progress</h2>
          <div className="text-sm sm:text-base text-gray-300">
            <p>Total Reading Sessions: 0</p>
            <p>Total Reading Time: 0h 0m</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-[#001022]/50 p-3 sm:p-4 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">Meditation Progress</h2>
          <div className="text-sm sm:text-base text-gray-300">
            <p>Total Meditation Sessions: 0</p>
            <p>Total Meditation Time: 0h 0m</p>
          </div>
        </div>
        
        <div className="bg-[#001022]/50 p-3 sm:p-4 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">Break Progress</h2>
          <div className="text-sm sm:text-base text-gray-300">
            <p>Total Break Sessions: 0</p>
            <p>Total Break Time: 0h 0m</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isStandalone) {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{
          backgroundImage: `url('/Night5.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {content}
    </div>
  );
};

export default ProgressPage; 