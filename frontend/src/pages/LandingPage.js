import React from "react";
import Works from "../components/Works";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const LandingPage = () => {

  return (
    <div className="bg-gray-900 text-white font-sans">

      <Hero/>

      <Features />

      <Works />

      <Footer />
      
    </div>
  );
};

export default LandingPage;
