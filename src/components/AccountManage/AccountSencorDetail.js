import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const AccountSencorDetail = ({ account }) => {
  const navigate = useNavigate();
  const updateCensor = async (status) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `https://localhost:7280/api/account/update-censor/${account.accId}/${status}`,
        {
          method: "PUT",
          headers: {
            //Authorization: `Bearer ${token}`,
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
    <div className="ml-20 mt-8">
      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-8">
        ACCOUNT SENSOR
      </h1>
      <div className="mt-8 text-left bg-[rgba(61,179,251,0.1)] w-[80%] rounded-xl">
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
      <div className="w-[80%] mt-7">
        <div className="flex text-left items-center pt-4 pb-4">
          <div>
            <p className="w-[180px]">Full Name</p>
          </div>

          <p>{account.fullName}</p>
        </div>
        <div className="flex text-left items-center pt-4 pb-4">
          <div>
            <p className="w-[180px]">Username</p>
          </div>
          <p className="text-left">{account.username}</p>
        </div>
        <div className="flex text-left items-center pt-4 pb-4">
          <div>
            <p className="w-[180px]">Address</p>
          </div>
          <p className="text-left">{account.address}</p>
        </div>
        <div className="flex text-left items-center pt-4 pb-4">
          <div>
            <p className="w-[180px]">Phone</p>
          </div>
          <p className="text-left">{account.phoneNumber}</p>
        </div>
        <div className="flex text-left items-center pt-4 pb-4">
          <div>
            <p className="w-[180px]">Email</p>
          </div>
          <p className="text-left">{account.email}</p>
        </div>
        <div className="flex text-left items-center pt-4 pb-4">
          <div>
            <p className="w-[180px]">Work at</p>
          </div>
          <p className="text-left">{account.workAt || "Fpt"}</p>
        </div>
        <div className="flex text-left items-center pt-4 pb-4">
          <div>
            <p className="w-[180px]">Study at</p>
          </div>
          <p className="text-left">{account.studyAt || "Fpt"}</p>
        </div>
        <div className="flex text-left items-center pt-4 pb-4">
          <div>
            <p className="w-[180px]">Certificate</p>
          </div>
          <p className="text-left">huuthuc</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSencorDetail;
