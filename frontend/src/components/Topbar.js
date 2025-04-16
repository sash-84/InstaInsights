import React from "react";
import { AlertTriangle, Heart, MessageCircle } from "lucide-react";
import { useAppContext } from "../components/AppContext";
import { useLocation } from "react-router-dom";

const Topbar = () => {

  const location = useLocation();

  const { activePageSelected, activePostSelected } = useAppContext();

  return (
    <div className="w-full ml-64 px-10 py-4">

      {/* Page Account Box */}
      {activePageSelected ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-6 justify-center">

            {/* Page Box */}
            <div className="bg-gray-800 text-white rounded-lg shadow-md px-10 py-6 w-[300px]">
              <p className="text-sm text-gray-400 mb-2">Your Page</p>
              <div className="flex items-center gap-4">
                <img
                  src={activePageSelected.picture?.data?.url}
                  alt={activePageSelected.name}
                  className="w-12 h-12 rounded-full border-2 border-[#fbb667]"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {activePageSelected.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Category: {activePageSelected.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Instagram Account Box */}
            {activePageSelected.instagram_account ? (
              <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-[300px]">
                <p className="text-sm text-gray-400 mb-2">Instagram Account</p>
                <div className="flex items-center gap-4">
                  <img
                    src={activePageSelected.instagram_account.profile_picture_url}
                    alt="profile"
                    className="w-12 h-12 rounded-full border-2 border-[#fbb667]"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      @{activePageSelected.instagram_account.username}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {activePageSelected.instagram_account.name}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 text-yellow-800 border border-yellow-300 rounded-lg p-6 flex items-center gap-4 shadow-sm w-[300px]">
                <AlertTriangle className="w-6 h-6" />
                <span className="text-base font-medium">
                  No Instagram business account connected.
                </span>
              </div>
            )}
            {/*Active Post Box*/}
            {activePostSelected ? (
              <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-[300px]">
                <p className="text-sm text-gray-400 mb-2">Instagram Post</p>
                <div className="flex items-center gap-4">
                  <img
                    src={activePostSelected.media_url}
                    alt="profile"
                    className="w-12 h-12 rounded-full border-2 border-[#fbb667]"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {activePostSelected.caption.split(" ").slice(0, 3).join(" ") + "..."}
                    </h3>
                    <div className="flex justify-between items-center text-gray-400 text-sm space-x-4">
                      <div className="flex items-center gap-1">
                        <Heart size={14} /> 
                        <span>{activePostSelected.like_count || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} /> 
                        <span>{activePostSelected.comments?.length || 0}</span>
                      </div>
                      <span>{new Date(activePostSelected.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ): (
              location.pathname === "/main-layout/analysis" && (
              <div className="bg-yellow-50 text-yellow-800 border border-yellow-300 rounded-lg p-6 flex items-center gap-4 shadow-sm w-[300px]">
                <AlertTriangle className="w-6 h-6" />
                <span className="text-base font-medium">
                  No Instagram Post selected.
                </span>
              </div>
            ))}
          </div>

          {/* Optional: A bottom gradient strip */}
          <div className="w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 animate-pulse rounded-full mt-4"></div>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-400">
          No page selected
        </div>
      )}
    </div>
  );
};

export default Topbar;
