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

  const navigation = [
    { name: "Product", href: "#" },
    { name: "Features", href: "#" },
    { name: "Support", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="flex items-center justify-between p-4 md:p-6 bg-[#001022]/45 backdrop-blur-sm shadow-lg">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-4 ml-6 flex-none">
          <span className="text-white text-3xl md:text-5xl lg:text-[34px] font-bold transition-transform duration-300 hover:scale-110 mt-1 ml-3.5">
            StudySphere
          </span>
        </div>

        {/* Navigation Links and Search Bar for Desktop */}
        <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center mx-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105 ml-6"
            >
              {item.name}
            </a>
          ))}
          <input
            type="text"
            placeholder="Search for rooms..."
            className="px-3 md:px-4 py-2 w-[280px] md:w-[340px] h-[40px] md:h-[44px] bg-[#1A1A1A]/80 text-white text-sm md:text-[16px] rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#007A99]"
          />
        </div>

        {/* Login and Sign Out Section */}
        <div className="hidden lg:flex items-center mr-6 space-x-4">
          {user ? (
            <>
              <div
                className="w-12 h-12 rounded-full bg-[#00334D] text-white flex items-center justify-center font-semibold text-lg mr-2"
                title={user.email}
              >
                {userNameInitial}
              </div>
              <button
                onClick={onSignOut}
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-7 py-2 md:py-[11px] rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105 "
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                style={{ marginLeft: '16px' }}  // Inline style to move this button only
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-7 py-2 md:py-[11px] rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105"
              >
                Log in
              </button>
              <button
                onClick={onSignUpClick}
                style={{ marginLeft: '8px' }}  // Inline style to move this button only
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-3 md:px-7 py-2 md:py-[11px] rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105"
              >
                Create an Account
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white text-2xl mr-4">
            <FaBars />
          </button>
          {user && (
            <div
              className="w-10 h-10 rounded-full bg-[#00334D] text-white flex items-center justify-center font-semibold text-lg"
              title={user.email}
            >
              {userNameInitial}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu for smaller screens */}
      {menuOpen && (
        <div className="lg:hidden bg-[#001022]/85 backdrop-blur-md p-4 rounded-b-md shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-base font-semibold text-white hover:text-[#00B2A9] transition-colors duration-300 transform hover:scale-105"
              >
                {item.name}
              </a>
            ))}
            <input
              type="text"
              placeholder="Search for rooms..."
              className="w-full max-w-xs px-4 py-2 rounded-md bg-[#1A1A1A]/80 text-white focus:outline-none focus:ring-2 focus:ring-[#00CCCC] transition duration-300 mt-2"
            />
            {user ? (
              <button
                onClick={onSignOut}
                className="w-full text-base font-semibold text-white bg-[#00334D] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] transform hover:scale-105"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="w-full text-base font-semibold text-white bg-[#00334D] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] transform hover:scale-105"
                >
                  Log in
                </button>
                <button
                  onClick={onSignUpClick}
                  className="w-full text-base font-semibold text-white bg-[#00334D] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] transform hover:scale-105"
                >
                  Create an Account
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
