import React, { useEffect, useState } from "react";
import MoreIcon from "../../assets/images/more_horiz.svg";
import namDeleteIcon from "../../assets/icons/nam_delete.svg"
import namEditIcon from "../../assets/icons/nam_edit.svg"
import namReportIcon from "../../assets/icons/nam_report_flag.svg"
import namSavePost from "../../assets/icons/nam_savepost.svg"
import { useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ReportModal from "./ReportModal"; // Import component mới

const OptionsPost = ({ isSavedPost, setIsSavedPost, onRestore, onHardDelete, isDeleted, onDeletePost, postIdParam, isOwnerParam }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [postId, setPostId] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false); // State cho report modal

  useEffect(() => {
    setPostId(postIdParam);
    setIsOwner(isOwnerParam);
    const storedAccessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    setAccessToken(storedAccessToken);
  }, [postIdParam, isOwnerParam]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Đóng popup khi click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPopup && !event.target.closest('.relative')) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  const handleReportClick = () => {
    setShowPopup(false); // Đóng popup options
    setShowReportModal(true); // Mở report modal
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
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
          {/* QUYỀN CHO OWNER  */}
          {isOwner ? (
            !isDeleted ? (
              <>
                {/* Edit option */}
                <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <img src={namEditIcon} alt="edit" className="h-5" />
                  <p className="flex flex-col items-start gap-1">
                    Edit Post
                    <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                      Modify your post
                    </p>
                  </p>
                </div>
                
                {/* Delete option */}
                <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <img src={namDeleteIcon} alt="delete" className="h-5" />
                  <p className="flex flex-col items-start gap-1">
                    Delete Post
                    <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                      Move to trash
                    </p>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Restore option */}
                <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <i className="fas fa-undo h-5"></i>
                  <p className="flex flex-col items-start gap-1">
                    Restore Post
                    <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                      Restore from trash
                    </p>
                  </p>
                </div>
                
                {/* Hard delete option */}
                <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <img src={namDeleteIcon} alt="delete permanently" className="h-5" />
                  <p className="flex flex-col items-start gap-1">
                    Delete Permanently
                    <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                      Cannot be undone
                    </p>
                  </p>
                </div>
              </>
            )
          ) : (
            <>
              {/* Save post option */}
              <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <img src={namSavePost} alt="save" className="h-5" />
                <p className="flex flex-col items-start gap-1">
                  {isSavedPost ? 'Unsave Post' : 'Save Post'}
                  <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                    {isSavedPost ? 'Remove from saved' : 'Add to saved posts'}
                  </p>
                </p>
              </div>

              {/* Report option */}
              <div 
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={handleReportClick}
              >
                <img src={namReportIcon} alt="report" className="h-5" />
                <p className="flex flex-col items-start gap-1">
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

      {/* Report Modal */}
      <ReportModal 
        isOpen={showReportModal}
        onClose={handleCloseReportModal}
        postId={postId}
      />
    </div>
  );
};

export default OptionsPost;
