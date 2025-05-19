import React from "react";
import FriendActionButton from "./FriendActionButton";
import UserFriends from "../../pages/Profile/UserFriends";
import { Link } from "react-router-dom";

const FriendList = ({ friends }) => {
  const defaultFriends = [
    { name: "Dang Khoa", status: null },
    { name: "Huu Thuc", status: "pending" },
    { name: "Mai Xuan", status: "friend" },
    { name: "Minh Uyen", status: "following" },
  ];
  const friendList = friends || defaultFriends;

  const defaultFriend = {
    name: "Mai Xuan",
    avatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
    status: null, // null, "pending", "friend", or "following"
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
        {friendList.map((friend) => {
          const friendData = { ...defaultFriend, ...friend };
          return (
            <div key={friendData.name} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={friendData.avatar}
                  alt={`Friend ${ friendData.name}`}
                  className="w-10 h-10 rounded-full"
                />
                <span>{friendData.name}</span>
              </div>
              <FriendActionButton status={friendData.status} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendList;