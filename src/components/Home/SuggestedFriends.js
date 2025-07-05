import React, { useState } from "react";
import { Link } from "react-router-dom";
import FriendItem from "../Friend/FriendItem";
import axios from "axios";

const SuggestedFriends = ({ friends, onLoadList }) => {
  const defaultFriends = [
    { name: "Dang Khoa", city: "Can Tho", status: null },
    { name: "Huu Thuc", city: "Can Tho", status: null },
    { name: "Mai Xuan", city: "An Giang", status: null },
    { name: "Minh Uyen", city: "Kien Giang", status: null },
  ];
  const friendList = friends || defaultFriends;

  const defaultFriend = {
    name: "Mai Xuan",
    avatar:
      "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
    status: null,
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-3">Suggested Friends</h2>
      </div>

      <div className="flex flex-col gap-3">
        {friendList.length > 0 ? (
          friendList.map((friend) => (
            <FriendItem
              key={friend.accId}
              friend={{ ...defaultFriend, ...friend }}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No data to display...</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedFriends;
