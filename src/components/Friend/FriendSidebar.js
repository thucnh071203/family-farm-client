import React from "react";

const FriendSidebar = () => {
  return (
    <div className="w-[289px] h-screen bg-[#E5E4E9] font-roboto rounded-[10px] hidden md:block">
      <div className="ml-8 pt-6 flex items-start">
        <p className="text-lg font-bold ">FRIEND PAGE</p>
      </div>
      <div className="mx-8 mt-14 w-[225px] h-[155px] flex flex-col gap-4">
        <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
          <div className="mx-4 flex items-center">
            <i class="fa-solid fa-user-group"></i>
          </div>
          <div className="font-bold flex items-center">Friend request</div>
        </button>
        <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
          <div className="mx-4">
            <i class="fa-solid fa-user-plus"></i>
          </div>
          <div className="font-bold">Friend request</div>
        </button>
      </div>
    </div>
  );
};

export default FriendSidebar;
