import React from "react";
import FriendSidebar from "../../components/Friend/FriendSidebar";
import FriendRight from "../../components/Friend/FriendRight";
import Header from "../../components/Header/Header";
import HomePage from "../HomePage/HomePage";

const FriendPage = () => {
  return (
    <div>
    
      <div className="flex">
        <FriendSidebar />
        <FriendRight />
      </div>
    </div>
  );
};

export default FriendPage;
