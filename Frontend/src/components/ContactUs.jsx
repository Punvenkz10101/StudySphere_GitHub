import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEnvelope, faPen, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import '../ContactUs.css';

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
    console.log('Form Data:', formData);
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/api/contacts', formData);
      console.log('Response:', response);
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

  return (
    <div className="contact-container">
      <div className="max-w-4xl  mx-auto   flex flex-col bg-white bg-opacity-70 rounded-lg shadow-md sm:pt-4 sm:pb-6 sm:p-10 backdrop-filter backdrop-blur-lg">
        <div>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center">Get in Touch</h2>
          <p className="text-gray-600 text-center mt-2">We'd love to hear from you. Fill out the form below or contact us directly.</p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <form className="mt-4 space-y-6 sm:mr-15" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1 relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-10 animate-icon" />
                <label className="block text-sm font-medium text-gray-600 mb-1">Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
              </div>
              <div className="flex-1 mt-4 sm:mt-0 relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-10 animate-icon" />
                <label className="block text-sm font-medium text-gray-600 mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
              </div>
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faPen} className="absolute left-3 top-10 animate-icon" />
              <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faCommentDots} className="absolute left-3 top-10 animate-icon" />
              <label className="block text-sm font-medium text-gray-600 mb-1">Message <span className="text-red-500">*</span></label>
              <textarea name="message" rows="5" placeholder="Write your message..." value={formData.message} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition">Send Message</button>
          </form>
          <div className="mt-10 text-center flex flex-col items-center justify-center sm:mt-0 sm:ml-10">
            <p className="text-4xl font-bold mb-4 text-customBlue">Or reach us at:</p>
            <p className="text-gray-800 font-medium">
              Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">9059909791</a>
            </p>
            <p className="text-gray-800 font-medium">
              Email: <a href="mailto:StudySphere@gmail.com" className="text-blue-500 hover:underline">StudySphere@gmail.com</a>
            </p>
            <p className="text-gray-800 font-medium">Address: Reva University, Yelahanka</p>
            <div className="flex-icon-container mt-6  justify-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
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
