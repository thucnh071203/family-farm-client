import React from "react";
import { Link } from "react-router-dom";

const FriendSidebar = ({ roleId }) => {
  return (
    <div
      className="w-[289px] h-screen bg-[#E5E4E9] font-roboto rounded-r-[10px] hidden md:block
    md:mt-[120px]"
    >
      <div className="ml-8 pt-6 flex items-start">
        <p className="text-lg font-bold ">FRIEND PAGE</p>
      </div>

      <div className="mx-8 mt-11 w-[225px] h-auto flex flex-col gap-4">
        <Link to="/friend/requests-receive">
          <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
            <div className="mx-4 flex items-center">
              <i className="fa-solid fa-user-group"></i>
            </div>
            <div className="font-bold flex items-center">Friend Request</div>
          </button>
        </Link>

        <Link to="/friend/requests-sent">
          <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
            <div className="mx-4 flex items-center">
              <i className="fa-solid fa-user-group"></i>
            </div>
            <div className="font-bold flex items-center">Sent Friend Request</div>
          </button>
        </Link>

        {roleId === "68007b2a87b41211f0af1d57" && ( // Expert
          <Link to="/friend/list-follower">
            <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
              <div className="mx-4 flex items-center">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <div className="font-bold flex items-center">Your follower</div>
            </button>
          </Link>
        )}

        {roleId === "68007b0387b41211f0af1d56" && ( // Farmer
          <Link to="/friend/list-following">
            <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
              <div className="mx-4 flex items-center">
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <div className="font-bold flex items-center">Your following</div>
            </button>
          </Link>
        )}

        {/* Shared by both roles */}
        <Link to="/friend">
          <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
            <div className="mx-4 flex items-center">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div className="font-bold flex items-center">Your friends</div>
          </button>
        </Link>

        <Link to="/friend/suggestion-friend">
          <button className="hover:bg-[#999999] flex w-full h-10 rounded-[10px]">
            <div className="mx-4 flex items-center">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div className="font-bold flex items-center">Friend suggestions</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FriendSidebar;
