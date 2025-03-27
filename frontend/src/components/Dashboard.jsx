import React, { useState } from "react";
import axios from "axios";
import PostGallery from "./PostGallery";
import FanEngagement from "./FanEngagement";


const Dashboard = ({ pages, accessToken }) => {
  const [posts, setPosts] = useState([]);

  const fetchInstagramAccount = async (pageAccessToken) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/get_instagram_account?access_token=${pageAccessToken}`
      );
      const instagramAccountId = res.data?.instagram_business_account?.id;

      if (!instagramAccountId) {
        console.error("No Instagram Business Account found.");
        return;
      }

      fetchPosts(instagramAccountId, pageAccessToken);
      console.log("Instagram Business Account ID:", instagramAccountId);
      console.log("Instagram Business Account:", res.data);
    } catch (error) {
      console.error("Error fetching Instagram account:", error);
    }
  };

  const fetchPosts = async (instagramAccountId, pageAccessToken) => {
    if (!instagramAccountId || !pageAccessToken) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/get_posts?page_access_token=${pageAccessToken}&instagram_id=${instagramAccountId}`
      );
      const postsData = res.data?.data || [];
      console.log("Fetched Posts:", postsData);
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  return (
    <div className="bg-gray-900 text-white px-6 md:px-20 py-20 flex flex-col items-center w-full">
      <div className="w-full max-w-6xl text-center">
        {/* Hero Section Title */}
        <h1 className="text-4xl font-bold text-[#fbb667] mb-6">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Manage your connected pages and view your latest Instagram posts.
        </p>

        {/* Pages Section */}
        <h2 className="text-3xl font-bold text-[#fbb667] mt-12">Your Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className="bg-gray-800 shadow-lg rounded-xl p-6 flex items-center space-x-4 cursor-pointer 
              hover:shadow-xl hover:scale-105 transition transform duration-300 border border-gray-700 hover:border-[#fbb667]"
              onClick={() => fetchInstagramAccount(page.access_token)}
            >
              <img
                src={page.picture?.data?.url}
                alt={page.name}
                className="w-16 h-16 rounded-full border-2 border-[#fbb667]"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{page.name}</h3>
                <p className="text-sm text-gray-400">Category: {page.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Posts Section */}
        <h2 className="text-3xl font-bold text-[#fbb667] mt-16">Instagram Posts</h2>
        <PostGallery posts={posts} accessToken={accessToken} />

        {/* 📌 Fan Engagement Insights Section */}
        <h2 className="text-3xl font-bold text-[#fbb667] mt-16">Fan Engagement Insights</h2>
        <FanEngagement  userAccessToken={accessToken}/> 

      </div>
    </div>
  );
};

export default Dashboard;
