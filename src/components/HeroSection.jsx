// HeroSection.js
import React from 'react';
import backgroundImage from '../assets/Hero_Image.jpg';

export default function HeroSection() {
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
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center text-center flex-grow text-white z-10 space-y-1 pt-35 md:pt-35 animate-slideUp">
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
    </section>
  );
}
