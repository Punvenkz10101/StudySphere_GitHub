import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const ContactUs = () => { 
  return (
    <div className="bg-gray-100 py-12 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-12">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-center mt-2">
          We'd love to hear from you. Fill out the form below or contact us directly.
        </p>

        <form className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div className="flex-1 mt-4 sm:mt-0">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-600">Or reach us at:</p>
          <p className="text-gray-800 font-medium">
            Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">9059909791</a>
          </p>
          <p className="text-gray-800 font-medium">
            Email: <a href="StudySphere@gmail.com" className="text-blue-500 hover:underline">StudySphere@gmail.com</a>
          </p>
          <p className="text-gray-800 font-medium">
            Address: Reva University,Yelahanka
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
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
  );
};

export default ContactUs;
