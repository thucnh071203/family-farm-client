import React from "react";
import { useNavigate } from "react-router-dom";
const YourGroupDetailItem = ({ group }) => {
  const navigate = useNavigate();

  const handleViewGroup = () => {
    navigate(`/group/${group.groupId}`);
  };

  return (
    <div className="flex justify-between items-center text-left">
      <div className="flex items-center gap-2">
        <img
          src={group.avatar || "https://gameroom.ee/83571/minecraft.jpg"}
          alt={group.avatar}
          className="w-9 h-9 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="ml-2">{group.groupName}</span>
          <button
            onClick={handleViewGroup}
            className="hover:bg-[rgba(61,179,251,0.14)] p-1 text-[#5596E6] rounded-lg text-sm"
          >
            <i class="fa-solid fa-eye px-1"></i>View Group
          </button>
        </div>
      </div>
      <button className="hover:bg-[rgba(61,179,251,0.14)] p-1 text-[#E74C3C] rounded-lg text-sm">
        <i class="fa-solid fa-arrow-right-from-bracket px-1"></i>Leave
      </button>
    </div>
  );
};

export default YourGroupDetailItem;
