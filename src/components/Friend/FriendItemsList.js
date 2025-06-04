import React from "react";
import { Link } from "react-router-dom";
import FriendItem from "./FriendItem";

const FriendList = ({ friends }) => {
  const defaultFriends = [
    { name: "Dang Khoa", city: "Can Tho", status: null , roleId: "expert"},
    { name: "Huu Thuc", city: "Can Tho", status: "pending" },
    { name: "Mai Xuan", city: "An Giang", status: "friend" },
    { name: "Minh Uyen", city: "Kien Giang", status: "following" },
  ];
  const friendList = friends || defaultFriends;

  const defaultFriend = {
    name: "Mai Xuan",
    avatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
    status: null,
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-3">Friends ({friendList.length})</h2>
        <Link className="text-blue-800" to="/UserFriends">
          See all
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {friendList.map((friend) => (
          <FriendItem 
            key={friend.name} 
            friend={{ ...defaultFriend, ...friend }} 
          />
        ))}
      </div>
    </div>
  );
};

export default FriendList;