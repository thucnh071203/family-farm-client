import React, { useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const SuggestionGroupCard = ({ group, member }) => {
  const handleClick = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "https://localhost:7280/api/friend/send-friend-request",
        // { receiverId: friend.accId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Giả sử response.data là boolean hoặc có field isSuccess
      if (response.status === 200 && response.data === true) {
        toast.success("You sent the request successfully!");

        // Nếu có callback để reload danh sách
        // if (onActionComplete) {
        //   //onActionComplete();
        // }
      } else {
        toast.error("Failed to send request.");
      }
    } catch (error) {
      console.error("Error during friend action:", error);
      toast.error("An error occurred while processing the action.");
    }
  };

  return (
    <div className="group w-60 md:w-[267px] h-52 md:h-[20rem] shadow-md relative rounded-md overflow-hidden">
      <img
        alt="background"
        src={group.groupBackground || "https://gameroom.ee/83571/minecraft.jpg"}
        className="h-[50%] md:h-[58%] object-cover hover:absolute hover:inset-0 w-full hover:h-full hover:object-cover hover:z-0 transition-transform duration-1000 ease-in-out hover:scale-125 hover:opacity-20"
      />

      <div>
        <div className="absolute top-[43%] md:top-[50%] left-4 z-10">
          <img
            className="rounded-full w-10 h-10 md:w-[60px] md:h-[60px] object-fill "
            src={group.groupAvatar || "https://gameroom.ee/83571/minecraft.jpg"}
            alt="avatar"
          />
        </div>
        <div className="absolute top-[53%] md:top-[57%] right-1 z-10">
          <p className="text-xs font-semibold text-[#5596E6] items-end pt-1 pr-3">
            Members: {member}
          </p>
        </div>
        <div className="absolute z-10 md:top-[58%] top-[48%]">
          <p className="font-bold text-sm md:text-base text-[#393A4F] text-left pl-5 pt-9">
            {group.groupName}
          </p>
        </div>
        <div className="mt-7 items-center pt-5 absolute z-10 md:top-[65%] top-[48%] right-14 left-14">
          <button className="bg-[rgba(61,179,251,0.14)] p-2 px-3 md:p-3 text-[#5596E6] rounded-2xl font-bold">
            Join Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionGroupCard;
