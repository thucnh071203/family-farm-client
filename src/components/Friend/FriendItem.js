import React from "react";
import FriendActionButton from "./FriendActionButton";

const FriendItem = ({ friend }) => {
  const defaultFriend = {
    name: "Mai Xuan",
    avatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
    status: null, // null, "pending", "friend", or "following"
  };
  const friendData = { ...defaultFriend, ...friend };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img
          src={friendData.avatar}
          alt={`Friend ${friendData.name}`}
          className="w-10 h-10 rounded-full"
        />
        <span>{friendData.name}</span>
      </div>
      <FriendActionButton status={friendData.status} />
    </div>
  );
};

export default FriendItem;