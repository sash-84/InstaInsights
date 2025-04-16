import React, { useState } from "react";
import PostCard from "./PostCard.jsx";
import { useAppContext } from "./AppContext";

const PostGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const { activePageSelected, comments } = useAppContext();
 
  
  return (
    <div className="px-6 py-10">

      {/* Post Grid */}
      <h2 className="text-3xl font-bold text-[#fbb667] text-center">Instagram Posts</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {activePageSelected.posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            setShowModal={setShowModal}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 w-96 p-6 rounded-xl shadow-lg relative border border-[#fbb667]">
            <button
              className="absolute bg-transparent top-2 right-2 text-[#fbb667] text-lg hover:scale-110 transition"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold text-white text-center mb-4">
              Comments
            </h2>
            

            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
              {comments.length > 0 ? (
                comments
                  .map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3 bg-gray-800 rounded-md shadow text-left"
                    >
                      <p className="text-sm font-semibold text-[#fbb667]">
                        {comment.username}
                      </p>
                      <p className="text-gray-300">{comment.text}</p>
                    </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No comments available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostGallery;
