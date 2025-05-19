import React from "react";
import FriendItem from "./FriendItem";

const FriendList = ({ friends }) => {
  const defaultFriends = [
    { name: "Dang Khoa", status: null },
    { name: "Huu Thuc", status: "pending" },
    { name: "Mai Xuan", status: "friend" },
    { name: "Minh Uyen", status: "following" },
  ];
  const friendList = friends || defaultFriends;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-3">Friends ({friendList.length})</h2>
        <a className="text-blue-800" href="#">
          See all
        </a>
      </div>
      <div className="flex flex-col gap-3">
        {friendList.map((friend) => (
          <FriendItem key={friend.name} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendList;