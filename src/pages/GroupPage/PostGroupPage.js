import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import GroupSidebar from "../../components/Group/GroupSidebar";
import PostInGroupRight from "../../components/Group/PostInGroupRight";
import YourgroupRight from "../../components/Group/YourgroupRight";
import CreateGroupForm from "../../components/Group/CreateGroupForm";
const PostGroupPage = () => {
  const [section, setSection] = useState("post-in-group");
  const [roleId, setRoleId] = useState(null);

  return (
    <div>
      <Header />
      <NavbarHeader />
      <div className="flex">
        <GroupSidebar setSection={setSection} />
        {section === "user-group" && (
          <div className="lg:mt-[120px] mt-[63px] ml-24 md:ml-[360px] pt-10">
            <YourgroupRight section={section}/>
          </div>
        )}
        {section === "post-in-group" && (
          <PostInGroupRight/>
        )}
        {section === "create-group" && (
          <CreateGroupForm/>
        )}
      </div>
    </div>
  );
};

export default PostGroupPage;
