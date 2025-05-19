import React from "react";

const PostCard = ({ post }) => {
  const defaultPost = {
    username: "Phuong Nam",
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

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-5">
      <div className="flex items-center gap-3 mb-3">
        <img src={postData.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-bold">{postData.username}</h3>
          <p className="text-sm text-gray-500">{postData.createAt}</p>
        </div>
      </div>
      <p className="mb-3">{postData.content}</p>
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

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
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
        <div className="flex gap-2">
          <button className="p-2 bg-gray-200 rounded-sm">
            <i className="fa-solid fa-thumbs-up"></i> Like
          </button>
          <button className="p-2 bg-gray-200 rounded-sm">
            <i className="fas fa-comment"></i> Comment
          </button>
          <button className="p-2 bg-gray-200 rounded-sm">
            <i className="fa-solid fa-share"></i> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;