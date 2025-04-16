import React from "react";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="bg-gray-900 text-white py-40 px-6 md:px-20 w-full">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold leading-tight">
            Analyze <span className="text-[#fbb667]">Instagram Comments</span> in Seconds!
          </h1>
          <p className="text-lg mt-4 text-gray-400">
            Upload, analyze, and gain insights instantly with AI-powered tools.
          </p>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="mt-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#fcce9f] to-[#fbb667] text-gray-900 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Learn More
          </button>
        </div>

        {/* Right Content (Image) */}
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src="https://cdn.dribbble.com/userupload/14080678/file/original-6b11693a5564a212b73b308c426c3830.gif"
            alt="Analysis"
            className="rounded-lg object-cover w-full max-w-md shadow-2xl"
          />
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
