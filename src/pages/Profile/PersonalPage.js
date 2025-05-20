import Header from "../../components/Header/Header";
import CoverBackground from "../../components/Profile/CoverBackground";
import ProfileAvatar from "../../components/Profile/ProfileAvatar";
import BasicInfo from "../../components/Profile/BasicInfo";
import FriendList from "../../components/Friend/FriendItemsList";
import PhotoGallery from "../../components/Profile/PhotoGallery";
import PostCard from "../../components/Post/PostCard";
import PostCreate from "../../components/Post/PostCreate";
import PostFilters from "../../components/Post/PostFilters";
import NavbarHeader from "../../components/Header/NavbarHeader";
import FriendActionButton from "../../components/Friend/FriendActionButton";

const PersonalPage = () => {
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
        <div className="min-h-screen flex flex-col">
            <Header />
            <NavbarHeader />
            <div className="flex-grow">
                <div className="container mx-auto max-w-6xl">
                    <div className="relative">
                        <CoverBackground />
                         <div className="absolute right-4 bottom-4">
                            <FriendActionButton />
                        </div>
                        <ProfileAvatar />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 pt-20 text-left">
                        <aside className="w-full lg:w-1/3 flex flex-col gap-5">
                            <BasicInfo />
                            <FriendList />
                            <PhotoGallery />
                        </aside>
                        <section className="w-full h-full lg:w-2/3 flex flex-col">
                            <PostCreate />
                            <PostFilters />
                            {posts.map((post, index) => (
                                <PostCard key={index} post={post} />
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;