import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faEnvelope,
  faPen,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Typed from "typed.js";
import { useRef } from "react";
import "../ContactUs.css"; // Ensure you have this CSS file for animations

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/api/contacts",
        formData
      );
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const el = useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "We'd love to hear from you",
        " Fill out the form below or contact us directly...",
      ],
      typeSpeed: 60,
      backSpeed: 60,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div
      className="bg-gray-100 py-12 px-6 sm:px-12 min-h-screen"
      style={{
        backgroundImage: "url(/Night5.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mt-14 flex flex-col mx-auto rounded-lg shadow-md p-6 sm:p-8 backdrop-filter bg-[#001022]/70">
        <div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white text-center">
            Get in Touch
          </h2>
          <p ref={el} className="text-gray-300 text-center mt-2"></p>
        </div>
        <div className="flex flex-col gap-8 justify-center items-stretch lg:flex-row">
          <form className="mt-6 space-y-4 w-full lg:w-1/2" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1 relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-10 animate-icon text-white"
                />
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-600 bg-transparent text-white rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
              <div className="flex-1 mt-4 sm:mt-0 relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-10 animate-icon text-white"
                />
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-600 bg-transparent text-white rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faPen}
                className="absolute left-3 top-10 animate-icon text-white"
              />
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-transparent text-white rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faCommentDots}
                className="absolute left-3 top-3 text-gray-400"
              />
              <textarea
                name="message"
                rows="3"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-[#00334D] font-medium py-2 rounded-lg hover:bg-gray-100 transition duration-300 text-[15px]"
            >
              Send Message
            </button>
          </form>

          <div className="w-full lg:w-1/2 flex flex-col lg:pl-8">
            <div className="text-center lg:text-left mb-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Or reach us at:
              </h3>
              <div className="space-y-4">
                <p className="flex items-center justify-center lg:justify-start text-gray-300">
                  <span className="font-medium min-w-[80px]">Phone:</span>
                  <a href="tel:+1234567890" className="ml-2 text-blue-400 hover:text-blue-300">
                    9059909791
                  </a>
                </p>
                <p className="flex items-center justify-center lg:justify-start text-gray-300">
                  <span className="font-medium min-w-[80px]">Email:</span>
                  <a href="mailto:StudySphere@gmail.com" className="ml-2 text-blue-400 hover:text-blue-300 break-all">
                    StudySphere@gmail.com
                  </a>
                </p>
                <p className="flex items-center justify-center lg:justify-start text-gray-300">
                  <span className="font-medium min-w-[80px]">Address:</span>
                  <span className="ml-2">Reva University, Yelahanka</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <div className="grid grid-flow-col gap-8">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00334D] transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faFacebook} className="w-7 h-7" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00334D] transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTwitter} className="w-7 h-7" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00334D] transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-7 h-7" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00334D] transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-7 h-7" />
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
