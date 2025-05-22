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
        <div class="list-saved-post-page w-full lg:pt-[100px] pt-[63px]">
            <div class="list-save-post-page-container w-full">
                <div class="body-post-save-container flex flex-row gap-5">
                    <SavedPostNav/>
                    <div class="save-post-main pt-[49px] mx-auto max-w-pl- grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
                        <div class="item-post-save max-w-3xl lg:pl-5 flex flex-col h-full gap-5 mx-auto lg:order-1 order-2">
                            {posts.map((post, index) => (
                                <PostCard key={index} post={post} />
                            ))}
                        </div>
                        <div className="other-container flex flex-col gap-5 lg:order-2 order-1">

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