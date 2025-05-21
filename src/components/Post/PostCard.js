import React from "react";
import MoreIcon from "../../assets/images/more_horiz.svg";
import OptionsPost from "./OptionsPost";
const PostCard = ({ post }) => {
  const defaultPost = {
    fullName: "Phuong Nam",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
    createAt: "July 29 2024, 07:49 AM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. #blog #nienmoulming #polytecode",
    images: null,
    hashtags: null,
    tags: null,
    likes: 100,
    comments: 20,
    shares: 10,
  };
  const postData = { ...defaultPost, ...post };
  const hashTag = ["blog", "nienmoulming", "polytecode"];
  const category = ["Pants", "Diseases"];
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-solid border-gray-200 text-left">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={postData.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-bold">{postData.fullName}</h3>
            <p className="text-sm text-gray-500">{postData.createAt}</p>
          </div>
        </div>
        {/* add icon "..." */}
        <div>
          <div>
            <OptionsPost />
          </div>

        </div>
      </div>
      <div className="flex flex-col items-start mt-3 text-sm">
        <p className="mb-3 text-[#7D7E9E] font-light">{postData.content}</p>
        <p className="mb-3 font-bold">
          {hashTag.map((tag, index) => (
            <span key={index} className="mr-2">
              #{tag}
            </span>
          ))}
        </p>
        <p className="mb-3 flex">
          <p className="font-bold">Category: </p>
          {category.map((cat, index) => (
            <span key={index} className="mr-2">
              {cat}
              {index < category.length - 1 ? "," : ""}
            </span>
          ))}
        </p>
      </div>
      {postData.images && postData.images.length > 0 && (
        <>
          {/* Trường hợp có đúng 3 ảnh */}
          {postData.images.length === 3 ? (
            <div className="grid grid-cols-2 gap-2 mb-3 h-full">
              <div className="flex flex-col gap-2">
                <img src={postData.images[0]}
                  alt={postData.content}
                  className="h-1/2 w-full object-cover rounded-md" />
                <img src={postData.images[1]}
                  alt={postData.content}
                  className="h-1/2 w-full object-cover rounded-md" />
              </div>
              <img src={postData.images[2]}
                alt={postData.content}
                className="h-full w-full object-cover rounded-md" />
            </div>
          ) : (
            // Các trường hợp khác: 1-2 ảnh, 4+ ảnh
            <div className="grid grid-cols-2 gap-2 mb-3">
              {postData.images.slice(0, 4).map((img, index) => {
                const isLastVisible = index === 3 && postData.images.length > 4;
                return (

                  <div key={index}
                    className={`relative rounded-md overflow-hidden ${postData.images.length === 1 ? "col-span-2" : ""
                      }`} >
                    <img src={img}

                      alt={postData.content}
                      className="w-full h-full object-cover" />
                    {isLastVisible && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-semibold">
                        +{postData.images.length - 4} more
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <div className="flex lg:flex-row lg:gap-8 gap-3 flex-col items-center justify-between">
        <div className="flex lg:w-1/4 lg:justify-between justify-around w-full">
          <p>
            <i className="fa-solid fa-thumbs-up text-blue-500"></i> {postData.likes}
          </p>
          <p>
            <i className="fas fa-comment text-blue-500"></i> {postData.comments}
          </p>
          <p>
            <i className="fa-solid fa-share text-blue-500"></i> {postData.shares}
          </p>
        </div>
        <div className="flex lg:w-3/4 gap-1 justify-between w-full">
          <button className="flex-1 p-2 bg-gray-200 hover:bg-gray-300 rounded-sm text-center">
            <i className="fa-solid fa-thumbs-up mr-1"></i> Like
          </button>
          <button className="flex-1 p-2 bg-gray-200  hover:bg-gray-300 rounded-sm text-center">
            <i className="fas fa-comment mr-1"></i> Comment
          </button>
          <button className="flex-1 p-2 bg-gray-200  hover:bg-gray-300 rounded-sm text-center">
            <i className="fa-solid fa-share mr-1"></i> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
