import React, { useState } from "react";
import MoreIcon from "../../assets/images/more_horiz.svg";

const OptionsPost = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <img
        src={MoreIcon}
        alt="More options"
        className="cursor-pointer"
        onClick={togglePopup}
      />

      {showPopup && (
        <div className="absolute right-0 mt-1 w-52 bg-white shadow-lg rounded-md p-2 border z-10 flex flex-col gap-2 outline outline-[0.5px] outline-gray-200">
          <div className="flex items-center gap-2">
            <i class="fa-regular fa-bookmark text-yellow-600 px-1"></i>
            <p className=" flex flex-col items-start gap-1">
              Edit
              <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                Add this post to favourite list
              </p>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <i class="fa-regular fa-flag text-red-500 px-1"></i>
            <p className=" flex flex-col items-start gap-1">
              Delete
              <p className="font-light text-[10px] text-[#9195AE] opacity-50">
              Inappropriate content
              </p>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsPost;
