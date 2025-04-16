import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useAppContext } from "./AppContext";
import { Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, setShowModal }) => {

  const navigate = useNavigate();

  const { setComments, setActivePostSelected, setSentimentData, setEmotionData, } = useAppContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear active post when the page loads
    setActivePostSelected(null);
    setSentimentData(null);
    setEmotionData(null);
  }, [setActivePostSelected]);

  const handleShowComments = async (comments) => {
    const commentsData = comments || [];
    setComments(commentsData);
    console.log(comments);
    setShowModal(true);
  };

  const fetchSentimentAnalysis = async (comments) => {
    if (!comments.length) {
      console.warn("No comments to analyze");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/analyze_comments", {
        comments,
      });

      const analyzedData = res.data?.data || [];
      setComments(analyzedData);

      console.log(analyzedData);

      let sarcastic = 0;
      let notSarcastic = 0;
      analyzedData.forEach((comment) => {
      if (comment.sarcasm === "Sarcastic") sarcastic++;
      else if (comment.sarcasm === "Not Sarcastic") notSarcastic++;
});

      const sentimentCounts = res.data?.sentiment_counts || {
        Positive: 0,
        Negative: 0,
        Neutral: 0,
      };

      const emotionCounts = {};
      analyzedData.forEach((comment) => {
        if (comment.emotion) {
          emotionCounts[comment.emotion] = (emotionCounts[comment.emotion] || 0) + 1;
        }
      });

      setSentimentData({...sentimentCounts,
        Sarcastic: sarcastic,
  NotSarcastic: notSarcastic,
    });
      setEmotionData(emotionCounts);
      setShowModal(false);

      setActivePostSelected(post);
      navigate('/main-layout/analysis');
    } catch (error) {
      console.error("Error analyzing comments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-md p-4 border border-gray-700 hover:border-[#fbb667] transition-transform transform hover:scale-[1.03] duration-300">
      
      {/* Image with hover overlay */}
      <div className="relative overflow-hidden rounded-xl">
        <a href={post.permalink} target="_blank" rel="noreferrer">
          <img
            src={post.media_url}
            alt={post.caption || "Instagram Post"}
            className="w-full h-52 object-cover rounded-xl transition-all duration-300 group-hover:brightness-75"
          />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black bg-opacity-40 text-white text-xs rounded-xl">
          Click to view on Instagram ↗
        </div>
        </a>
      </div>

      {/* Caption */}
      <p className="text-gray-300 mt-3 text-sm font-light line-clamp-2 text-center">
        {post.caption
          ? post.caption.split(" ").slice(0, 3).join(" ") + "..."
          : "No caption available."}
      </p>

      {/* Post Metadata */}
      <div className="flex justify-between items-center mt-4 text-gray-400 text-xs">
        <div className="flex items-center gap-1">
          <Heart size={14} /> <span>{post.like_count || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle size={14} /> <span>{post.comments?.length || 0}</span>
        </div>
        <span>{new Date(post.timestamp).toLocaleDateString()}</span>
      </div>

      {/* Button */}
      <button
        onClick={() => handleShowComments(post.comments)}
        className="mt-5 w-full bg-gradient-to-r from-[#fcce9f] to-[#fbb667] text-gray-900 font-semibold py-2 rounded-xl hover:opacity-90 shadow-lg transition"
      >
        View Comments
      </button>
      <button
        onClick={() => {
          fetchSentimentAnalysis(post.comments);
        }}
        className="mt-5 w-full bg-gradient-to-r from-[#fcce9f] to-[#fbb667] text-gray-900 font-semibold py-2 rounded-xl hover:opacity-90 shadow-lg transition"
        disabled={loading}
      >
          {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
};

export default PostCard;
