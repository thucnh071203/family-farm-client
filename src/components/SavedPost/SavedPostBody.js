import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SavedPostNav from "../SavedPost/SavedPostNav";
import PostCard from "../Post/PostCard";
import SuggestedFriends from "../Home/SuggestedFriends";
import SuggestedGroups from "../Home/SuggestedGroups";
import "./savedPostBodystyle.css";

export default function SavedPostBody() {
    const posts = [
    {
      content: "Post with 2 images",
      createAt: "2 minutes ago",
      hashtags: "",
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
      images: ["https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg"],
    },
    {
      content: "Post with 3 images",
      images: [
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
      ],
    },
  ];
    
    return (
        <div className="list-saved-post-page w-full lg:pt-[100px] pt-[63px]">
            <div className="w-full list-save-post-page-container">
                <div className="flex flex-row gap-5 body-post-save-container">
                    <SavedPostNav/>
                    <div className="save-post-main pt-[49px] mx-auto max-w-pl- grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
                        <div className="flex flex-col order-2 h-full max-w-3xl gap-5 mx-auto item-post-save lg:pl-5 lg:order-1">
                            {posts.map((post, index) => (
                                <PostCard key={index} post={post} />
                            ))}
                        </div>
                        <div className="flex flex-col order-1 gap-5 other-container lg:order-2">

                            {/* List Suggested */}
                            <SuggestedFriends />
                            <SuggestedGroups />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}