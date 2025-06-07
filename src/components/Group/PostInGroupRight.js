import React from "react";
import PostInGroupCard from "./PostInGroupCard";


const PostInGroupRight = () => {
  const posts = [
    {
      content: "Post with multiple images",
      images: [
        "https://gameroom.ee/83571/minecraft.jpg",
        "https://gameroom.ee/83571/minecraft.jpg",
      ],
    },
    {
      content: "Post with multiple images",
      images: [
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
      ],
    },
    {
      content: "Post with one image",
      images: [
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
      ],
    },
    {
      content: "Post with multiple images",
      images: [
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
      ],
    },
  ];
  return (
    <div className="w-full flex flex-col items-center pt-12 lg:mt-[120px] mt-[63px]">
      <div className="w-[60%] max-w-[584px] flex flex-col gap-4">
        {posts.map((post, index) => (
          <PostInGroupCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostInGroupRight;
