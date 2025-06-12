import React, { useEffect, useState } from "react";
import MoreIcon from "../../assets/images/more_horiz.svg";
import namDeleteIcon from "../../assets/icons/nam_delete.svg"
import namEditIcon from "../../assets/icons/nam_edit.svg"
import namReportIcon from "../../assets/icons/nam_report_flag.svg"
import namSavePost from "../../assets/icons/nam_savepost.svg"
import { useNavigate } from "react-router-dom";

const OptionsPost = ({ postIdParam, isOwnerParam }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [postId, setPostId] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  useEffect(() => {
    setPostId(postIdParam);
    setIsOwner(isOwnerParam)
  }, [postIdParam, isOwnerParam])
  
  const handleClickToUpdate = () => {
    navigate(`/EditPost/${postId}`);
  }

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
          {/* QUYỀN CHO OWNER  */}
          {isOwner && (
            <>
              <div className="flex items-center gap-2" style={{cursor: "pointer"}} onClick={() => handleClickToUpdate(postId)}>
                <img src={namEditIcon} alt="edit" className="h-5" />
                <p className=" flex flex-col items-start gap-1">
                  Edit
                  <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                    Change post content
                  </p>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <img src={namDeleteIcon} alt="delete" className="h-5" />
                <p className=" flex flex-col items-start gap-1">
                  Delete
                  <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                    The post will be moved to the trash.
                  </p>
                </p>
              </div>
            </>
          )}

          {!isOwner && (
            <>
              <div className="flex items-center gap-2">
                <img src={namSavePost} alt="save" className="h-5" />
                <p className=" flex flex-col items-start gap-1">
                  Save post
                  <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                    Add this post to favourite list
                  </p>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <img src={namReportIcon} alt="report" className="h-5" />
                <p className=" flex flex-col items-start gap-1">
                  Report
                  <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                    Inappropriate content
                  </p>
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionsPost;
