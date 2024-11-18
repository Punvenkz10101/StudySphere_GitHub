import React from 'react';

export default function HeroSection({ onCreateRoomClick, onJoinRoomClick }) {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center text-center bg-cover bg-center text-white animate-fadeIn"
      style={{
        backgroundImage: `url("/Hero_Image.jpg")`, // Updated URL for image in the public folder
        backgroundColor: '#001D33',
      }}
    >
      <div className="z-10 space-y-4 px-4">
        <h1 className="text-[45px] sm:text-[59px] font-bold leading-tight">
          Welcome to StudySphere
        </h1>
        <p className="text-[24px] sm:text-[33px] font-medium leading-snug">
          Discover and Connect with Study Rooms
        </p>

        {/* Added margin for space between the text and buttons */}
        <div className="space-x-0 space-y-3 sm:space-x-2 sm:space-y-0">
          <button
            onClick={onCreateRoomClick}
            className="inline-block w-full sm:w-auto px-5 py-3 text-[18px] sm:text-[16px] font-semibold text-white bg-[#00334D] rounded-md shadow-lg transition duration-300 hover:bg-white hover:text-[#00334D] hover:shadow-xl transform hover:scale-105"
          >
            Create Room
          </button>
          <button
            onClick={onJoinRoomClick}  // Open Join Room modal
            className="inline-block w-full sm:w-auto px-5 py-3 text-[18px] sm:text-[16px] font-semibold text-[#00334D] bg-white rounded-md shadow-lg transition duration-300 hover:bg-[#00334D] hover:text-white hover:shadow-xl transform hover:scale-105"
          >
            Join Room
          </button>
        </div>
      </div>
    </section>
  );
}
