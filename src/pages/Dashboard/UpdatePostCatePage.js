import React from "react";
import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
import UpdatePostCate from "./UpdatePostCate";
const UpdatePostCatePage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <SidebarDashboard />

      {/* <div className="flex-1 ml-64">
                    <StatisticPage />
                  </div> */}

      <div className="flex-1 ">
        <UpdatePostCate />
      </div>
    </div>
  );
};

export default UpdatePostCatePage;
