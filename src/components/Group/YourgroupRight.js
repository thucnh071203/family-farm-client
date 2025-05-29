import React, { useState, useEffect } from "react";
import YourGroupCard from "./YourGroupCard";

const YourgroupRight = ({ section }) => {
  const [groupsData, setGroupData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dữ liệu mẫu
    const mockData = [
      {
        id: 1,
        background: "https://gameroom.ee/83571/minecraft.jpg",
        avatar: "https://gameroom.ee/83571/minecraft.jpg",
        numberMember: "100",
        groupName: "The Family Farm for agriculture around the world",
      },
      {
        id: 2,
        background: "https://gameroom.ee/83571/minecraft.jpg",
        avatar: "https://gameroom.ee/83571/minecraft.jpg",
        numberMember: "100",
        groupName: "The Family Farm for agriculture around the world",
      },
      {
        id: 3,
        background: "https://gameroom.ee/83571/minecraft.jpg",
        avatar: "https://gameroom.ee/83571/minecraft.jpg",
        numberMember: "100",
        groupName: "The Family Farm for agriculture around the world",
      },
      {
        id: 4,
        background: "https://gameroom.ee/83571/minecraft.jpg",
        avatar: "https://gameroom.ee/83571/minecraft.jpg",
        numberMember: "100",
        groupName: "The Family Farm for agriculture around the world",
      },
      {
        id: 5,
        background: "https://gameroom.ee/83571/minecraft.jpg",
        avatar: "https://gameroom.ee/83571/minecraft.jpg",
        numberMember: "100",
        groupName: "The Family Farm for agriculture around the world",
      },
      {
        id: 6,
        background: "https://gameroom.ee/83571/minecraft.jpg",
        avatar: "https://gameroom.ee/83571/minecraft.jpg",
        numberMember: "100",
        groupName: "The Family Farm for agriculture around the world",
      },
    ];

    setGroupData(mockData);
    setIsLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-16 md:mx-20 ">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        groupsData.map((group) => {
          return <YourGroupCard key={group.id} group={group} />;
        })
      )}
    </div>
  );
};

export default YourgroupRight;
