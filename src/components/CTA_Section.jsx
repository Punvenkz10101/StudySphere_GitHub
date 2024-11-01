// CTA.js
import React from 'react';

const CTA_Section = () => {
  return (
    <div className="bg-[#F2F2F2] py-40 flex flex-col md:flex-row items-center justify-center"style={{ paddingTop: '0px', paddingBottom: '0px' }}> {/* Flex layout for responsiveness */}
      <div className="mx-auto max-w-7xl md:text-left md:w-1/2"> 
      <h2 className="text-2xl md:text-[44px] font-bold text-[#00334D] sm:text-5xl animate-fadeIn mt-[-20px] ml-7 inline-block leading-tight px-1">
  Transform Your Study Experience with StudySphere!
</h2>


        <p className="mt-4 text-[21px] text-gray-900 animate-fadeIn ml-8">
        StudySphere is designed to bring the best parts of collaborative studying into a convenient virtual space. Break down your study goals, manage time effectively, and track your progress with ease. Join StudySphere and let us help you make studying more productive, connected, and enjoyable.        </p>
        <div className="mt-7 flex flex-col md:flex-row justify-center md:justify-start gap-3 ml-24">
          <a
            href="#"
            className="rounded-md bg-[#00334D] px-9 py-3 text-[17px] font-semibold text-white shadow-md hover:bg-[#004466] transition duration-300 transform hover:scale-105 md-3"
          >
            Sign Up
          </a>
          <a
            href="#"
            className="rounded-md bg-[#00334D]  border-gray-300 px-6 py-3 text-[17px] font-semibold text-white hover:bg-[#004466] transition duration-300 transform hover:scale-105"
          >
            Explore Features &rarr;
          </a>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center ml-6"> {/* Right section for the image */}
        <img 
          src="src\assets\image (1).png" // Replace with the actual image path
          alt="Study Room"
          className="max-w-[500px] transform transition-transform duration-300 hover:scale-105" // Reduced size and added hover effect
        />
      </div>
    </div>
  );
};

export default CTA_Section;
