import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import PopupChangeImage from "./PopupChangeImage";
import { useSignalR } from "../../context/SignalRContext";
import instance from "../../Axios/axiosConfig";

const GroupDetailHeader = ({
  group,
  userRole,
  userAccId,
  memberStatus,
  countMember,
  selectedTab,
  setSelectedTab,
  reload,
  reloadsignlR
}) => {
  const [showPopup, setShowPopup] = useState(false);

  // Load ảnh theo thời gian thực
  function getCacheBustedUrl(url, updatedAt) {
    if (!url) return url;
    if (!updatedAt) return url + `?v=${Date.now()}`;
    return url + `?v=${encodeURIComponent(updatedAt)}`;
  }

  const backgroundUrl = getCacheBustedUrl(group?.groupBackground, group?.updatedAt);
  const avatarUrl = getCacheBustedUrl(group?.groupAvatar, group?.updatedAt);

  // useEffect(() => {
  //   console.log('Group avatar URL:', group?.groupAvatar);
  //   console.log('Group updatedAt:', group?.updatedAt);
  //   console.log('Avatar URL render:', avatarUrl);
  // }, [group, avatarUrl]);

  if (!group) return <div>Loading...</div>;
  return (
    <div>
      {/* md:w-[832px] h-72 md:h-[24rem] shadow-md relative rounded-md overflow-hidden */}
      <div className="w-full h-[200px] md:w-[832px] md:h-[296px] shadow-md relative rounded-md overflow-hidden">
        {/* background */}
        <div className="">
          <img
            className="w-[-57%] h-[20%]"
            src={backgroundUrl}

            alt=""
          />
        </div>
        {/* avatar */}
        <div className="absolute left-8 z-10 bottom-6">
          <img
            className="rounded-full w-14 h-14 md:w-[130px] md:h-[130px] object-fill "
            src={avatarUrl}
            alt=""
          />
        </div>
        <div className="absolute right-8 z-10 bottom-6 flex flex-row gap-2">
          <button className="bg-white hover:bg-[rgba(61,179,251,0.14)] p-2 md:p-3 text-black rounded-[20px] border border-gray-500 hover:text-white"
          onClick={() => setShowPopup(true)}
          >
            <i class="fa-solid fa-pen px-1 text-[#3DB3FB]"></i>Change image
          </button>
        </div>
      </div>
      {showPopup && (
        <PopupChangeImage
          group={group}
          userRole={userRole}
          userAccId={userAccId}
          onClose={() => setShowPopup(false)}
          onSave={() => {
            console.log("Save image clicked");
            setShowPopup(false);
            reloadsignlR(); // nếu cần reload lại group
          }}
        />
      )}

      <div>
        <div className="p-4 text-left">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-5">
              {group.groupName || "groupName"}
            </h2>

            {['680cea9fd26b52bd2922a596', '680ce8722b3eec497a30201e'].includes(userRole) && (
              <Link to={`/EditGroup/${group.groupId}`} className=" hover:text-[#3DB3FB]"
              state={{ userRole: userRole, userAccId: userAccId }}
              >
                Setting group
              </Link>
            )}

          </div>

          <div className="flex justify-between">
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-7 flex gap-10">
                <span>
                  <span className="font-bold text-black"> Created:</span>{" "}
                  {new Date(group.createdAt).toLocaleDateString("vi-VN")}{" "}
                  &nbsp;&nbsp;{" "}
                </span>
                <span>
                  <span className="font-bold text-black">Members: </span>
                  {countMember} &nbsp;&nbsp;
                </span>
                <span>
                  {" "}
                  <span className="font-bold text-black"> Posts: </span> 998
                </span>
              </p>
            </div>
            <div>
              <form class="max-w-md ">
                <label
                  for="default-search"
                  class="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    required
                  />
                  <button
                    type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex space-x-6 mt-2 text-sm text-black-500 font-bold text-center ">
            <button
              onClick={() => setSelectedTab("posts")}
              className="w-[10%] hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB]"
            >
              Home
            </button>
            <button
              onClick={() => setSelectedTab("members")}
              className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%]"
            >
              Member
            </button>
            <button
              onClick={() => setSelectedTab("requests")}
              className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%] "
            >
              Add to Join
            </button>
            <button
              onClick={() => setSelectedTab("permission")}
              className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%] "
            >
              Permissions
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailHeader;
