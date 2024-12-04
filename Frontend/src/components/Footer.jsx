import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-white py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-5 md:space-y-0">
          {/* Logo and Description */}
          <div className="md:w-1/3 text-center md:text-left">
            <h3 className="text-xl md:text-2xl text-[#00334D] font-bold mb-1">
              StudySphere
            </h3>
            <p className="text-[#00334D] text-xs md:text-sm max-w-xs font-semibold">
              Transforming Study Time into Success.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:w-1/3 flex flex-wrap justify-center md:justify-around text-center">
            <div className="space-y-1 md:space-y-2">
              <h4 className="font-semibold text-[#00334D] text-[15px] md:text-[17px]">
                Features
              </h4>
              <ul className="text-[#00334D] text-xs md:text-sm space-y-1 font-normal">
                <li className="transition">Group Study Meet</li>
                <li className="transition">Pomodoro Timer</li>
                <li className="transition">Progress Tracker</li>
              </ul>
            </div>
            {/* Hide Resources on smaller screens */}
            <div className="hidden md:block space-y-1 md:space-y-2 mt-4 md:mt-0">
              <h4 className="font-semibold text-[15px] md:text-[17px] text-[#00334D]">
                Resources
              </h4>
              <ul className="text-[#00334D] text-xs md:text-sm space-y-1 font-normal">
                <li className="transition">Blog</li>
                <li className="transition">FAQ</li>
                <li className="transition">Support</li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="md:w-1/3">
            <div className="grid grid-flow-col gap-6 justify-center md:justify-end">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 md:mt-6 text-center text-[#00334D] text-[11px] md:text-xs font-medium">
          &copy; {new Date().getFullYear()} StudySphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
