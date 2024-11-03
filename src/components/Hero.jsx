// Updated HeroSectionWithHeader component with refined color scheme and positioning

'use client';

import { useState } from 'react';
import backgroundImage from '../assets/Hero_Image.jpg';

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Support", href: "#" },
  { name: "Contact Us", href: "#" },
];

export default function HeroSectionWithHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center flex flex-col animate-fadeIn"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#001D33', // Dark blue-gray overlay for consistency
      }}
    >
      {/* Transparent Header */}
      <header className="absolute top-0 inset-x-0 z-50">
        <nav className="flex items-center justify-between p-4 lg:p-6 bg-opacity-0 bg-[#001122]">
          <div className="flex flex-1 items-center">
            <span className="text-white text-5xl lg:text-[34px] font-bold ml-12 transition-transform duration-300 hover:scale-110 mt-1">
              StudySphere
            </span>
          </div>

          <div className="hidden lg:flex justify-center space-x-8 flex-1 mr-12 mx-auto mt-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-base lg:text-[16px] font-semibold text-white hover:text-[#007A99] transition-colors duration-300 transform hover:scale-105"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4 mr-4 ">
            <input
              type="text"
              placeholder="Search for rooms..."
              className="px-4 py-2 w-[350px] md:w-[350px] h-[44px] md:h-[44px] bg-[#1A1A1A] text-white text-[16px] md:text-[16px] rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#007A99] mt-3"
            />
            <a
              href="#"
              className="text-base md:text-[16px] font-semibold text-white bg-[#00334D] px-4 py-2 md:px-6 md:py-2.5 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105 mt-2"
            >
              Log in
            </a>
          </div>

          <div className="flex lg:hidden ml-4">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none transition-transform duration-300 transform hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </nav>

        {isOpen && (
          <div className="lg:hidden bg-opacity-90 bg-[#001122] p-4 rounded-md shadow-md transition-all duration-300">
            <div className="flex flex-col items-center space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-semibold text-[#CCCCCC] hover:text-[#00B2A9] transition-colors duration-300 transform hover:scale-105"
                >
                  {item.name}
                </a>
              ))}
              <input
                type="text"
                placeholder="Search for rooms..."
                className="w-full max-w-xs px-4 py-2 rounded-md bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00CCCC] transition duration-300 mt-2"
              />
              <a
                href="#"
                className="text-base font-semibold text-white bg-[#00334D] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#004466] hover:shadow-xl transform hover:scale-105"
              >
                Log in
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center text-center flex-grow text-white z-10 space-y-1 pt-35 md:pt-35 animate-slideUp"> {/* Adjusted padding to move up */}
        <h1 className="text-[60px] md:text-[60px] font-bold">Welcome to StudySphere</h1>
        <p className="text-[33px] md:text-[33px] font-medium">Discover and Connect with Study Rooms</p>

        <div className="space-x-4 relative" style={{ top: '25px' }}>
          <a
            href="#"
            className="inline-block px-8 py-3.5 text-[16px] md:text-[16px] font-semibold text-white bg-[#00334D] rounded-md shadow-lg transition duration-300 hover:bg-white hover:text-[#00334D] hover:shadow-xl transform hover:scale-105"
          >
            Create Room
          </a>
          <a
            href="#"
            className="inline-block px-8 py-3.5 text-[16x] md:text-[16px] font-semibold text-[#00334D] bg-white rounded-md shadow-lg transition duration-300 hover:bg-[#00334D] hover:text-white hover:shadow-xl transform hover:scale-105"
          >
            Join Room
          </a>
      </div>
    </div>
    </section >
  );
}
