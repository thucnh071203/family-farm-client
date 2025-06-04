import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import WeatherWidget from "../../components/Home/WeatherWidget";
import PopularService from "../../components/Services/PopularService";
import PostCreate from "../../components/Post/PostCreate";
import PostCard from "../../components/Post/PostCard";
import SharePostCard from "../../components/Post/SharePostCard";
import SuggestedFriends from "../../components/Home/SuggestedFriends";
import SuggestedGroups from "../../components/Home/SuggestedGroups";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [sharePosts, setSharePosts] = useState([]);

  // Dữ liệu mẫu cho posts (bài viết thường)
  const samplePosts = [
    {
      postId: "post1",
      type: "post",
      fullName: "Phuong Nam",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
      createAt: "2025-05-30T22:00:00Z",
      content: "Hôm nay là một ngày đẹp trời! #blog #nature",
      images: [
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://gameroom.ee/83571/minecraft.jpg",
      ],
      hashtags: ["blog", "nature"],
      tagFriends: ["Huu Thuc"],
      categories: ["Nature", "Lifestyle"],
      likes: 150,
      comments: 25,
      shares: 15,
    },
    {
      postId: "post2",
      type: "post",
      fullName: "Huu Thuc",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
      createAt: "2025-05-30T15:00:00Z",
      content: "Post với nhiều ảnh! #minecraft #gaming",
      images: [
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
      ],
      hashtags: ["minecraft", "gaming"],
      tagFriends: ["Mai Xuan", "Phuong Nam", "Lan Anh"],
      categories: ["Gaming"],
      likes: 120,
      comments: 30,
      shares: 20,
    },
  ];

  // Dữ liệu mẫu cho sharePosts
  const sampleSharePosts = [
    {
      postId: "share1",
      fullName: "Mai Xuan",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
      createAt: "2025-05-30T21:30:00Z",
      content: "Chia sẻ bài viết tuyệt vời về lập trình! #coding #polytecode",
      hashtags: ["coding", "polytecode"],
      tagFriends: ["Phuong Nam", "Huu Thuc"],
      likes: 80,
      comments: 10,
      shares: 5,
      sharedPost: {
        postId: "shared1",
        fullName: "Huu Thuc",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
        createAt: "2025-05-30T10:00:00Z",
        content: "Học lập trình thật thú vị! #coding",
        images: [
          "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
        ],
        hashtags: ["coding"],
        categories: ["Programming"],
        likes: 200,
        comments: 50,
        shares: 30,
      },
    },
    {
      postId: "share2",
      fullName: "Phuong Nam",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
      createAt: "2025-05-29T08:00:00Z",
      content: "Chia sẻ một bài viết về nông nghiệp! #farming",
      hashtags: ["farming"],
      tagFriends: ["Huu Thuc", "Mai Xuan", "Lan Anh"],
      likes: 60,
      comments: 15,
      shares: 8,
      sharedPost: {
        postId: "shared2",
        fullName: "Mai Xuan",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
        createAt: "2025-05-28T09:00:00Z",
        content: "Nông nghiệp bền vững là tương lai! #farming #sustainability",
        images: null,
        hashtags: ["farming", "sustainability"],
        categories: ["Agriculture"],
        likes: 90,
        comments: 20,
        shares: 10,
      },
    },
  ];

  // Giả lập gọi API
  useEffect(() => {
    setPosts(samplePosts);
    setSharePosts(sampleSharePosts);
  }, []);

  // Hàm cập nhật số lượng comment
  const handleCommentCountChange = (postId, newCount) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, comments: newCount } : post
      )
    );
    setSharePosts((prevSharePosts) =>
      prevSharePosts.map((post) =>
        post.postId === postId ? { ...post, comments: newCount } : post
      )
    );
  };

  // Gộp và sắp xếp bài viết
  const allPosts = [...posts, ...sharePosts].sort(
    (a, b) => new Date(b.createAt) - new Date(a.createAt)
  );

  return (
    <div className="HomePage bg-gray-100">
      <Header />

      <NavbarHeader />
      <main className="max-w-7xl mx-auto lg:pt-[140px] pt-[65px]">
        <div className="gap-5 grid lg:grid-cols-[1fr_2fr_1fr] grid-cols-1">
          {/* Left */}
          <aside className="flex flex-col gap-5 order-1">
            <WeatherWidget />
            <PopularService />
          </aside>
          {/* Posts Section */}
          <section className="flex flex-col gap-5 lg:order-2 order-3 h-full w-full">
            <PostCreate />
            {allPosts.map((post, index) =>
              post.type === "post" ? (
                <PostCard
                  key={index}
                  post={post}
                  onCommentCountChange={(newCount) =>
                    handleCommentCountChange(post.postId, newCount)
                  }
                />
              ) : (
                <SharePostCard
                  key={index}
                  post={post}
                  onCommentCountChange={(newCount) =>
                    handleCommentCountChange(post.postId, newCount)
                  }
                />
              )
            )}
          </section>
          {/* Right */}
          <section className="flex flex-col gap-5 lg:order-3 order-2">
            <SuggestedFriends />
            <SuggestedGroups />
          </section>
        </div>
      </main>

    </div>
  );
};

export default HomePage;