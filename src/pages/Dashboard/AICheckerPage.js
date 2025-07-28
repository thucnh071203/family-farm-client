import React from "react";
import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
import ListPostCheckedAI from "../../components/AIChecker/ListPostCheckedAI";

const AICheckerPage = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarDashboard />
      <div className="flex-1 w-full">
        <ListPostCheckedAI />
      </div>
    </div>
  );
};

export default AICheckerPage;
