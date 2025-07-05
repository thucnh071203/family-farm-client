import React from "react";
import FriendActionButton from "./FriendActionButton";
import { useNavigate } from "react-router-dom";
const FriendItem = ({ friend, isOwner, isProfile }) => {
  const navigate = useNavigate();
  const handleClickToProfile = (accId) => {
    navigate(`/PersonalPage/${accId}`);
  };
  return (
    <div className="flex justify-between items-center text-left">
      <div className="flex items-center gap-2">
        <img
          onClick={() => handleClickToProfile(friend.accId)}
          src={
            friend.avatar ||
            "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
          }
          alt={`Friend ${friend.username}`}
          className="w-9 h-9 rounded-full"
          style={{ cursor: "pointer" }}
        />
        <div className="flex flex-col gap-1">
          <span>{friend.username}</span>
          <span className="text-[10px] text-gray-600">{friend.city}</span>
        </div>
      </div>
      {(isOwner === true || isProfile !== true) && (
        <FriendActionButton
          status={friend.friendStatus}
          roleId={friend.roleId}
          accId={friend.accId}
        />
      )}
    </div>
  );
};

export default FriendItem;
