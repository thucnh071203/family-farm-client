import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import CoverBackground from "../../components/Profile/CoverBackground";
import ProfileAvatar from "../../components/Profile/ProfileAvatar";
import FriendActionButton from "../../components/Friend/FriendActionButton";
import YourFriendCard from "../../components/Friend/YourFriendCard";
import { Link } from "react-router-dom";

const UserFriends = () => {

    const friends = [
        { username: "Dang Khoa", city: "Ho Chi Minh", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 5 },
        { username: "Huu Thuc", city: "Ha Noi", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 2 },
        { username: "Minh Uyen", city: "Da Nang", avatar: null, mutualFriend: 3 },
        { username: "Dang Khoa", city: "Ho Chi Minh", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 5 },
        { username: "Minh Uyen", city: "Da Nang", avatar: null, mutualFriend: 3 },
        { username: "Mai Xuan", city: "Can Tho", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 0 },
        { username: "Minh Uyen", city: "Da Nang", avatar: null, mutualFriend: 3 },
        { username: "Dang Khoa", city: "Ho Chi Minh", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 5 },
        { username: "Mai Xuan", city: "Can Tho", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 0 },
        { username: "Huu Thuc", city: "Ha Noi", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 2 },
        { username: "Mai Xuan", city: "Can Tho", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 0 },
        { username: "Huu Thuc", city: "Ha Noi", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", mutualFriend: 2 },

    ];

    return (
        <div>
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
                        <div className="flex-row gap-5 pt-10 text-left">
                            <div className="p-3">
                                <Link to="/PersonalPage">Profile /</Link>
                                <Link className="text-blue-500" to=""> Friends </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {friends.map((friend, index) => (
                                <YourFriendCard key={index} friend={friend} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFriends;