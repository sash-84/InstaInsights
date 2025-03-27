import React, { useState } from "react";
import axios from "axios";
import SentimentChart from "./SentimentChart.tsx";
import EmotionChart from "./EmotionChart.tsx";
import Insights from "./Insights.jsx";

const PostGallery = ({ posts, accessToken }) => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sentimentData, setSentimentData] = useState(null);
  const [emotionData, setEmotionData] = useState(null);

  // Fetch Comments & Show Modal
  const fetchComments = async (postId) => {
    if (!accessToken || !postId) return;

    try {
      const res = await axios.get("http://localhost:5000/fetch_comments", {
        params: { postId, access_token: accessToken },
      });

      const commentsData = res.data?.data || [];  // Ensure safe access

      console.log(commentsData);

      const sentimentCounts = { Positive: 0, Negative: 0, Neutral: 0 };
      res.data?.data.forEach((comment) => {
        sentimentCounts[comment.sentiment] =
          (sentimentCounts[comment.sentiment] || 0) + 1;
      });

      setComments(commentsData);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const fetchSentimentAnalysis = async (comments) => {

    if (!comments.length) {
      console.warn("No comments to analyze");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/analyze_comments", {
        comments,
      });

      const analyzedData = res.data?.data || [];

      console.log(analyzedData);
      setComments(analyzedData);

      // Extract sentiment counts
      const sentimentCounts =
        res.data?.sentiment_counts || { Positive: 0, Negative: 0, Neutral: 0 };

      const emotionCounts = {};
      analyzedData.forEach((comment) => {
        if (comment.emotion) {
          emotionCounts[comment.emotion] = (emotionCounts[comment.emotion] || 0) + 1;
        }
      });

      setSentimentData(sentimentCounts);
      setEmotionData(emotionCounts);
      setShowModal(false);
    } catch (error) {
      console.error("Error analyzing comments:", error);
    }
  };

  return (
    <div className="px-6 py-10">
      {/* Post Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 rounded-lg shadow-lg p-4 hover:scale-105 transition duration-300 cursor-pointer border border-gray-700 hover:border-[#fbb667]"
          >
            <a href={post.permalink} target="_blank" rel="noreferrer">
              <img
                src={post.media_url}
                alt={post.caption || "Instagram Post"}
                className="w-full h-52 object-cover rounded-lg shadow-md transition-all duration-300 hover:shadow-[#fbb667]"
              />
            </a>
            <p className="text-sm text-gray-300 mt-2 px-2">
              {post.caption ? post.caption.slice(0, 25) + "..." : "No caption"}
            </p>
            <button
              onClick={() => fetchComments(post.id)}
              className="mt-5 w-full bg-[#fbb667] text-white p-2 rounded-lg hover:opacity-90 transition"
            >
              Show Comments
            </button>
          </div>
        ))}
      </div>

      {/* Sentiment Analysis Section */}
      {sentimentData && emotionData && (
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-extrabold text-[#fbb667] mb-10">
            Sentiment Analysis & Emotion Analysis
          </h2>
          <SentimentChart sentimentData={sentimentData} />
          <EmotionChart emotionData={emotionData} />
          <Insights sentimentData={sentimentData} emotionData={emotionData} />
        </div>
      )}

      {/* Comments Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 w-96 p-6 rounded-lg shadow-lg relative border border-[#fbb667]">
            <button
              className="absolute top-2 right-2 text-[#fbb667] transition bg-transparent"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold text-white text-center mb-4">
              Comments
            </h2>
            <div className="max-h-60 overflow-y-auto space-y-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 bg-gray-800 rounded-md shadow"
                  >
                    <p className="text-sm font-semibold text-[#fbb667]">
                      {comment.username}
                    </p>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No comments found.</p>
              )}
            </div>
            <button
              onClick={() => fetchSentimentAnalysis(comments)}
              className="mt-4 w-full bg-gradient-to-r from-[#fcce9f] to-orange-500 text-white p-2 rounded-lg hover:opacity-90 transition"
            >
              Analyze Comments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostGallery;
