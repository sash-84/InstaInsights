import React, { useState, useEffect } from "react";
// import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from "./components/Dashboard";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [pages, setPages] = useState([]);

  // Extract access token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    if (accessToken) {
      console.log("Access Token : ",accessToken);
      setAccessToken(accessToken);
      fetchPages(accessToken);
      window.history.replaceState({}, document.title, "/"); // Remove token from URL
    }
  }, []);

  const fetchPages = async (accessToken) => {
    try {
      const res = await axios.get(`http://localhost:5000/get_pages?access_token=${accessToken}`);
      const pagesData = res.data?.data || [];
      setPages(pagesData);
      console.log("Fetched Pages:", pagesData);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <Navbar/>

      {!accessToken ? (
        <LandingPage/>
      ) : (
        <>
          {/* Show Instagram Posts */}
          {pages.length > 0 ? (
            <Dashboard pages={pages} accessToken={accessToken}/>
          ) : (
            <p className="mt-4 text-gray-500">No pages available.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;