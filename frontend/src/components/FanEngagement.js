import React, { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const FanEngagement = () => {

  const { comments, fullPageData } = useAppContext();

  function getAllCommentsForAnalysis(allDetails) {
    const comments = [];
  
    allDetails.forEach(page => {
      const insta = page.instagram_account;
      if (insta && insta.posts) {
        insta.posts.forEach(post => {
          if (post.comments) {
            post.comments.forEach(comment => {
              comments.push(comment); 
            });
          }
        });
      }
    });
  
    return comments;
  }
  

  console.log(comments);
  
  const [fanData, setFanData] = useState({
    top_fans: [],
    loyal_fans: [],
    suggested_engagement: [],
  });

  useEffect(() => {
    if (!comments || comments.length === 0) return;

    const fanStats = {};

    comments.forEach((comment) => {
      const { username, sentiment } = comment;

      if (!fanStats[username]) {
        fanStats[username] = {
          username,
          comment_count: 0,
          sentiment_sum: 0,
        };
      }

      fanStats[username].comment_count += 1;

      const sentimentScore =
        sentiment === "Positive" ? 1 : sentiment === "Negative" ? -1 : 0;

      fanStats[username].sentiment_sum += sentimentScore;
    });

    const fanArray = Object.values(fanStats).map((fan) => ({
      ...fan,
      avg_sentiment: fan.sentiment_sum / fan.comment_count,
    }));

    const top_fans = [...fanArray]
      .sort((a, b) => b.comment_count - a.comment_count)
      .slice(0, 5);

    const loyal_fans = [...fanArray]
      .sort((a, b) => b.avg_sentiment - a.avg_sentiment)
      .slice(0, 5);

    const suggested_engagement = [...fanArray]
      .filter((f) => f.comment_count < 3 && f.avg_sentiment > 0.3)
      .sort((a, b) => b.avg_sentiment - a.avg_sentiment)
      .slice(0, 5);

    setFanData({
      top_fans,
      loyal_fans,
      suggested_engagement,
    });
  }, [comments]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-10">
      {/* 🏆 Top Fans & 💙 Loyal Fans */}
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

      {/* 📊 Engagement Trends */}
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

      {/* 🎯 Suggested Fans */}
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
