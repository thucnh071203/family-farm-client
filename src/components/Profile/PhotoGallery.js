import React from "react";
import PhotoItem from "./PhotoItem";

const PhotoGallery = ({ photos }) => {
    const defaultPhotos = [
        { src: "https://gameroom.ee/83571/minecraft.jpg", alt: "Photo 11" },
        { src: "https://gameroom.ee/83571/minecraft.jpg", alt: "Photo 12" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 1" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 2" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 3" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 4" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 5" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 6" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 7" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 8" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 9" },
        { src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg", alt: "Photo 10" },
    ]
        ;
    const photoList = photos || defaultPhotos;

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold mb-3">Photos ({photoList.length})</h2>
                <a className="text-blue-800" href="/">
                    See all
                </a>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {photoList.slice(0, 9).map((photo, index) => {
                    // Nếu là ảnh thứ 9 và còn nhiều ảnh hơn => overlay "+X more"
                    if (index === 8 && photoList.length > 9) {
                        const moreCount = photoList.length - 9;
                        return (
                            <div key={index} className="relative">
                                <PhotoItem photo={photo} />
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xl font-bold rounded-md">
                                    +{moreCount} more
                                </div>
                            </div>
                        );
                    }

                    return <PhotoItem key={index} photo={photo} />;
                })}
            </div>
        </div>
    );
};

export default PhotoGallery;