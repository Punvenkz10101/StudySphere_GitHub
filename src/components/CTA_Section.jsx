// CTA.js
import React from 'react';

const CTA_Section = () => {
  return (
    <div id='Signin' className="bg-[#F2F2F2] py-3md:py-10 flex flex-col md:flex-row items-center justify-center"> 
      <div className="mx-auto max-w-6xl md:text-left md:w-1/2 px-4 md:px-0">
        <h2 className="text-xl md:text-3xl lg:text-[38px] font-bold text-[#00334D] sm:text-4xl animate-fadeIn mt-[-10px] leading-snug ml-5">
          Transform Your Study Experience with StudySphere!
        </h2>

        <p className="mt-3 text-[18px] md:text-[20px] text-gray-900 animate-fadeIn ml-5">
          StudySphere is designed to bring the best parts of collaborative studying into a convenient virtual space. Break down your study goals, manage time effectively, and track your progress with ease. Join StudySphere to make studying more productive, connected, and enjoyable.
        </p>

        <div className="mt-5 flex flex-col md:flex-row justify-center md:justify-start gap-2 ml-28">
          <a
            href="#"
            className="rounded-md bg-[#00334D] px-6 py-2 md:px-8 md:py-3 text-[16px] font-semibold text-white shadow-md hover:bg-[#004466] transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </a>
          <a
            href="#"
            className="rounded-md bg-[#00334D] px-5 py-2 md:px-7 md:py-3 text-[16px] font-semibold text-white hover:bg-[#004466] transition duration-300 transform hover:scale-105"
          >
            Explore Features &rarr;
          </a>
        </div>
      </div>

      <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
        <img 
          src="src/assets/image (1).png" // Replace with the actual image path
          alt="Study Room"
          className="w-[300px] md:w-[400px] lg:w-[450px] transform transition-transform duration-300 hover:scale-105" // Reduced size for better responsiveness
        />
      </div>
    </div>
  );
};

export default CTA_Section;
