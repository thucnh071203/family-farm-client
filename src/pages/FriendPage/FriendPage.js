import FriendSidebar from "../../components/Friend/FriendSidebar";
import FriendRight from "../../components/Friend/FriendRight";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";

const FriendPage = () => {
  const [section, setSection] = useState("list-follower");

  return (
    <div>
    <Header/>
      <div className="flex">
        <FriendSidebar setSection={setSection} />
        <FriendRight section={section} />
      </div>
    </div>
  );
};

export default FriendPage;
