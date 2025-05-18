import React from "react";

const FriendItem = ({ friend }) => {
  const defaultFriend = {
    name: "Mai Xuan",
    avatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
    status: null, // null, "pending", "friend", or "following"
  };
  const friendData = { ...defaultFriend, ...friend };

  // Xác định nút hành động dựa trên status
  let buttonContent = null;
  if (!friendData.status || friendData.status === "") {
    buttonContent = (
      <button className="p-1 bg-blue-600 text-white font-bold rounded-md w-32">
        <i className="fa fa-user-plus"></i> Add friend
      </button>
    );
  } else if (friendData.status === "pending") {
    buttonContent = (
      <button className="p-1 bg-orange-600 text-white font-bold rounded-md w-32">
        <i className="fa-solid fa-ban"></i> Cancel
      </button>
    );
  // } else if (friendData.status === "friend") {
  //   buttonContent = (
  //     <button className="p-1 bg-red-600 text-white font-bold rounded-md w-32">
  //       <i className="fa-solid fa-user-minus"></i> Unfriend
  //     </button>
  //   );
  // } else if (friendData.status === "following") {
  //   buttonContent = (
  //     <button className="p-1 bg-red-600 text-white font-bold rounded-md w-32">
  //       <i className="fa-solid fa-user-minus"></i> Unfollow
  //     </button>
  //   );
  }

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
      {buttonContent}
    </div>
  );
};

export default FriendItem;