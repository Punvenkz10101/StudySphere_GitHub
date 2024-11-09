import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Header = ({ onLoginClick, onSignUpClick, user, onSignOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userNameInitial = user
    ? (user.displayName ? user.displayName[0] : user.email[0]).toUpperCase()
    : null;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="absolute top-0 z-50 w-full max-w-full">
      <nav className="flex items-center justify-center p-4 md:p-6 bg-[#001022]/45 backdrop-blur-sm shadow-lg">
        <div className="flex items-center justify-between flex-1 max-w-screen-xl w-full">
          <span className="text-white text-3xl md:text-5xl lg:text-[34px] font-bold ml-4 md:ml-12 transition-transform duration-300 hover:scale-110 mt-1">
            StudySphere
          </span>

          {/* Menu Items and Search Bar for screens larger than 1000px */}
          <div className="hidden xl:flex justify-center items-center space-x-8 flex-1 mx-auto mt-2">
            <a className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105 whitespace-nowrap">
              Product
            </a>
            <a className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105 whitespace-nowrap">
              Features
            </a>
            <a className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105 whitespace-nowrap">
              Support
            </a>
            <a className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105 whitespace-nowrap">
              Contact Us
            </a>
            <input
              type="text"
              placeholder="Search for rooms"
              className="bg-[#001A33] text-white text-base lg:text-[16px] font-semibold px-4 py-2 rounded-md shadow-inner placeholder-white focus:outline-none focus:ring-2 focus:ring-[#007A99] mr-6"
            />
          </div>

          {/* Circular Avatar and Signout Button for Larger Screens */}
          <div className="hidden xl:flex items-center space-x-4 md:space-x-6 mr-4">
            {user && (
              <div
                className="w-10 h-10 rounded-full bg-[#00334D] text-white flex items-center justify-center font-semibold text-lg"
                title={user.email} // Tooltip for email on hover
              >
                {userNameInitial}
              </div>
            )}
            {user ? (
              <button
                onClick={onSignOut}
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-6 py-2 md:py-2.5 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-6 py-2 md:py-2.5 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105"
                >
                  Log in
                </button>
                <button
                  onClick={onSignUpClick}
                  className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-6 py-2 md:py-2.5 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105"
                >
                  Create an Account
                </button>
              </>
            )}
          </div>

          {/* Hamburger icon and avatar for small screens (less than 1000px) */}
          <div className="xl:hidden flex items-center space-x-4 mr-4">
            <button onClick={toggleMenu} className="text-white text-2xl">
              <FaBars />
            </button>
            {user && (
              <div
                className="w-10 h-10 rounded-full bg-[#00334D] text-white flex items-center justify-center font-semibold text-lg"
                title={user.email} // Tooltip for email on hover
              >
                {userNameInitial}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu with conditional rendering for screens smaller than 1000px */}
      {menuOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full bg-[#001022] p-6 rounded-md shadow-lg z-40">
          <a className="block text-base font-semibold text-white mb-4 hover:text-[#007A99] transition-colors duration-300">
            Product
          </a>
          <a className="block text-base font-semibold text-white mb-4 hover:text-[#007A99] transition-colors duration-300">
            Features
          </a>
          <a className="block text-base font-semibold text-white mb-4 hover:text-[#007A99] transition-colors duration-300">
            Support
          </a>
          <a className="block text-base font-semibold text-white mb-4 hover:text-[#007A99] transition-colors duration-300">
            Contact Us
          </a>
          <input
            type="text"
            placeholder="Search for rooms"
            className="w-full bg-[#001A33] text-white text-base font-semibold px-4 py-2 mb-4 rounded-md shadow-inner placeholder-white focus:outline-none focus:ring-2 focus:ring-[#007A99]"
          />
          {user ? (
            <button
              onClick={onSignOut}
              className="w-full text-base font-semibold text-white bg-[#00334D] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466]"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="w-full mb-2 text-base font-semibold text-white bg-[#00334D] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466]"
              >
                Log in
              </button>
              <button
                onClick={onSignUpClick}
                className="w-full text-base font-semibold text-white bg-[#00334D] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466]"
              >
                Create an Account
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
