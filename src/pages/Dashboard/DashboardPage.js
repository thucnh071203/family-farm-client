import React from "react";
import SidebarDash from "../../components/DashboardCom/SidebarDash";
// import StatisticPage from "../../pages/Dashboard/StatisticPage";
import CreatePostCate from "../../pages/Dashboard/CreatePostCate";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <SidebarDash />

      {/* <div className="flex-1 ml-64">
        <StatisticPage />
      </div> */}

      <div className="flex-1">
        <CreatePostCate />
      </div>
    </div>
  );
};

export default DashboardPage;
