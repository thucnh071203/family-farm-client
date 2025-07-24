import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
import ListPost from "../../components/PostManagement/ListPost";
import { useState } from "react";

const PostManagement = () => {
    return (
        <div className="flex min-h-screen">
          <SidebarDashboard />
          <div className="flex-1 w-full">
            <ListPost />
          </div>
        </div>
      );
    };

export default PostManagement;