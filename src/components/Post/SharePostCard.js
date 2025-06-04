import React from "react";
import OptionsPost from "./OptionsPost";
import PostCard from "./PostCard";
import formatTime from "../../utils/formatTime";

const SharePostCard = ({ post }) => {
  const defaultPost = {
    fullName: "Phuong Nam",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
    createAt: "July 29 2024, 07:49 AM",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. #blog #nienmoulming #polytecode",
    images: null,
    hashtags: null,
    tagFriends: null,
    likes: 100,
    comments: 20,
    shares: 10,
    sharedPost: null,
  };
  const postData = { ...defaultPost, ...post };
  const hashTags = postData.hashtags || ["blog", "nienmoulming", "polytecode"];
  const tagFriends = postData.tagFriends || [];

  // Hàm hiển thị tagFriends theo định dạng yêu cầu
  const renderTagFriends = () => {
    const fullNameElement = (
      <span className="text-[#088DD0]">{postData.fullName}</span>
    );

    if (!tagFriends.length) return fullNameElement;

    if (tagFriends.length === 1) {
      return (
        <>
          {fullNameElement}
          <span className="text-black"> <span className="text-gray-400 font-normal"> with </span>  {tagFriends[0]}</span>
        </>
      );
    }

    if (tagFriends.length === 2) {
      return (
        <>
          {fullNameElement}
          <span className="text-black"> <span className="text-gray-400 font-normal"> with </span> {tagFriends[0]} and {tagFriends[1]}</span>
        </>
      );
    }

    return (
      <>
        {fullNameElement}
        <span className="text-black"> <span className="text-gray-400 font-normal"> with </span> {tagFriends[0]} and {tagFriends.length - 1} more</span>
      </>
    );
  };

  return (
    <div className="p-4 text-left bg-white border border-gray-200 border-solid rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={postData.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-bold">{renderTagFriends()}</h3>
            <p className="text-sm text-gray-500">{formatTime(postData.createAt)}</p>
          </div>
        </div>
        <div>
          <OptionsPost />
        </div>
      </div>
      <div className="flex flex-col items-start mt-3 text-sm">
        <p className="mb-2 text-[#7D7E9E] font-light">{postData.content}</p>
        <p className="mb-2 font-bold">
          {hashTags.map((tag, index) => (
            <span key={index} className="mr-2">
              #{tag}
            </span>
          ))}
        </p>
      </div>
      {postData.sharedPost && (
        <div className=" border-gray-300">
          <PostCard post={postData.sharedPost} />
        </div>
      )}
    </div>
  );
};

export default SharePostCard;