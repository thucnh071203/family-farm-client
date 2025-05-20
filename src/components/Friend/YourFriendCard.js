import React from "react";

const YourFriendCard = ({ friend }) => {
  return (
    <div className="bg-white rounded-[10px] border shadow-[0_4px_6px_rgba(0,0,0,0.45)]">
      <div className="mt-3 h-6">
        {friend.mutualFriend !== 0 && (
          <div className="mt-3 w-[75px] h-6 bg-blue-500 flex items-center justify-center rounded-e-xl">
            <p className="text-white font-bold" style={{ fontSize: "8px" }}>
              {friend.mutualFriend} mutual friends
            </p>
          </div>
        )}
      </div>

      <div className="items-center flex flex-col gap-1 p-4">
        <div className="rounded-[50px]">
          <img
            className="rounded-full w-[60px] h-[60px] object-fill"
            src={
              friend.avatar ||
              "https://i.pinimg.com/originals/d0/28/68/d0286806706a508645e8763c6b3f8cea.jpg"
            }
            alt="avatar"
          />
        </div>
        <div className="flex items-center flex-col gap-1">
          <p className="text-base font-bold">{friend.username || "Mai Xuan"}</p>
          <p className="text-base font-normal text-[#999999]">
            {friend.city || "From Can Tho"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourFriendCard;
