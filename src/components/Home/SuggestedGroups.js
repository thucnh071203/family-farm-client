import React from "react";

const SuggestedGroups = () => {
    const groups = [
        {
            name: "Support Coursera",
            members: 750,
            backgroundImage: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
        },
        {
            name: "Support Coursera",
            members: 750,
            backgroundImage: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
        },
    ];

    return (
        <div className="bg-white p-5 rounded-lg border shadow-md">
            <h2 className="text-lg font-bold mb-3 text-left">Suggested Groups</h2>
            <div className="flex flex-col gap-3">
                {groups.map((group, index) => (
                    <div key={index} className="relative rounded-lg border border-solid border-gray-200">
                        <div className="w-full h-24 rounded-md bg-no-repeat bg-center bg-cover"
                            style={{ backgroundImage: `url(${group.backgroundImage})` }}></div>
                        <p className="absolute text-sm text-gray-500 right-0 top-16 p-1 px-3 text-white font-bold bg-blue-400 rounded-l-full">Members: {group.members}</p>
                        <div className="absolute top-16 flex items-end gap-3 m-4">
                            <img src={group.avatar}
                                alt={`${group.name} avatar`}
                                className="w-10 h-10 rounded-full" />
                            <p className="font-bold">{group.name}</p>
                        </div>
                        <button className="w-40 m-4 mt-10 p-2 text-sm font-bold text-blue-400 border border-solid border-blue-200 rounded-full hover:bg-blue-200 transition">
                            Join Group
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestedGroups;