import React from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import WeatherWidget from "../../components/Home/WeatherWidget";
import PopularService from "../../components/Services/PopularService";
import PostCreate from "../../components/Post/PostCreate";
import PostCard from "../../components/Post/PostCard";
import SuggestedFriends from "../../components/Home/SuggestedFriends";
import SuggestedGroups from "../../components/Home/SuggestedGroups";
import { Link } from "react-router-dom";

const HomePage = () => {
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
    <div className="HomePage bg-gray-100">
      {/* What the hell gì ở đây dậy */}
      {/* <Link to="/Register">Register</Link>
      <br></br>
      <Link to="/Statistic1">Statistic</Link>
      <br></br>
      <Link to="/UserGrowthChart">User Growth</Link>
      <br></br>
      <Link to="/MapChart">MapChart</Link> */}
      <Header />
      <NavbarHeader />
      <main className="max-w-7xl mx-auto lg:pt-[140px] pt-[63px]">
        <div className="gap-5 grid lg:grid-cols-[1fr_2fr_1fr] grid-cols-1">
          {/* Left */}
          <aside className="flex flex-col gap-5 order-1">
            <WeatherWidget />
            <PopularService />
          </aside>
          {/* Posts Section */}
          <section className="flex flex-col gap-5 lg:order-2 order-3 h-full w-full">
            <PostCreate />
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </section>

          {/* Right */}
          <section className="flex flex-col gap-5 lg:order-3 order-2 ">
            {/* List Suggested */}
            <SuggestedFriends />
            <SuggestedGroups />
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;