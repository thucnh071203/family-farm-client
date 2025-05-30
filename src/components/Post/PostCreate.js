import React, { useState } from "react";
import PostCreatePopup from "./PostCreatePopup";

const PostCreate = ({ profileImage }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-white p-3 rounded-lg shadow-md border text-left"
      onClick={() => setShowPopup(true)}>
      <button
        className="font-bold rounded-md pb-4"
      >
        <i className="fa-solid fa-pencil"></i> Publish
      </button>
      <div className="flex items-center gap-3">
        <img
          src={
            profileImage ||
            "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
          }
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="Write something about you"
          className="flex-grow p-2 border border-gray-300 rounded-full"
        />
      </div>
      {showPopup && <PostCreatePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default PostCreate;