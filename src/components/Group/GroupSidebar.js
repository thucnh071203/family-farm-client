import React from "react";

const GroupSidebar = ({ setSection }) => {
  return (
    <div className="w-[289px] bg-[#E5E4E9] font-roboto rounded-r-[10px] hidden md:block lg:mt-[120px] mt-[63px] fixed h-full">
      <div className="flex items-start pt-6 ml-8">
        <p className="text-lg font-bold ">GROUP PAGE</p>
      </div>
      <div className="mx-8 mt-11 w-[225px] h-[155px] flex flex-col gap-4">
        {/* <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
          <div className="mx-4 flex items-center"> */}

        <button
          onClick={() => setSection("post-in-group")}
          className="hover:bg-[#999999] flex w-full h-10 rounded-[10px] p-3"
        >
          <div className="flex items-center mx-2">
            <i className="fa-solid fa-file-invoice"></i>
          </div>
          <div className="flex items-center font-bold">Post in Group</div>
        </button>

        {/* <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
          <div className="mx-4 flex items-center"> */}

        <button
          onClick={() => setSection("all-group-user")}
          className="hover:bg-[#999999] flex w-full h-10 rounded-[10px] p-3"
        >
          <div className="flex items-center mx-2">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="flex items-center font-bold">Your Groups</div>
        </button>

        {/* <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
          <div className="mx-4 flex items-center"> */}

        <button
          onClick={() => setSection("group-suggestion-in-group")}
          className="hover:bg-[#999999] flex w-full h-10 rounded-[10px] p-3"
        >
          <div className="flex items-center mx-2">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <div className="flex items-center font-bold">Suggested Groups </div>
        </button>
        <button
          className="hover:bg-[#3DB3FB] flex justify-center items-center w-full h-10 rounded-[10px] hover:text-white gap-2 p-3"
          onClick={() => setSection("create-group")}
        >
          <div>
            <i className="fa-solid fa-plus"></i>
          </div>
          <div className="font-bold">Create new Group</div>
        </button>
      </div>
    </div>
  );
};

export default GroupSidebar;
