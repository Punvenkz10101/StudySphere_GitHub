import React , {useRef}from 'react';
import Typed from 'typed.js';

export default function HeroSection({ onCreateRoomClick, onJoinRoomClick }) {
  const el = useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['An Awesome Learning Experience','Discover and Connect with Study Rooms'],
      typeSpeed: 60,
      backSpeed: 60, 
     
    });

    return () => {
   
      typed.destroy();
    };
  }, []);
  return (

    <section 
    id='home'  
    className="relative h-screen flex flex-col items-center justify-center text-center bg-cover bg-center text-white animate-fadeIn"



      style={{
        backgroundImage: `url("/Hero_Image.jpg")`,
        backgroundColor: '#001D33',
      }}
    >
      <div className="z-10 space-y-4 sm:space-y-6 max-w-4xl">
        <h1 className="text-[40px] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Welcome to StudySphere
        </h1>
        <p ref={el} className="text-xl sm:text-2xl md:text-3xl font-medium leading-snug">
          {/* Typed.js content */}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onCreateRoomClick}
            className="w-[70%] sm:w-auto px-6 py-3 text-lg sm:text-base font-semibold text-white bg-[#00334D] rounded-md shadow-lg transition duration-300 hover:bg-white hover:text-[#00334D] hover:shadow-xl transform hover:scale-105"
          >
            Create Room
          </button>
          <button
            onClick={onJoinRoomClick}
            className="w-[70%] sm:w-auto px-6 py-3 text-lg sm:text-base font-semibold text-[#00334D] bg-white rounded-md shadow-lg transition duration-300 hover:bg-[#00334D] hover:text-white hover:shadow-xl transform hover:scale-105"
          >
            Join Room
          </button>
        </div>
      </div>
    </section>
  );
}
