import React, { useState } from "react";

const MemberCard = () => {

  return (
    <div className="bg-gray-50 p-3 rounded flex justify-between items-center mb-3">
      <div className="flex items-center gap-3">
        <img
          src="https://th.bing.com/th/id/OIP.EKontM__37mRqxwRkIqX8wHaEK?rs=1&pid=ImgDetMain"
          className="w-10 h-10 rounded-full"
          alt="Member"
        />
        <div>
          <p className="font-bold text-left">Minh Uyen</p>
          <p className="text-xs text-gray-500">Joined: May 20, 2025</p>
          <p className="text-xs text-left  text-gray-500">Kien Giang</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-blue-100 text-blue-500 px-4 py-2 text-sm rounded hover:bg-blue-300">
          Add Friend
        </button>
        <button className="bg-blue-100 text-blue-500 px-4 py-2 text-sm rounded hover:bg-red-200">
          Remove
        </button>
        
      </div>
    </div>
  );
};

export default MemberCard;
