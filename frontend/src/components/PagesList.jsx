import React, { useState } from 'react';
import { useAppContext } from "./AppContext";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PagesList = () => {

  const navigate = useNavigate();
  
  const {
    fullPageData,
    setActivePageSelected
  } = useAppContext();

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pages based on search query
  const filteredPages = fullPageData.filter(page =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold text-[#fbb667] mt-8 text-center">Your Pages</h2>

      {/* Search Input */}
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-1/2 bg-gray-800 text-white border-[#fbb667] focus:outline-none focus:ring-2 focus:ring-[#fbb667] transition duration-300"
        />
      </div>

      {filteredPages.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">No pages found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {filteredPages.map((page) => (
            <div
              key={page.id}
              className={`bg-gray-800 shadow-md rounded-xl p-6 flex items-center space-x-4 cursor-pointer
                hover:shadow-xl hover:scale-105 transition-transform duration-300 border 
                ${page.instagram_account ? 'border-gray-700 hover:border-[#fbb667]' : 'border-red-400 hover:border-red-500'}`}
              onClick={() => {
                setActivePageSelected(page);
                navigate("/main-layout/posts");
              }}
            >
              <img
                src={page.picture?.data?.url}
                alt={page.name}
                className="w-16 h-16 rounded-full border-2 border-[#fbb667]"
              />
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  {page.name}
                  {page.instagram_account && (
                    <FaInstagram className="w-4 h-4 text-[#fbb667]" />
                  )}
                </h3>
                <p className="text-sm text-gray-400">Category: {page.category}</p>
                {!page.instagram_account && (
                  <p className="text-xs text-red-400 mt-1">No Instagram account connected</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagesList;
