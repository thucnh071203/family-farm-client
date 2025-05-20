import React from "react";

const FriendActionButton = ({ status }) => {
  const buttonConfig = {
    null: {
      text: "Add friend",
      icon: "fa-user-plus",
      bgColor: "bg-blue-600",
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
  };

  const config = buttonConfig[status] || buttonConfig.null;

  return (
    <button className={`p-2 ${config.bgColor} ${config.hoverColor} text-white font-bold rounded-md w-32 transition`}>
      <i className={`fa-solid ${config.icon} mr-2`}></i>
      {config.text}
    </button>
  );
};

export default FriendActionButton;