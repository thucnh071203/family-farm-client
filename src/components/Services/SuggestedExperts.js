import React from "react";
import { Link } from "react-router-dom";
import FriendItem from "../Friend/FriendItem";

const SuggestedExperts = ({ friends, onLoadList }) => {
  const defaultFriends = [
    { name: "Dang Khoa", city: "Can Tho", status: null, roleId: "expert" },
    { name: "Huu Thuc", city: "Can Tho", status: null, roleId: "expert" },
    { name: "Mai Xuan", city: "An Giang", status: null, roleId: "expert" },
    { name: "Minh Uyen", city: "Kien Giang", status: null, roleId: "expert" },
  ];
  const friendList = Array.isArray(friends) ? friends : defaultFriends;

  const defaultFriend = {
    name: "Mai Xuan",
    avatar:
      "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
    status: null,
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-3">Suggested Experts</h2>
      </div>
      <div className="flex flex-col gap-3">
        {(Array.isArray(friendList) ? friendList : []).map((friend) => (
          <FriendItem
            key={friend.accId || friend.name}
            friend={{ ...defaultFriend, ...friend }}
            onLoadList={onLoadList}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedExperts;
