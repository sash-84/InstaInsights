import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppContext } from "./AppContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, logout } = useAppContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [username, setUsername] = useState("");

useEffect(() => {
  const name = localStorage.getItem("user");
  if (name) {
    setUsername(name);
  }
}, []);
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleAuth = () => {
    if (isLoggedIn) {
      logout();
      navigate("/");
    } else {
      window.open("http://localhost:5000/", "_self");
    }
    setIsOpen(false);
  };

  const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md text-white flex justify-between items-center z-50">
      <h1
        className="text-2xl text-[#fbb667] font-bold cursor-pointer"
        style={{ fontFamily: "Vibur, cursive" }}
        onClick={() => scrollToSection("hero")}
      >
        Insta Insights
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-md items-center">
        {location.pathname != "/" && (
          <li className="nav-links">
            <Link to={"/"}>Home</Link>
          </li>
        )}
        {location.pathname === "/" && (
          <>
            <li className="nav-links" onClick={() => scrollToSection("hero")}>
              Home
            </li>
            <li className="nav-links" onClick={() => scrollToSection("features")}>
              Features
            </li>
            <li className="nav-links" onClick={() => scrollToSection("how-it-works")}>
              How It Works
            </li>
            <li className="nav-links" onClick={() => scrollToSection("contact")}>
              Contact Us
            </li>
          </>
        )}
        {!isLoggedIn ? (
          <>
            <li>
              <button
                onClick={handleAuth}
                className="bg-gradient-to-r from-[#fcce9f] to-[#fbb667] text-gray-900 px-4 py-1 rounded-full font-semibold hover:scale-105 transition-all transform duration-300"
              >
                Login
              </button>
            </li>
          </>
        ) : (
          <>
          <li ref={dropdownRef} className="relative">
            <button className='flex items-center space-x-2' onClick={() => {setShowDropdown(!showDropdown)}}>
              <FaUserCircle className='text-[#fbb667] text-3xl'/>
              <span className='text-[#fbb667] hidden sm:inline font-semibold'>{username}</span>
            </button>
          

          {showDropdown && (
              <div className='absolute right-0 mt-2 w-48 bg-gray-800 shadow-md rounded-lg p-2 flex flex-col justify-center items-center space-y-4'>
                <p className='font-semibold text-center'>Welcome, {username}</p>
                {location.pathname === "/" && (
                  <Link to={"/dashboard"} className="nav-links" onClick={() => setShowDropdown(false)}>Dashboard</Link>
                )}
                <button 
                  onClick={handleAuth} 
                  className="bg-gradient-to-r from-[#fcce9f] to-[#fbb667] text-gray-900 px-4 py-1 rounded-full font-semibold hover:scale-105 transition-all transform duration-300">Logout</button>
              </div>
            )}
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-50 text-[#fbb667]" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="absolute top-20 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-6 py-6 shadow-md md:hidden z-40">
          {location.pathname === "/dashboard" && (
            <li className="nav-links">
              <Link to={"/"} onClick={() => setIsOpen(false)}>Home</Link>
            </li>
          )}
          {location.pathname === "/" && (
            <>
              <li className="nav-links" onClick={() => scrollToSection("hero")}>
                Home
              </li>
              <li className="nav-links" onClick={() => scrollToSection("features")}>
                Features
              </li>
              <li className="nav-links" onClick={() => scrollToSection("how-it-works")}>
                How It Works
              </li>
              <li className="nav-links" onClick={() => scrollToSection("contact")}>
                Contact Us
              </li>
            </>
          )}
          {!isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={handleAuth}
                  className="bg-gradient-to-r from-[#fcce9f] to-[#fbb667] text-gray-900 px-4 py-1 rounded-full font-semibold hover:scale-105 transition-all transform duration-300"
                >
                  Login
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-links">
                <Link to={"/dashboard"} onClick={() =>setIsOpen(false)}>Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={handleAuth}
                  className="bg-gradient-to-r from-[#fcce9f] to-[#fbb667] text-gray-900 px-4 py-1 rounded-full font-semibold hover:scale-105 transition-all transform duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
