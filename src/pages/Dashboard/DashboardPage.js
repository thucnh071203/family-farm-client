import React from "react";
import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
// import StatisticPage from "../../pages/Dashboard/StatisticPage";
import CreatePostCate from "../../pages/Dashboard/CreatePostCate";
import ListAccountSensor from "../../components/AccountManage/ListAccountSensor";
import AccountSencorDetail from "../../components/AccountManage/AccountSencorDetail";
import ListAccount from "../../components/AccountManage/ListAccount";
import StatisticPage from "./StatisticPage";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <SidebarDashboard />

      {/* <div className="flex-1 ml-64">
        <StatisticPage />
      </div> */}

      <div className="flex-1 ">
        {/* <CreatePostCate /> */}
        {/* <ListAccountSensor /> */}
        {/* <ListAccount /> */}
        <StatisticPage />
      </div>
    </div>
  );
};

export default DashboardPage;
