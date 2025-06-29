import React from "react";
import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
import ListCateService from "../../components/CateService/ListCateService";

const CateServicePage = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarDashboard />
      <div className="flex-1 ">
        <ListCateService />
      </div>
    </div>
  );
};

export default CateServicePage;
