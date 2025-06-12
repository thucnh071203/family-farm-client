import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
const MemberCard = ({ member, userRole, userAccId, reload }) => {
  const handleAccept = async () => {
    try {
      const response = await fetch(`/api/friends/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendId: member.accountId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add friend");
      }

      alert("Friend added successfully!");
      // Optionally refresh list or update UI
    } catch (error) {
      console.error(error);
      alert("Error adding friend.");
    }
  };

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }
      const response = await fetch(
        `https://localhost:7280/api/group-member/delete/${member.groupMemberId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove friend");
      }
      reload();
      toast.success("REMOVE MEMBER SUCCESSFULLY!");
      // Optionally refresh list or update UI
    } catch (error) {
      console.error(error);
      toast.error("FAIL TO REMOVE MEMBER!");
    }
  };

  return (
    <div className="bg-gray-50 p-3 rounded flex justify-between items-center mb-3">
      <div className="flex items-center gap-3">
        <img
          src={
            member.avatar ||
            "https://th.bing.com/th/id/OIP.EKontM__37mRqxwRkIqX8wHaEK?rs=1&pid=ImgDetMain"
          }
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />
        <div>
          <p className="font-bold text-left">{member.fullName}</p>
          <p className="text-xs text-gray-500">
            Joined:{new Date(member.jointAt).toLocaleDateString("vi-VN")}{" "}
            &nbsp;&nbsp;{" "}
          </p>
          <p className="text-xs text-left  text-gray-500">{member.city}</p>
        </div>
      </div>
      {member.accId !== userAccId && (
        <div className="flex items-center gap-2">
          <button className="bg-blue-100 text-blue-500 px-4 py-2 text-sm rounded hover:bg-blue-300">
            Add Friend
          </button>

          {userRole && (
            <>
              {userRole === "680ce8722b3eec497a30201e" && (
                <button
                  onClick={handleRemove}
                  className="bg-blue-100 text-blue-500 px-4 py-2 text-sm rounded hover:bg-red-200"
                >
                  Remove
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberCard;
