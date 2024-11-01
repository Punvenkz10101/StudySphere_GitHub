import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
          <a href="#contact" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
