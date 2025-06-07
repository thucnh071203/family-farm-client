import React from "react";
import FriendActionButton from "./FriendActionButton";

const FriendItem = ({ friend, onLoadList }) => {
  return (
    <div className="flex justify-between items-center text-left">
      <div className="flex items-center gap-2">
        <img
          src={friend.avatar}
          alt={`Friend ${friend.username}`}
          className="w-9 h-9 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span>{friend.username}</span>
          <span className="text-[10px] text-gray-600">{friend.city}</span>
        </div>
      </div>
      <FriendActionButton
        status={friend.status}
        roleId={friend.roleId}
        accId={friend.accId}
        onLoadList={onLoadList}
      />
    </div>
  );
};

export default FriendItem;
