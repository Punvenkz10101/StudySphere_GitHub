"use client";
import { useState } from "react";

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
    <div className="bg-gradient-to-b from-[#1C1C1C] via-[#003333] to-[#2A2A2A]">
      <header className="inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:p-6"
        >
          {/* Logo */}
          <div className="flex flex-1 items-center">
            <span
              className="text-white text-[26px] font-bold ml-4 transition-transform duration-300 hover:scale-110"
              style={{ marginLeft: "40px" }}
            >
              StudySphere
            </span>
          </div>

          {/* Centered Desktop Navigation Links */}
          <div className="hidden lg:flex justify-center space-x-6 flex-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-[#E0E0E0] hover:text-[#00CCCC] transition-colors duration-300 transform hover:scale-105"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Move Search Bar and Login Button Together */}
          <div className="hidden lg:flex items-center space-x-4 mr-4 ">
            {" "}
            {/* Removed flex-1 */}
            <input
              type="text"
              placeholder="Search for rooms..."
              className="px-4 py-2 w-[250px] h-[40px] bg-[#2A2A2A] text-[#E0E0E0] rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#007373]"
            />
            <a
              href="#"
              className="text-sm font-semibold text-white bg-[#008080] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#006666] hover:shadow-xl transform hover:scale-105"
            >
              Log in
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden ml-4">
            <button
              onClick={toggleMenu}
              className="text-[#E0E0E0] focus:outline-none transition-transform duration-300 transform hover:scale-110"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#003333] p-4 rounded-md shadow-md transition-all duration-300">
            <div className="flex flex-col items-center space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold text-[#E0E0E0] hover:text-[#00CCCC] transition-colors duration-300 transform hover:scale-105"
                >
                  {item.name}
                </a>
              ))}
              <input
                type="text"
                placeholder="Search for rooms..."
                className="w-full max-w-xs px-4 py-2 rounded-md bg-[#2A2A2A] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#007373] transition duration-300 mt-2"
              />
              <a
                href="#"
                className="text-sm font-semibold text-white bg-[#008080] px-4 py-2 rounded-md shadow-lg transition duration-300 hover:bg-[#006666] hover:shadow-xl transform hover:scale-105"
              >
                Log in
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
