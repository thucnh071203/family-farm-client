import React from "react";
import MoreIcon from "../../assets/images/more_horiz.svg";
import OptionsPost from "../Post/OptionsPost";
const PostInGroupCard = ({ post }) => {
  const defaultPost = {
    fullName: "Phuong Nam",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
    timestamp: "July 29, 2018, 07:49 AM",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: null,
    likes: 100,
    comments: 20,
    shares: 10,
  };
  const postData = { ...defaultPost, ...post };
  const hashTag = ["blog", "nienmoulming", "polytecode"];
  const category = ["Pants", "Diseases"];
  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-5 outline outline-[0.05px] outline-gray-200">
      <div className="p-4">
        <div className="h-10 flex justify-between">
          <div className="flex gap-2">
            <div className="rounded-[50px]">
              <img
                className="rounded-full w-[40px] h-[40px] object-fill"
                src={
                  "https://i.pinimg.com/originals/d0/28/68/d0286806706a508645e8763c6b3f8cea.jpg"
                }
                alt="avatar"
              />
            </div>
            <div className="flex flex-col items-start justify-center font-medium text-sm">
              <div className="flex gap-1 ">
                <p className="text-[#088DD0]">Phuong Nam</p>
                <p className="text-[#000000] opacity-50">posted in</p>
                <p>MXMU group</p>
              </div>
              <div className="text-[#000000] opacity-50">
                July 26 2018, 01:03pm
              </div>
            </div>
          </div>
          <div>
            <OptionsPost />
          </div>
        </div>
        <div className="flex flex-col items-start mt-3 text-sm">
          <p className="mb-3 text-[#7D7E9E] font-light whitespace-normal break-words">{postData.content}</p>
          <p className="mb-3 font-bold">
            {hashTag.map((tag, index) => (
              <span key={index} className="mr-2">
                #{tag}
              </span>
            ))}
          </p>
          <p className="mb-3 flex">
            <p className="font-bold"> Category:</p>
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
                  <img
                    src={postData.images[0]}
                    alt={postData.content}
                    className="h-1/2 w-full object-cover rounded-md"
                  />
                  <img
                    src={postData.images[1]}
                    alt={postData.content}
                    className="h-1/2 w-full object-cover rounded-md"
                  />
                </div>
                <img
                  src={postData.images[2]}
                  alt={postData.content}
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            ) : (
              // Các trường hợp khác: 1-2 ảnh, 4+ ảnh
              <div className="grid grid-cols-2 gap-2 mb-3">
                {postData.images.slice(0, 4).map((img, index) => {
                  const isLastVisible =
                    index === 3 && postData.images.length > 4;
                  return (
                    <div
                      key={index}
                      className={`relative rounded-md overflow-hidden ${
                        postData.images.length === 1 ? "col-span-2" : ""
                      }`}
                    >
                      <img
                        src={img}
                        alt={postData.content}
                        className="w-full h-full object-cover"
                      />
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

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <p>
              <i className="fa-solid fa-thumbs-up text-blue-500"></i>{" "}
              {postData.likes}
            </p>
            <p>
              <i className="fas fa-comment text-blue-500"></i>{" "}
              {postData.comments}
            </p>
            <p>
              <i className="fa-solid fa-share text-blue-500"></i>{" "}
              {postData.shares}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="p-1 bg-gray-200 rounded-sm">
              <i className="fa-solid fa-thumbs-up"></i> Like
            </button>
            <button className="p-1 bg-gray-200 rounded-sm">
              <i className="fas fa-comment"></i> Comment
            </button>
            <button className="p-1 bg-gray-200 rounded-sm">
              <i className="fa-solid fa-share"></i> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInGroupCard;
