import React from "react";

const FriendSidebar = ({ setSection }) => {
  return (
    <div className="w-[289px] h-screen bg-[#E5E4E9] font-roboto rounded-r-[10px]  hidden md:block">
      <div className="ml-8 pt-6 flex items-start">
        <p className="text-lg font-bold ">FRIEND PAGE</p>
      </div>
      <div className="mx-8 mt-11 w-[225px] h-[155px] flex flex-col gap-4">
        <button
          onClick={() => setSection("list-follower")}
          className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]"
        >
          <div className="mx-4 flex items-center">
            <i class="fa-solid fa-user-group"></i>
          </div>
          <div className="font-bold flex items-center">Your follower</div>
        </button>
        <button
          onClick={() => setSection("list-following")}
          className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]"
        >
          <div className="mx-4 flex items-center">
            <i class="fa-solid fa-user-plus"></i>
          </div>
          <div className="font-bold flex items-center">Your following</div>
        </button>
        <button
          onClick={() => setSection("list-friend")}
          className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]"
        >
          <div className="mx-4 flex items-center">
            <i class="fa-solid fa-user-plus"></i>
          </div>
          <div className="font-bold flex items-center">Your friends</div>
        </button>
        <button
          onClick={() => setSection("list-follower")}
          className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]"
        >
           <div className="mx-4 flex items-center">
            <i class="fa-solid fa-user-plus"></i>
          </div>
          <div className="font-bold flex items-center">Friend suggestions</div>
        </button>
      </div>
    </div>
  );
};

export default FriendSidebar;
