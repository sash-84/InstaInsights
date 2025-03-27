import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 relative">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-[#fbb667]" style={{ fontFamily: "Vibur, cursive" }}>
            InstaInsights
          </h2>
          <p className="text-sm mt-2 text-gray-400">
            Analyze & gain insights from Instagram comments.
          </p>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/3 bg-gray-800 p-5 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-[#fbb667] mb-3 text-center">Contact Us</h3>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fbb667] transition-all"
            />
            <textarea
              placeholder="Your message"
              className="w-full p-3 mt-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fbb667] transition-all"
              rows="3"
            ></textarea>
            <button className="w-full bg-[#fbb667] text-white font-semibold py-3 rounded mt-2 hover:opacity-85 transition">
              Send Message
            </button>
          </form>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          {[
            { icon: <FaFacebook size={26} />, link: "https://facebook.com" },
            { icon: <FaTwitter size={26} />, link: "https://twitter.com" },
            { icon: <FaInstagram size={26} />, link: "https://instagram.com" },
          ].map((item, index) => (
          <a
            key={index} 
            href={item.link} 
            className="text-gray-400 hover:text-[#fbb667] transition transform hover:scale-125 duration-300">
            {item.icon}
          </a>
          ))}
        </div>
      </div>

      {/* Glowing Lines Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 animate-pulse"></div>


      {/* Copyright Section */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Insta Insights. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;