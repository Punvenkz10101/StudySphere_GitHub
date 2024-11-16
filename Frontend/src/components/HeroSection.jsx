// frontend/components/HeroSection.jsx
import React from 'react';
import backgroundImage from '../assets/Images/HomePage/Hero_Image.jpg';

export default function HeroSection({ onCreateRoomClick, onJoinRoomClick }) {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center text-center bg-cover bg-center text-white animate-fadeIn"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#001D33',
      }}
    >
      <div className="z-10 space-y-1">
        <h1 className="text-[59px] font-bold">Welcome to StudySphere</h1>
        <p className="text-[33px] font-medium">Discover and Connect with Study Rooms</p>

        <div className="space-x-2 space-y-2 mt-6">
          <button
            onClick={onCreateRoomClick}
            className="inline-block px-7 py-3 text-[16px] font-semibold text-white bg-[#00334D] rounded-md shadow-lg transition duration-300 hover:bg-white hover:text-[#00334D] hover:shadow-xl transform hover:scale-105"
          >
            Create Room
          </button>
          <button
            onClick={onJoinRoomClick}  // Open Join Room modal
            className="inline-block px-7 py-3 text-[16px] font-semibold text-[#00334D] bg-white rounded-md shadow-lg transition duration-300 hover:bg-[#00334D] hover:text-white hover:shadow-xl transform hover:scale-105"
          >
            Join Room
          </button>
        </div>
      </div>
    </section>
  );
}
