import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import FileReview from "./FileReview";
const AccountSencorDetail = ({ account }) => {
  const [open, setOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState({ url: "", mime: "" });

  const getMimeTypeFromUrl = (url) => {
    if (!url) return "";
    const cleanUrl = url.split("?")[0]; // Bỏ query string
    const ext = cleanUrl.split(".").pop().toLowerCase();

    switch (ext) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "pdf":
        return "application/pdf";
      case "doc":
        return "application/msword";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      default:
        return "unknown";
    }
  };

  const openCertificate = () => {
    const mime = getMimeTypeFromUrl(account.certificate);
    setFileInfo({ url: account.certificate, mime });
    setOpen(true);
  };

  const navigate = useNavigate();
  const updateCensor = async (status) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `https://localhost:7280/api/account/update-censor/${account.accId}/${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data === true) {
        navigate("/Dashboard");
      }
    } catch (err) {
      console.error("Error fetching account censor:", err.message || err);
    } finally {
    }
  };

  return (
    <div className="ml-20 mt-3 ">
      <div className="flex">
        <div className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.52734 13V8.5H9.52734V13H13.2773V7H15.5273L8.02734 0.25L0.527344 7H2.77734V13H6.52734Z"
              fill="rgba(62,63,94,0.25)"
            />
          </svg>
          <Link to={"/Dashboard"}>HOME</Link>
        </div>
        <span className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          <Link to="/ListCensor">/Account Censor</Link>
        </span>
      </div>

      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-4">
        ACCOUNT SENSOR
      </h1>
      <div className="mt-4 text-left bg-[rgba(61,179,251,0.1)] w-[80%] rounded-xl">
        <div className="p-4">
          <p className="text-left">
            A user has just created an account with the expert role. Please
            check this user's information and allow creation or not!
          </p>
          <div className="mt-8 flex gap-6 text-white">
            <button
              onClick={() => updateCensor(1)}
              className="px-7 pt-2 pb-2 bg-[#EF3E36] rounded-lg"
            >
              Refuse
            </button>
            <button
              onClick={() => updateCensor(0)}
              className="px-7 pt-2 pb-2 bg-[#3DB3FB] rounded-lg"
            >
              Allow
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-[80%] align-middle items-center mt-10 font-bold">
        <img
          className="rounded-full w-[40px] h-[40px] object-cover mr-4"
          src={
            account.avatar ||
            "https://th.bing.com/th/id/OIP.UOAPhQfUAJFR_ynpnMtWqgHaEJ?w=326&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          }
          alt=""
        />
        <p>{account.fullName}</p>
        <p>-</p>
        <p className="bg-[rgba(43,182,115,0.25)] p-2">
          {account.roleId === "68007b2a87b41211f0af1d57" ? "Expert" : "Farmer"}
        </p>
      </div>
      <div className="w-[80%] mt-7 bg-white">
        <div className="flex text-left items-center">
          <div
            className="pt-4 pb-4"
            style={{ borderRight: "1px solid rgba(128, 128, 128, 0.5)" }}
          >
            <p className="w-[180px] pl-4">Full Name</p>
          </div>

          <p className="pl-4 ">{account.fullName}</p>
        </div>
        <div className="flex text-left items-center">
          <div
            className="pt-4 pb-4"
            style={{ borderRight: "1px solid rgba(128, 128, 128, 0.5)" }}
          >
            <p className="w-[180px] pl-4">Username</p>
          </div>
          <p className="text-left pl-4">{account.username}</p>
        </div>
        <div className="flex text-left items-center">
          <div
            className="pt-4 pb-4"
            style={{ borderRight: "1px solid rgba(128, 128, 128, 0.5)" }}
          >
            <p className="w-[180px] pl-4">Address</p>
          </div>
          <p className="text-left pl-4 ">{account.address}</p>
        </div>
        <div className="flex text-left items-center">
          <div
            className="pt-4 pb-4"
            style={{ borderRight: "1px solid rgba(128, 128, 128, 0.5)" }}
          >
            <p className="w-[180px] pl-4">Phone</p>
          </div>
          <p className="text-left pl-4 ">{account.phoneNumber}</p>
        </div>
        <div className="flex text-left items-center">
          <div
            className="pt-4 pb-4"
            style={{ borderRight: "1px solid rgba(128, 128, 128, 0.5)" }}
          >
            <p className="w-[180px] pl-4">Email</p>
          </div>
          <p className="text-left pl-4 ">{account.email}</p>
        </div>
        <div className="flex text-left items-center">
          <div
            className="pt-4 pb-4 "
            style={{ borderRight: "1px solid rgba(128, 128, 128, 0.5)" }}
          >
            <p className="w-[180px] pl-4">Work at</p>
          </div>
          <p className="text-left pl-4 ">{account.workAt || "Fpt"}</p>
        </div>
        <div className="flex text-left items-center">
          <div
            className="pt-4 pb-4"
            style={{ borderRight: "1px solid rgba(128, 128, 128, 0.5)" }}
          >
            <p className="w-[180px] pl-4">Study at</p>
          </div>
          <p className="text-left pl-4 ">{account.studyAt || "Fpt"}</p>
        </div>
        <div className="flex text-left items-center">
          <div
            className="pt-4 pb-4"
            style={{ borderRight: "1px solid rgba(128, 128, 128, 0.5)" }}
          >
            <p className="w-[180px] pl-4 ">Certificate</p>
          </div>
          {/* <p className="text-left pl-4 ">{account.certificate}</p> */}
          {account.certificate ? (
            <button
              onClick={openCertificate}
              className="pl-4 text-blue-600 underline"
            >
              View certificate
            </button>
          ) : (
            <p className="pl-4">None</p>
          )}
        </div>
      </div>

      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          className="relative z-50"
        >
          {/* backdrop */}
          {/* <div className="fixed inset-0 bg-black/40" aria-hidden="true" /> */}

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-4xl bg-white rounded-lg p-4">
              {/* <div className="flex justify-between items-center mb-2">
                <Dialog.Title className="text-lg font-semibold">
                  Certificate Preview
                </Dialog.Title>
                <button
                  onClick={() => setOpen(false)}
                  className="text-xl font-bold text-red-500"
                >
                  ×
                </button>
              </div> */}

              {/* hiển thị file */}
              <FileReview
                url={fileInfo.url}
                mime={fileInfo.mime}
                onClose={() => setOpen(false)}
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default AccountSencorDetail;
