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
                <div className="container mx-auto max-w-7xl">
                    <div className="relative">
                        <CoverBackground />
                        <div className="absolute right-4 bottom-4">
                            <FriendActionButton />
                        </div>
                        <ProfileAvatar />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 pt-20">
                        <aside className="w-full lg:w-1/3 flex flex-col gap-5">
                            <BasicInfo />
                            <FriendList />
                            <PhotoGallery />
                        </aside>
                        <section className="w-full h-full lg:w-2/3 flex flex-col gap-5">
                            <PostCreate />
                            <PostFilters />
                            {posts.map((post, index) => (
                                <PostCard key={index} post={post} />
                            ))}
                            {/* <div class="bg-white p-5 rounded-lg shadow-md border mt-5">
                                <div class="flex items-center gap-3 mb-3">
                                    <img src="https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
                                        alt="Avatar" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h3 class="font-bold">Khoa Dang</h3>
                                        <p class="text-sm text-gray-500">July 29, 2018, 08:49 AM</p>
                                    </div>
                                </div>
                                <p class="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nostrum
                                    molestias</p>
                                <div class="bg-white p-5 rounded-lg shadow-md border border-solid border-gray-200">
                                    <div class="flex items-center gap-3 mb-3">
                                        <img src="https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
                                            alt="Avatar" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h3 class="font-bold">Phuong Nam</h3>
                                            <p class="text-sm text-gray-500">July 29, 2018, 07:49 AM</p>
                                        </div>
                                    </div>
                                    <p class="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nostrum
                                        laboriosam dolore suscipit quibusdam fugit. #blog
                                        #nienmoulming #polytecode</p>
                                    <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg"
                                        alt="Post" className="w-full h-full object-cover rounded-md mb-3" />
                                    <div class="flex items-center justify-between">
                                        <div class="flex gap-3">
                                            <p><i class="fa-solid fa-thumbs-up text-blue-500"></i> 100 </p>
                                            <p><i class="fas fa-comment text-blue-500"></i> 20 </p>
                                            <p><i class="fa-solid fa-share text-blue-500"></i> 10 </p>
                                        </div>
                                        <div class="flex gap-3">
                                            <button class="p-1 bg-gray-200 rounded-sm"><i class="fa-solid fa-thumbs-up"></i>
                                                Like</button>
                                            <button class="p-1 bg-gray-200 rounded-sm"><i class="fas fa-comment"></i>
                                                Comment</button>
                                            <button class="p-1 bg-gray-200 rounded-sm"><i class="fa-solid fa-share"></i>
                                                Share</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;