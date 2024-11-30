import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEnvelope, faPen, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

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

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url('/Night5.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div className="max-w-4xl w-full mx-4 my-8 bg-[#001022]/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Get in Touch</h2>
            <p className="text-gray-300 mt-2">We'd love to hear from you. Fill out the form below or contact us directly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    required
                  />
                </div>

                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    required
                  />
                </div>

                <div className="relative">
                  <FontAwesomeIcon icon={faPen} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <FontAwesomeIcon icon={faCommentDots} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>

            {/* Contact Information */}
            <div className="text-center lg:text-left lg:pl-8">
              <h3 className="text-2xl font-bold text-white mb-6">Or reach us at:</h3>
              <div className="space-y-3">
                <p className="flex items-center justify-center lg:justify-start text-gray-300">
                  <span className="font-medium">Phone:</span>
                  <a href="tel:+1234567890" className="ml-2 text-blue-400 hover:text-blue-300">9059909791</a>
                </p>
                <p className="flex items-center justify-center lg:justify-start text-gray-300">
                  <span className="font-medium">Email:</span>
                  <a href="mailto:StudySphere@gmail.com" className="ml-2 text-blue-400 hover:text-blue-300">StudySphere@gmail.com</a>
                </p>
                <p className="flex items-center justify-center lg:justify-start text-gray-300">
                  <span className="font-medium">Address:</span>
                  <span className="ml-2">Reva University, Yelahanka</span>
                </p>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 flex justify-center lg:justify-start space-x-6">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
