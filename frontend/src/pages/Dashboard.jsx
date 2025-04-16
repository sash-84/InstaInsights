import React from "react";
import PagesList from "../components/PagesList";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => {

  return (
    <div className="flex flex-col bg-gray-900 text-white px-6 md:px-20 py-20 items-center w-full h-[100vh]">
    <DashboardHeader />
    <div className="w-full max-w-6xl text-center">
      <PagesList />
    </div>
    </div>
  );
};

export default Dashboard;
