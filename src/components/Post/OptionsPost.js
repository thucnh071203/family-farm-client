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

const OptionsPost = ({ onRestore, onHardDelete, isDeleted, onDeletePost, postIdParam, isOwnerParam }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [postId, setPostId] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  //lấy thông tin người dùng từ storage
  useEffect(() => {
    const storedAccId = localStorage.getItem("accId") || sessionStorage.getItem("accId");
    const storedAccesstoken = localStorage.getItem("accessToken");
    if (storedAccId) {
      setAccessToken(storedAccesstoken);
    }
  }, []);

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

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "The post will be moved to the trash.",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'bg-red-300 hover:bg-red-600 text-white px-4 py-2 rounded mx-3',
        cancelButton: 'bg-blue-300 hover:bg-blue-600 text-white px-4 py-2 rounded',
      },
      confirmButtonText: 'Yes, delete it!',
      buttonsStyling: false
    });
    if (!result.isConfirmed) return;

    try {
      const response = await instance.delete(`/api/post/soft-delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        toast.success("Deleted post successfully. Please view in trash!");
        onDeletePost(postId);
      }

    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete post. Please try again later.');
    }
  }

  const handleRestore = async () => {
    try {
      const response = await instance.put(`/api/post/restore/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        toast.success("Restored successfully!");
        onRestore(postId);  
      } else {
        toast.error("Restore failed!");
      }
    } catch (err) {
      toast.error("Error while restoring");
    }
  }

  const handleHardDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "The post will be completely deleted from the system.",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'bg-red-300 hover:bg-red-600 text-white px-4 py-2 rounded mx-3',
        cancelButton: 'bg-blue-300 hover:bg-blue-600 text-white px-4 py-2 rounded',
      },
      confirmButtonText: 'Yes, delete it!',
      buttonsStyling: false
    });
    if (!result.isConfirmed) return;

    try {
      const response = await instance.delete(`/api/post/hard-delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        toast.success("Deleted post successfully!");
        onHardDelete(postId);
      }

    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete post. Please try again later.');
    }
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
          {isOwner ? (
            !isDeleted ? (
              <>
                <div className="flex items-center gap-2" style={{ cursor: "pointer" }} onClick={() => handleClickToUpdate(postId)}>
                  <img src={namEditIcon} alt="edit" className="h-5" />
                  <p className=" flex flex-col items-start gap-1">
                    Edit
                    <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                      Change post content
                    </p>
                  </p>
                </div>

                <div style={{ cursor: "pointer" }} onClick={handleDelete} className="flex items-center gap-2">
                  <img src={namDeleteIcon} alt="delete" className="h-5" />
                  <p className=" flex flex-col items-start gap-1">
                    Delete
                    <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                      The post will be moved to the trash.
                    </p>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2" style={{ cursor: "pointer" }} onClick={handleRestore}>
                  <img src={namEditIcon} alt="edit" className="h-5" />
                  <p className=" flex flex-col items-start gap-1">
                    Restore
                    <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                      Change status of post
                    </p>
                  </p>
                </div>

                <div style={{ cursor: "pointer" }} onClick={handleHardDelete} className="flex items-center gap-2">
                  <img src={namDeleteIcon} alt="delete" className="h-5" />
                  <p className=" flex flex-col items-start gap-1">
                    Delete from trash
                    <p className="font-light text-[10px] text-[#9195AE] opacity-50">
                      The post will be completely deleted from the system.
                    </p>
                  </p>
                </div>
              </>
            )
          ) : (
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
          )
          }

        </div>
      )}
    </div>
  );
};

export default OptionsPost;
