import React from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import GroupSidebar from "../../components/Group/GroupSidebar";
import PostInGroupRight from "../../components/Group/PostInGroupRight";
const PostGroupPage = () => {
    
  return (
    
    <div>
      <Header />
      <NavbarHeader />
      <div className="flex">
        <GroupSidebar />
        <PostInGroupRight />
      </div>
    </div>
  );
};

export default PostGroupPage;
