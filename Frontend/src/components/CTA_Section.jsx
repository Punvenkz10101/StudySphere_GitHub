import React from "react";
import SigninPage from "./SignInPage";

const CTA_Section = ({ onSignInClick }) => {
  return (
    <div className="bg-[#F2F2F2] py-10 md:py-0 flex flex-col md:flex-row items-center justify-center">
      {/* Adjusted padding */}
      <div className="mx-auto max-w-5xl md:text-left md:w-1/2 px-4 md:px-0">
        <h2 className="text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] font-bold text-[#00334D] animate-fadeIn leading-snug ml-8">
          Transform Your Study Experience with <br /> 
          <span className=" block">StudySphere!</span>
        </h2>

        <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-gray-900 animate-fadeIn ml-8">
          StudySphere is designed to bring the best parts of collaborative
          studying into a convenient virtual space. Break down your study goals,
          manage time effectively, and track your progress with ease. Join
          StudySphere to make studying more productive, connected, and
          enjoyable.
        </p>

        <div className="mt-6 flex flex-col md:flex-row items-start md:justify-start gap-2 ml-12 md:ml-8">
          <button
           onClick={onSignInClick}
            href="#"
            className="rounded-md bg-[#00334D] px-6 py-2 md:px-7 md:py-2 text-[16px] font-semibold text-white shadow-md hover:bg-[#004466] transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
          <a
            href="#features"
            className="rounded-md bg-[#00334D] px-5 py-2 md:px-6 md:py-2 text-[16px] font-semibold text-white hover:bg-[#004466] transition duration-300 transform hover:scale-105"
          >
            Explore Features &rarr;
          </a>
        </div>
      </div>
      <div
        className="mt-6 md:mt-0 md:w-1/2 flex justify-center"
        data-aos="zoom-in"
      >
        <img
          src="/CTA.png"
          alt="Study Room"
          className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] transform transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default CTA_Section;
