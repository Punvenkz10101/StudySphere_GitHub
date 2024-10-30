'use client';
import { useState } from 'react';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Support', href: '#' },
  { name: 'Contact Us', href: '#' },
];

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#003333]">
      <header className="inset-x-0 top-0 z-50 bg-[#003333]">
        <nav aria-label="Global" className="flex items-center justify-between p-4 lg:p-6">
          <div className="flex flex-1 items-center">
            {/* Added margin-right to the company name */}
            <span className="text-white text-[26px] font-bold" style={{ marginLeft: '35px' }}>StudySphere</span> {/* Add margin-right here */}
          </div>
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-[#E0E0E0] transition-colors duration-300 hover:text-[#00CCCC]"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex flex-1 justify-center mr-4"> {/* Search bar remains unchanged */}
            <input
              type="text"
              placeholder="Search for rooms..."
              className="px-4 py-2 rounded-md bg-[#E0E0E0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-300 w-[250px] h-[40px]"
            />
          </div>
          <div className="hidden lg:flex flex-1 justify-end mr-4">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-white bg-[#008080] px-4 py-2 rounded-md transition-colors duration-300 hover:bg-[#006666]"
            >
              Log in
            </a>
          </div>
          <div className="flex lg:hidden ml-4"> {/* Added margin left for spacing */}
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
        {isOpen && (
          <div className="flex flex-col items-center bg-[#003333] lg:hidden p-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-[#E0E0E0] transition-colors duration-300 hover:text-[#00CCCC] my-2"
              >
                {item.name}
              </a>
            ))}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search For Rooms..."
                className="px-4 py-2 rounded-md bg-[#E0E0E0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008080] transition duration-300 w-full max-w-xs"
              />
            </div>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-white bg-[#008080] px-4 py-2 rounded-md transition-colors duration-300 hover:bg-[#006666]"
            >
              Log in  
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
