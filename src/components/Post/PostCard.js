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
  const taggedFriends = ["Huu Thuc", "Mai Xuan"];
  return (
    <div className="p-5 text-left bg-white border border-gray-200 border-solid rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={postData.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-bold text-[#088DD0]">{postData.fullName}</h3>
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
        <p className="mb-2 text-[#7D7E9E] font-light">{postData.content}</p>
        <p className="mb-2 font-bold">
          {hashTag.map((tag, index) => (
            <span key={index} className="mr-2">
              #{tag}
            </span>
          ))}
        </p>
        <div className="flex items-center gap-2 mb-2">
          {category.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 font-bold">
              Categories:
              {category.map((cat, index) => (
                <span key={index} className="flex items-center px-2 py-1 font-normal text-gray-700 bg-gray-200 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* <p className="flex items-center gap-2 mb-2">
          {taggedFriends.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-2 font-bold">
              Tags:
              {taggedFriends.map((tag, index) => (
                <span key={index} className="flex items-center px-2 py-1 text-sm text-white bg-gray-400 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </p> */}
      </div>
      {postData.images && postData.images.length > 0 && (
        <>
          {/* Trường hợp có đúng 3 ảnh */}
          {postData.images.length === 3 ? (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex flex-col gap-2">
                <img src={postData.images[0]}
                  alt={postData.content}
                  className="object-cover w-full rounded-md h-1/2" />
                <img src={postData.images[1]}
                  alt={postData.content}
                  className="object-cover w-full rounded-md h-1/2" />
              </div>
              <img src={postData.images[2]}
                alt={postData.content}
                className="object-cover w-full h-full rounded-md" />
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
                      className="object-cover w-full h-full" />
                    {isLastVisible && (
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50">
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

      <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-8">
        <div className="flex justify-around w-full lg:w-1/4 lg:justify-between">
          <p>
            <i className="text-blue-500 fa-solid fa-thumbs-up"></i> {postData.likes}
          </p>
          <p>
            <i className="text-blue-500 fas fa-comment"></i> {postData.comments}
          </p>
          <p>
            <i className="text-blue-500 fa-solid fa-share"></i> {postData.shares}
          </p>
        </div>
        <div className="flex justify-between w-full gap-1 lg:w-3/4">
          <button className="flex-1 p-2 text-center bg-gray-200 rounded-sm hover:bg-gray-300">
            <i className="mr-1 fa-solid fa-thumbs-up"></i> Like
          </button>
          <button className="flex-1 p-2 text-center bg-gray-200 rounded-sm hover:bg-gray-300">
            <i className="mr-1 fas fa-comment"></i> Comment
          </button>
          <button className="flex-1 p-2 text-center bg-gray-200 rounded-sm hover:bg-gray-300">
            <i className="mr-1 fa-solid fa-share"></i> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
