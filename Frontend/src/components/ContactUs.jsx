import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEnvelope, faPen, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Typed from 'typed.js';
import { useRef } from "react";
import '../ContactUs.css'; // Ensure you have this CSS file for animations



const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/api/contacts', formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const el = useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["We'd love to hear from you",' Fill out the form below or contact us directly...'],
      typeSpeed: 60,
      backSpeed: 60, 
     
    });

    return () => {
   
      typed.destroy();
    };
  }, []);

  return (
    <div className="h-screen pt-[88px]" style={{ backgroundImage: 'url(Night5.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto h-[calc(100vh-88px)] bg-[#001022]/50 rounded-lg shadow-md p-8 backdrop-filter backdrop-blur-lg flex flex-col">
        <h2 className="text-3xl sm:text-5xl font-bold text-white text-center">Get in Touch</h2>
        <p ref={el} className="text-white text-center mt-3 text-lg"></p>
        
        <div className="flex-1 flex gap-12 mt-8">
          {/* Form Section */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:space-x-6">
                <div className="flex-1 relative">
                  <FontAwesomeIcon icon={faUser} className="absolute left-4 top-11 animate-icon text-gray-400 text-lg" />
                  <label className="block text-base font-medium text-white mb-2">Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg p-3 pl-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div className="flex-1 relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-11 animate-icon text-gray-400 text-lg" />
                  <label className="block text-base font-medium text-white mb-2">Email <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg p-3 pl-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
              </div>

              <div className="relative">
                <FontAwesomeIcon icon={faPen} className="absolute left-4 top-11 animate-icon text-gray-400 text-lg" />
                <label className="block text-base font-medium text-white mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg p-3 pl-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>

              <div className="relative">
                <FontAwesomeIcon icon={faCommentDots} className="absolute left-4 top-11 animate-icon text-gray-400 text-lg" />
                <label className="block text-base font-medium text-white mb-2">Message <span className="text-red-500">*</span></label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg p-3 pl-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-10 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="w-96 text-left space-y-8">
            <h3 className="text-2xl font-bold text-white">Or reach us at:</h3>
            <div className="space-y-6">
              <p className="flex items-center text-gray-300 text-lg">
                <span className="font-medium min-w-[80px]">Phone:</span>
                <a href="tel:+1234567890" className="ml-3 text-blue-400 hover:text-blue-300">9059909791</a>
              </p>
              <p className="flex items-center text-gray-300 text-lg">
                <span className="font-medium min-w-[80px]">Email:</span>
                <a href="mailto:StudySphere@gmail.com" className="ml-3 text-blue-400 hover:text-blue-300">StudySphere@gmail.com</a>
              </p>
              <p className="flex items-center text-gray-300 text-lg">
                <span className="font-medium min-w-[80px]">Address:</span>
                <span className="ml-3">Reva University, Yelahanka</span>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-8 mt-8">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors animate-icon">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors animate-icon">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors animate-icon">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors animate-icon">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
