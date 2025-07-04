import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TablePostOfAccount from "./TablePostOfAccount";
import TableServiceAccount from "./TableServiceAccount";

const AccountDetail = ({ account, listPost, listService }) => {
  const [activeTab, setActiveTab] = useState("basic");
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
          / Account Management
        </span>
        <span className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          / Account Detail
        </span>
      </div>

      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-4">
        ACCOUNT MANAGEMENT
      </h1>
      <div className="mt-6 text-left ">
        <div className="flex space-x-6 mt-2 text-sm text-black-500 font-bold text-center ">
          <button
            onClick={() => setActiveTab("basic")}
            className="w-[15%] hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB]"
          >
            Basic information
          </button>
          <button
            onClick={() => setActiveTab("post")}
            className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%]"
          >
            Post
          </button>
          <button
            onClick={() => setActiveTab("service")}
            className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%] "
          >
            Service
          </button>
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
      {/* bg-[rgba(61,179,251,0.1)] w-[80%] rounded-xl */}

      {activeTab === "basic" && (
        <div className="w-[80%] mt-7 bg-white">
          <div className="flex text-left items-center">
            <div className="pt-4 pb-4">
              <p className="w-[180px] pl-4">Full Name</p>
            </div>

            <p
              className="pl-4 p-3  text-black w-full rounded-sm"
              style={{ border: "0.5px solid #d1d5db" }}
            >
              {account.fullName}
            </p>
          </div>
          <div className="flex text-left items-center">
            <div className="pt-4 pb-4">
              <p className="w-[180px] pl-4">Username</p>
            </div>
            <p
               className="pl-4 p-3  text-black w-full rounded-sm"
               style={{ border: "0.5px solid #d1d5db" }}
            >
              {account.username}
            </p>
          </div>
          <div className="flex text-left items-center">
            <div className="pt-4 pb-4">
              <p className="w-[180px] pl-4">Address</p>
            </div>
            <p  className="pl-4 p-3  text-black w-full rounded-sm"
              style={{ border: "0.5px solid #d1d5db" }}>{account.address}</p>
          </div>
          <div className="flex text-left items-center">
            <div className="pt-4 pb-4">
              <p className="w-[180px] pl-4">Phone</p>
            </div>
            <p  className="pl-4 p-3  text-black w-full rounded-sm"
              style={{ border: "0.5px solid #d1d5db" }}>{account.phoneNumber}</p>
          </div>
          <div className="flex text-left items-center">
            <div className="pt-4 pb-4">
              <p className="w-[180px] pl-4">Email</p>
            </div>
            <p  className="pl-4 p-3  text-black w-full rounded-sm"
              style={{ border: "0.5px solid #d1d5db" }}>{account.email}</p>
          </div>
          <div className="flex text-left items-center">
            <div className="pt-4 pb-4">
              <p className="w-[180px] pl-4">Gender</p>
            </div>
            <p  className="pl-4 p-3  text-black w-full rounded-sm"
              style={{ border: "0.5px solid #d1d5db" }}>{account.gender}</p>
          </div>
          <div className="flex text-left items-center">
            <div className="pt-4 pb-4">
              <p className="w-[180px] pl-4">Birthday</p>
            </div>
            <p  className="pl-4 p-3  text-black w-full rounded-sm"
              style={{ border: "0.5px solid #d1d5db" }}>
              {new Date(account.birthday).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      )}

      {activeTab === "post" && (
        <div className="w-[80%] mt-7 bg-white">
          {/* Hiển thị danh sách post hoặc component PostDetail */}
          <TablePostOfAccount key={account.accId} listPost={listPost} />
          {/* <PostComponent listPost={listPost} /> nếu bạn có component riêng */}
        </div>
      )}

      {activeTab === "service" && (
        <div className="w-[80%] mt-7 bg-white">
          {/* Hiển thị danh sách service hoặc component ServiceDetail */}
          <TableServiceAccount key={account.accId} listService={listService} />
          {/* <ServiceComponent listService={listService} /> nếu bạn có component riêng */}
        </div>
      )}
    </div>
  );
};

export default AccountDetail;
