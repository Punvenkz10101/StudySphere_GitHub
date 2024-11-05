import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-white py-5"> {/* Reduced padding here */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          {/* Logo and Description */}
          <div className="md:w-1/3 text-center md:text-left">
            <h3 className="text-3xl text-[#00334D] font-bold mb-1">StudySphere</h3>
            <p className="text-[#00334D] text-base max-w-xs font-semibold">
            Transforming Study Time into Success.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:w-1/3 flex flex-wrap justify-center md:justify-around text-center">
            <div className="space-y-2">
              <h4 className="font-semibold text-[#00334D] text-[18px]">Features</h4>
              <ul className="text-[#00334D] text-base space-y-1 font-normal">
                <li className="text-[#00334D] transition">Group Study Meet</li>
                <li className="text-[#00334D] transition">Pomodoro Timer</li>
                <li className="text-[#00334D] transition">Progress Tracker</li>
              </ul>
            </div>
            <div className="space-y-2 mt-4 md:mt-0">
              <h4 className="font-semibold  text-[18px] text-[#00334D] ">Resources</h4>
              <ul className="text-[#00334D] text-base space-y-1 font-normal">
                <li className="text-[#00334D] transition">Blog</li>
                <li className="text-[#00334D] transition">FAQ</li>
                <li className="text-[#00334D] transition">Support</li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="md:w-1/3 flex justify-center md:justify-end space-x-4">
            <a href="#" className="p-2 rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-[#00334D] text-sm font-medium">
          &copy; {new Date().getFullYear()} StudySphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
