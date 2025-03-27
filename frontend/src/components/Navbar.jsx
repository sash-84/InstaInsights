import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close menu on mobile after clicking
  };

  const handleClick = () => {
    window.location.href = "http://localhost:5000/"; // Change to your Flask server URL
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md text-white flex justify-between items-center z-50">
      
      {/* Logo */}
      <h1 
        className="text-2xl text-[#fbb667] font-bold cursor-pointer" 
        style={{ fontFamily: "Vibur, cursive" }}
        onClick={() => scrollToSection("hero")}>
        InstaInsights
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-md items-center">
        <li className="nav-links" onClick={() => scrollToSection("hero")}>
          Home
        </li>
        <li className="nav-links" onClick={() => scrollToSection("features")}>
          Features
        </li>
        <li className="nav-links" onClick={() => scrollToSection("how-it-works")}>
          How It Works
        </li>
        <li>
        <button
            onClick={handleClick}
            className="px-4 py-1 rounded-full font-semibold hover:scale-105 transition-all transform duration-300">
                Login
        </button>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-[#fbb667] focus:outline-none bg-transparent" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-6 w-48 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center md:hidden">
          <ul className="w-full text-center py-2">
            <li className="py-2 border-b border-gray-700" onClick={() => scrollToSection("hero")}>
              Home
            </li>
            <li className="py-2 border-b border-gray-700" onClick={() => scrollToSection("features")}>
              Features
            </li>
            <li className="py-2 border-b border-gray-700" onClick={() => scrollToSection("how-it-works")}>
              How It Works
            </li>
            <li className="py-2">
              <button
                onClick={handleClick}
                className="px-4 py-1 font-semibold rounded-full">
                  Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 