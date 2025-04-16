import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Posts", path: "/main-layout/posts" },
    { name: "Analysis Insights", path: "/main-layout/analysis" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0 p-6">
      <div className="mb-8 text-lg font-bold">Dashboard</div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md transition-all ${
                isActive
                  ? "bg-[#fbb667] text-gray-900 font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
        <Link to={"/dashboard"} className="flex items-center space-x-2 px-3 py-2">Back<RiArrowGoBackLine />
</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
