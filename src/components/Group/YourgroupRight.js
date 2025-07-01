import React, { useState, useEffect } from "react";
import YourGroupCard from "./YourGroupCard";

const YourgroupRight = ({ section }) => {
  const [groupsData, setGroupData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }

      const res = await fetch(`https://localhost:7280/api/group/${section}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Kiểm tra dữ liệu và cập nhật state
      if (data.success === true) {
        setGroupData(data.data);
        //console.log(data[0]);
      } else {
        console.warn("Unexpected response format:", data);
        setGroupData([]);
      }
    } catch (err) {
      console.error("Error fetching groups:", err.message || err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Dữ liệu mẫu
    // const mockData = [
    //   {
    //     id: 1,
    //     background: "https://gameroom.ee/83571/minecraft.jpg",
    //     avatar: "https://gameroom.ee/83571/minecraft.jpg",
    //     numberMember: "100",
    //     groupName: "The Family Farm for agriculture around the world",
    //   },
    //   {
    //     id: 2,
    //     background: "https://gameroom.ee/83571/minecraft.jpg",
    //     avatar: "https://gameroom.ee/83571/minecraft.jpg",
    //     numberMember: "100",
    //     groupName: "The Family Farm for agriculture around the world",
    //   },
    //   {
    //     id: 3,
    //     background: "https://gameroom.ee/83571/minecraft.jpg",
    //     avatar: "https://gameroom.ee/83571/minecraft.jpg",
    //     numberMember: "100",
    //     groupName: "The Family Farm for agriculture around the world",
    //   },
    //   {
    //     id: 4,
    //     background: "https://gameroom.ee/83571/minecraft.jpg",
    //     avatar: "https://gameroom.ee/83571/minecraft.jpg",
    //     numberMember: "100",
    //     groupName: "The Family Farm for agriculture around the world",
    //   },
    //   {
    //     id: 5,
    //     background: "https://gameroom.ee/83571/minecraft.jpg",
    //     avatar: "https://gameroom.ee/83571/minecraft.jpg",
    //     numberMember: "100",
    //     groupName: "The Family Farm for agriculture around the world",
    //   },
    //   {
    //     id: 6,
    //     background: "https://gameroom.ee/83571/minecraft.jpg",
    //     avatar: "https://gameroom.ee/83571/minecraft.jpg",
    //     numberMember: "100",
    //     groupName: "The Family Farm for agriculture around the world",
    //   },
    // ];
    fetchGroups();
    // setGroupData(mockData);
    setIsLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-16 md:mx-20 ">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        groupsData.map((group) => {
          return (
            <YourGroupCard
              key={group.group.groupId}
              group={group.group}
              member={group.numberInGroup}
            />
          );
        })
      )}
    </div>
  );
};

export default YourgroupRight;
