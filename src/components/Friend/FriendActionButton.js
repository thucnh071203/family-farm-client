import React from "react";

const FriendActionButton = ({ status, roleId }) => {
  const buttonConfig = {
    null: {
      text: "Add friend",
      icon: "fa-user-plus",
      bgColor: "bg-[#3DB3FB]",
      hoverColor: "hover:bg-blue-700",
    },
    "": {
      text: "Add friend",
      icon: "fa-user-plus",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
    pending: {
      text: "Cancel",
      icon: "fa-ban",
      bgColor: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
    },
    friend: {
      text: "Unfriend",
      icon: "fa-user-minus",
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
    },
    following: {
      text: "Unfollow",
      icon: "fa-user-minus",
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
    },
    expert: {
      text: "Follow",
      icon: "fa-user-plus",
      bgColor: "bg-[#3DB3FB]",
      hoverColor: "hover:bg-blue-700",
    },
  };

  // Select config based on status and roleId
  const config = status === null && roleId === "expert" ? buttonConfig.expert : buttonConfig[status] || buttonConfig.null;

  return (
    <button className={`p-1 ${config.bgColor} ${config.hoverColor} text-white text-sm font-bold rounded-md w-28 transition`}>
      <i className={`fa-solid ${config.icon} mr-2`}></i>
      {config.text}
    </button>
  );
};

export default FriendActionButton;