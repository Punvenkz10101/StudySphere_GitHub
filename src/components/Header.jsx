// Header.js
import React, { useState } from 'react';

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Support", href: "#" },
  { name: "Contact Us", href: "#" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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
  );
}
