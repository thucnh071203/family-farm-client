import React from "react";
import { useNavigate } from "react-router-dom";

const YourGroupCard = ({ group }) => {
  const navigate = useNavigate();

  const handleViewGroup = () => {
    navigate(`/group/${group.groupId}`);
  };
  return (
    <div className="group w-60 md:w-[267px] h-72 md:h-[24rem] shadow-md relative rounded-md overflow-hidden">
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
        <div className="absolute z-10 md:top-[57%] top-[48%]">
          <p className="text-xs font-semibold text-[#5596E6] flex justify-end pt-2 pr-3">
            Members: {group.numberMember}
          </p>
          <p className="font-bold text-sm md:text-base text-[#393A4F] text-left pl-3 pt-3">
            {group.groupName}
          </p>
          <div className="mt-7 flex gap-2 justify-center">
            <button className="hover:bg-[rgba(61,179,251,0.14)] p-2 md:p-3 text-[#E74C3C] rounded-lg">
              <i class="fa-solid fa-arrow-right-from-bracket px-2"></i>Leave
            </button>
            <button
              onClick={handleViewGroup}
              className="hover:bg-[rgba(61,179,251,0.14)] p-2 md:p-3 text-[#5596E6] rounded-lg"
            >
              <i class="fa-solid fa-eye px-2"></i>View Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourGroupCard;
