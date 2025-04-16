import React, { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="p-6 space-y-6 w-full max-w-3xl mx-auto bg-gray-800 rounded">
      <h1 className="text-2xl font-bold mb-4 text-white">Settings</h1>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b pb-2 text-white border-gray-700">
        {["account", "preferences", "sync", "security", "support"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 rounded-t-md ${
              activeTab === tab ? "bg-[#fbb667]" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="border rounded-lg p-6 bg-gray-800 text-white shadow">

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="space-y-6  border-grya-700">
            <div>
              <label className="block font-medium">Facebook Account</label>
              <input
                className="w-full p-2 mt-1 border rounded"
                placeholder="Connected: JohnDoe@gmail.com"
                disabled
              />
              {/* <button className="mt-2 px-4 py-1 bg-[#fbb667] rounded">Disconnect</button> */}
            </div>
            <div>
              <label className="block font-medium">Instagram Account</label>
              <input
                className="w-full p-2 mt-1 border rounded"
                placeholder="Connected: @johns_insta"
                disabled
              />
              {/* <button className="mt-2 px-4 py-1 bg-[#fbb667] rounded">Disconnect</button> */}
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="font-medium">Dark Mode</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div>
              <label className="block font-medium">Language</label>
              <select className="w-full mt-1 p-2 border rounded">
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Default Page View</label>
              <input
                className="w-full p-2 mt-1 border rounded"
                placeholder="Sentiment Page"
              />
            </div>
          </div>
        )}

        {/* Sync Tab */}
        {activeTab === "sync" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="font-medium">Auto-sync Data</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div>
              <label className="block font-medium">Sync Frequency</label>
              <select className="w-full mt-1 p-2 border rounded">
                <option>Every Hour</option>
                <option>Every 6 Hours</option>
                <option>Every Day</option>
              </select>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Manual Sync</button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div>
              <label className="block font-medium">Change Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded"
                placeholder="New Password"
              />
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Update Password</button>
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium">2-Factor Authentication</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === "support" && (
          <div className="space-y-6">
            <div>
              <label className="block font-medium">Need Help?</label>
              <p className="text-sm text-gray-500">Contact our support team or report bugs.</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Contact Support</button>
            </div>
            <div>
              <label className="block font-medium">Give Feedback</label>
              <input
                className="w-full p-2 mt-1 border rounded"
                placeholder="Your feedback"
              />
              <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
