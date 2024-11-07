import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
          <a href="#contact" className="hover:underline">Contact Us</a>
=======
    <footer className="bg-white text-white py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-5 md:space-y-0">
          
          {/* Logo and Description */}
          <div className="md:w-1/3 text-center md:text-left">
            <h3 className="text-xl md:text-2xl text-[#00334D] font-bold mb-1">StudySphere</h3>
            <p className="text-[#00334D] text-xs md:text-sm max-w-xs font-semibold">
              Transforming Study Time into Success.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:w-1/3 flex flex-wrap justify-center md:justify-around text-center">
            <div className="space-y-1 md:space-y-2">
              <h4 className="font-semibold text-[#00334D] text-[15px] md:text-[17px]">Features</h4>
              <ul className="text-[#00334D] text-xs md:text-sm space-y-1 font-normal">
                <li className="transition">Group Study Meet</li>
                <li className="transition">Pomodoro Timer</li>
                <li className="transition">Progress Tracker</li>
              </ul>
            </div>
            {/* Hide Resources on smaller screens */}
            <div className="hidden md:block space-y-1 md:space-y-2 mt-4 md:mt-0">
              <h4 className="font-semibold text-[15px] md:text-[17px] text-[#00334D]">Resources</h4>
              <ul className="text-[#00334D] text-xs md:text-sm space-y-1 font-normal">
                <li className="transition">Blog</li>
                <li className="transition">FAQ</li>
                <li className="transition">Support</li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="md:w-1/3 flex justify-center md:justify-end space-x-2 md:space-x-3">
            <a href="#" className="p-1.5 md:p-1.5 rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md">
              <FaFacebookF size={16} className="md:w-4 md:h-4" />
            </a>
            <a href="#" className="p-1.5 md:p-1.5 rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md">
              <FaTwitter size={16} className="md:w-4 md:h-4" />
            </a>
            <a href="#" className="p-1.5 md:p-1.5 rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md">
              <FaLinkedinIn size={16} className="md:w-4 md:h-4" />
            </a>
            <a href="#" className="p-1.5 md:p-1.5 rounded-full bg-white text-[#00334D] hover:bg-[#005073] hover:text-white transition duration-300 shadow-md">
              <FaInstagram size={16} className="md:w-4 md:h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 md:mt-6 text-center text-[#00334D] text-[11px] md:text-xs font-medium">
          &copy; {new Date().getFullYear()} StudySphere. All rights reserved.
>>>>>>> 552686cd1657d070e9b8d8027d1af7a7a78392cb
        </div>
      </div>
    </footer>
  );
}
