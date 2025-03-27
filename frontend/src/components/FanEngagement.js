import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const FanEngagement = ({ userAccessToken }) => {
  const [fanData, setFanData] = useState({
    top_fans: [],
    loyal_fans: [],
    suggested_engagement: [],
  });

  useEffect(() => {
    const fetchFanEngagement = async () => {
      if (!userAccessToken) {
        console.error("Missing userAccessToken");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/fan_engagement_insights", {
          params: { access_token: userAccessToken }, 
        });

        console.log("Fetched Fan Data:", response.data); // Debugging
        setFanData(response.data); // Update state with API response
      } catch (error) {
        console.error("Error fetching fan engagement data:", error);
      }
    };

    fetchFanEngagement();
  }, [userAccessToken]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🏆 Top Fans & 💙 Loyal Fans Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 🏆 Top Fans */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-black">🏆 Overall Top Fans</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-2 text-white">Username</th>
                <th className="p-2 text-white">Total Comments</th>
              </tr>
            </thead>
            <tbody>
              {fanData.top_fans.map((fan, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-black">{fan.username}</td>
                  <td className="p-2 text-black">{fan.comment_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 💙 Loyal Fans */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-black">💙 Loyal Fans</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-2 text-white">Username</th>
                <th className="p-2 text-white">Avg Sentiment Score</th>
              </tr>
            </thead>
            <tbody>
              {fanData.loyal_fans.map((fan, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-black">{fan.username}</td>
                  <td className="p-2 text-black">{fan.avg_sentiment.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📊 Engagement Trends Across All Posts */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-3 text-black">📈 Engagement Trends Across All Posts</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fanData.top_fans}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="username" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="comment_count" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🎯 Suggested Fans to Engage With */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-3 text-black">🎯 Suggested Fans for Engagement</h3>
        <ul className="pl-5 text-black">
          {fanData.suggested_engagement.map((fan, index) => (
            <li key={index} className="mb-1 text-lg font-medium">{fan.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FanEngagement;
