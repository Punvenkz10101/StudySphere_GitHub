import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const Header = ({ onLoginClick, onSignUpClick, user, onSignOut }) => {
const navigate =useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef=useRef(null);

  const userNameInitial = user
    ? (user.displayName ? user.displayName[0] : user.email[0]).toUpperCase()
    : null;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if(menuRef.current && !menuRef.current.contains(event.target)){
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleNavigate = (path, href) => {
    if (href.startsWith("#")) {
      if (window.location.pathname === "/") {
        // If on the home page, scroll to the section
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to the home page first, then scroll
        navigate(path);
        setTimeout(() => {
          const section = document.querySelector(href);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Slight delay to allow the DOM to load
      }
    } else {
      // For normal navigation
      navigate(path);
    }
    setMenuOpen(false);
  };
  
  const navigation = [

    { name: "Home", path:"/",href:'#Home' },
    { name: "Features", path:"/",href:'#features' },
    { name: "Contact Us", path:"/contact-us",href:'contactus'},

  ];
  const pagehandler= ()=>{
    navigate('/')

  }
  return (
    <header  className="fixed top-0 z-50 w-full">
      <nav className="flex items-center justify-between p-4 md:p-6 bg-[#001022]/45 backdrop-blur-sm shadow-lg h-[88px]">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-4 ml-6 flex-none">
          <span  onClick={pagehandler} className="text-white text-[30px] md:text-[32px] lg:text-[34px] cursor-pointer font-bold transition-transform duration-300 hover:scale-110 mt-1 ml-3.5">
            StudySphere
          </span>
        </div>

        {/* Navigation Links and Search Bar for Desktop */}
        <div className="hidden lg:flex items-center space-x-9 flex-1 justify-center -ml-20">
          {navigation.map((item) => (
             <button
             key={item.name}
             onClick={() => handleNavigate(item.path, item.href)}
             className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105"
           >
             {item.name}
           </button>
          ))}

        </div>

        {/* User Icon and Dropdown */}
        <div className="relative hidden lg:flex items-center space-x-4 mr-8">
          {user ? (
            <div className="relative">
              {/* User Icon */}
              <div
                className="w-12 h-12 rounded-full bg-[#00334D] text-white flex items-center justify-center font-semibold text-lg cursor-pointer"
                onClick={toggleDropdown}
                title={user.email}
              >
                {userNameInitial}
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-64 bg-[#1A1A1A] rounded-lg shadow-xl py-4 z-50 border border-gray-700"
                >
                  <div className="px-4 py-2 text-[#E6E6E6] text-lg font-semibold border-b border-gray-600">
                    <div>{user.displayName || "User"}</div>
                    <div className="text-sm text-gray-400 truncate max-w-full">{user.email}</div>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="w-full px-4 py-2 text-left text-[#FF4D4F] font-semibold text-base hover:bg-[#3A3A3A] transition-colors duration-300 mt-2"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105"
              >
                Log in
              </button>
              <button
                onClick={onSignUpClick}
                className="text-sm md:text-[16px] font-semibold text-white bg-[#00334D]/80 px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105"
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
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full bg-[#00334D] text-white flex items-center justify-center font-semibold text-lg cursor-pointer"
              title={user.email}
            >
              {userNameInitial}
            </div>
          )}
          {showDropdown && user && (
            <div
              ref={dropdownRef}
              className="absolute right-4 top-20 w-64 bg-[#1A1A1A] rounded-lg shadow-xl py-4 z-50 border border-gray-700"
            >
              <div className="px-4 py-2 text-[#E6E6E6] text-lg font-semibold border-b border-gray-600">
                <div>{user.displayName || "User"}</div>
                <div className="text-sm text-gray-400 truncate max-w-full">{user.email}</div>
              </div>
              <button
                onClick={onSignOut}
                className="w-full px-4 py-2 text-left text-[#FF4D4F] font-semibold text-base hover:bg-[#3A3A3A] transition-colors duration-300 mt-2"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu for smaller screens */}
      {menuOpen && (
        <div className="lg:hidden bg-[#001022]/85 backdrop-blur-md p-4 rounded-b-md shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            {navigation.map((item) => (
             <button
             key={item.name}
             onClick={() => handleNavigate(item.path)}
             className="text-base font-semibold text-white hover:text-[#00B2A9] transition-colors duration-300 transform hover:scale-105"
           >
             <a href={item.href}> {item.name}</a>

           </button>
            ))}
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
