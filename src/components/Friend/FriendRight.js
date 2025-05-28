import React, { useState, useEffect } from "react";
import FriendCard from "./FriendCard";
import YourFriendCard from "./YourFriendCard";

const FriendRight = ({ section }) => {
  const [friendsData, setFriendsData] = useState([]);
  const [count, setCountFriend] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");

        const res = await fetch(
          `https://localhost:7280/api/friend/${section}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(
          "Fetch URL:",
          `https://localhost:7280/api/friend/${section}`
        );

        const json = await res.json();

        if (json.count !== 0) {
          setFriendsData(json.data);
          setCountFriend(json.count);
        } else {
          console.error("Failed:", json.message);
          setFriendsData([]);
          setCountFriend(json.count);
        }
      } catch (err) {
        console.error("Error fetching friends:", err.message || err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, [section]);

  const sectionTitles = {
    "requests-sent": "Sent Request list",
    "requests-receive": "Request list",
    "list-follower": "Follower list",
    "list-following": "Following list",
    "list-friend": "Your friends",
    // ... các section khác
  };

  const countListTitles = {
    "requests-sent": "REQUESTS",
    "requests-receive": "SENT REQUESTS",
    "list-follower": "FOLLOWER",
    "list-following": "FOLLOWING",
    "list-friend": "FRIENDS",
    // ... các section khác
  };

  
  return (
    <div className="w-full lg:mt-[120px] mt-[63px]">
      <div>
        <p className="font-bold text-lg flex items-start mt-8 mx-10 md:mx-20">
          {sectionTitles[section] || "Default title"}
        </p>
        <div className="flex gap-6 items-center mt-6 mb-10 mx-10 md:mx-20">
          <div className="flex justify-center items-center">
            <div className="h-10 flex overflow-hidden rounded-[30px] bg-[#fff] border-[#D1D1D1]border-solid outline outline-[0.5px] outline-gray-200">
              <i className="fa-solid fa-magnifying-glass flex h-full justify-center items-center shrink-0 px-2 text-[#999999]"></i>
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none border-none h-full"
              />
            </div>
          </div>
          <div className="flex gap-1">
            <p className="font-bold ">{count}</p>
            <p className="text-[#999999] font-bold">
              {" "}
              {countListTitles[section] || "Default title"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 gap-x-6 place-items-center md:mx-20 md:w-[954px]">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            friendsData.map((friend) => {
              if (section === "requests-receive") {
                return <FriendCard key={friend.accId} friend={friend} />;
                
              } else {
                return <YourFriendCard key={friend.accId} friend={friend} />;
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendRight;
