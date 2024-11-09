import React from 'react';

const Header = ({ onLoginClick, onSignUpClick, user, onSignOut }) => {
  // Get user's display name or fallback to email
  const userName = user ? user.displayName || user.email.split('@')[0] : null; // Extract username from email if displayName is null

  return (
    <header className="fixed top-0 z-50 w-full max-w-full">
      <nav className="flex items-center justify-between p-4 md:p-6 bg-[#001022]/45 backdrop-blur-sm bg-red-800 shadow-lg overflow-x-hidden">
        <div className="flex items-center flex-1">
          <span className="text-white text-3xl md:text-5xl lg:text-[34px] font-bold ml-4 md:ml-12 transition-transform duration-300 hover:scale-110 mt-1">
            StudySphere
          </span>
        </div>

        <div className="hidden lg:flex justify-center space-x-4 lg:space-x-8 flex-1 mx-auto mt-2">
          <a className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105">
            Product
          </a>
          <a className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105">
            Features
          </a>
          <a className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105">
            Support
          </a>
          <a className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105">
            Contact Us
          </a>
        </div>

        <div className="hidden lg:flex items-center space-x-2 md:space-x-4 mr-4">
          {user ? (
            <>
              {/* Display the user's name (or email if displayName is unavailable) */}
              <span className="text-white font-semibold text-lg">{userName}</span>
              <button
                onClick={onSignOut}
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-6 py-2 md:py-2.5 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105 mt-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-6 py-2 md:py-2.5 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105 mt-2"
              >
                Log in
              </button>
              <button
                onClick={onSignUpClick}
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-6 py-2 md:py-2.5 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105 mt-2"
              >
                Create an Account
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;



