import React from "react";
import SidebarDash from "../../components/DashboardCom/SidebarDash";
// import StatisticPage from "../../pages/Dashboard/StatisticPage";
import CreatePostCate from "../../pages/Dashboard/CreatePostCate";
import ListAccountSensor from "../../components/AccountManage/ListAccountSensor";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <SidebarDash />

      {/* <div className="flex-1 ml-64">
        <StatisticPage />
      </div> */}

      <div className="flex-1">
        {/* <CreatePostCate /> */}
        <ListAccountSensor />
      </div>
    </div>
  );
};

export default DashboardPage;
