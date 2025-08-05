import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PostManagementDetail = ({ post }) => {
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
          <Link to="/PostManagement">/Post Management</Link>
        </span>
        <span className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          / Post Detail
        </span>
      </div>

      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-4">
        Post detail
      </h1>

      <div className="flex gap-2 w-[80%] align-middle items-center mt-10 font-bold">
        <img
          className="rounded-full w-[40px] h-[40px] object-cover mr-4"
          src={
            post.ownerPost.avatar ||
            "https://th.bing.com/th/id/OIP.UOAPhQfUAJFR_ynpnMtWqgHaEJ?w=326&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          }
          alt=""
        />
        <p>{post.ownerPost.fullName}</p>
        <p>-</p>
        <p className="bg-[rgba(43,182,115,0.25)] p-2">
          {post.ownerPost.roleId === "68007b2a87b41211f0af1d57"
            ? "Expert"
            : "Farmer"}
        </p>
      </div>
      {/* bg-[rgba(61,179,251,0.1)] w-[80%] rounded-xl */}

      <div className="w-[80%] mt-7 bg-white">
        <div className="flex text-left items-center">
          <div className="pt-4 pb-4">
            <p className="w-[180px] pl-4">Content:</p>
          </div>

          <p
            className="pl-4 p-3  text-black w-full rounded-sm"
            style={{ border: "0.5px solid #d1d5db" }}
          >
            {post.post.postContent}
          </p>
        </div>
        <div className="flex text-left items-center">
          <div className="pt-4 pb-4">
            <p className="w-[180px] pl-4">HashTags:</p>
          </div>
          <p
            className="pl-4 p-3  text-black w-full rounded-sm"
            style={{ border: "0.5px solid #d1d5db" }}
          >
            {post.hashTags.map((tag, index) => (
              <span key={index}>#{tag.hashTagContent} </span>
            ))}
          </p>
        </div>
        <div className="flex text-left items-center">
          <div className="pt-4 pb-4">
            <p className="w-[180px] pl-4">Category:</p>
          </div>
          <p
            className="pl-4 p-3  text-black w-full rounded-sm"
            style={{ border: "0.5px solid #d1d5db" }}
          >
            {post.postCategories.map((cat, index) => (
              <span key={index}>#{cat.categoryName} </span>
            ))}
          </p>
        </div>
        <div className="flex text-left items-center">
          <div className="pt-4 pb-4">
            <p className="w-[180px] pl-4">Tag uses:</p>
          </div>
          <p
            className="pl-4 p-3  text-black w-full rounded-sm"
            style={{ border: "0.5px solid #d1d5db" }}
          >
            {post.postTags.map((user, index) => (
              <span key={index}>#{user.username} </span>
            ))}
          </p>
        </div>
        <div className="flex text-left items-center">
          <div className="pt-4 pb-4">
            <p className="w-[180px] pl-4">Images:</p>
          </div>
          <p
            className="pl-4 p-3  text-black w-full flex gap-2"
            style={{ border: "0.5px solid #d1d5db" }}
          >
            {post.postImages.map((postImage, index) => (
              <img
                key={index}
                className="w-[100px] h-[100px] object-cover mr-4"
                src={
                  postImage.imageUrl ||
                  "https://th.bing.com/th/id/OIP.UOAPhQfUAJFR_ynpnMtWqgHaEJ?w=326&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                }
                alt="post image"
              />
            ))}
          </p>
        </div>
      </div>
      <div className="flex justify-start mt-4">
        <button className="font-bold">
          <Link to={"/PostManagement"}>Back to list</Link>
        </button>
      </div>
    </div>
  );
};

export default PostManagementDetail;
