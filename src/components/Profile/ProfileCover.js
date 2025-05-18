import React, { useState, useCallback, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";

const ProfileCover = ({ coverImage: initialCoverImage, profileImage: initialProfileImage, fullName }) => {
    // State cho background
    const [coverImage, setCoverImage] = useState(initialCoverImage);
    const [showCoverPopup, setShowCoverPopup] = useState(false);
    const [coverZoom, setCoverZoom] = useState(1); // Zoom cho popup background

    // State cho avatar
    const [profileImage, setProfileImage] = useState(initialProfileImage);
    const [showCropper, setShowCropper] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [profileZoom, setProfileZoom] = useState(1); // Zoom cho popup avatar

    // Refs
    const coverInputRef = useRef(null);
    const profileInputRef = useRef(null);

    // Xử lý chọn background
    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl);
            setShowCoverPopup(false); // Đóng popup sau khi chọn ảnh
        }
    };

    // Xử lý chọn avatar
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageToCrop(imageUrl);
            setShowCropper(true);
            setShowProfilePopup(false); // Đóng popup sau khi chọn ảnh
        }
    };

    // Callback cho cropper avatar
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Tạo hình ảnh để hiển thị cho avatar mới
    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });

    // Hàm tạo ảnh đã crop cho avatar
    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(URL.createObjectURL(blob));
            }, "image/jpeg");
        });
    };

    // Lưu và hủy avatar
    const handleCropSave = async () => {
        try {
            const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
            setProfileImage(croppedImage);
            setShowCropper(false);
        } catch (e) {
            console.error("Error cropping image:", e);
        }
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setImageToCrop(null);
    };

    // Xử lý zoom ảnh trong popup
    const handleZoomChange = (type, value) => {
        const newZoom = Math.max(1, Math.min(3, Number(value))); // Giới hạn zoom từ 1x đến 3x
        if (type === "cover") {
            setCoverZoom(newZoom);
        } else {
            setProfileZoom(newZoom);
        }
    };

    return (
        <div className="relative h-72 bg-gray-200 mb-10 group">
            {/* Hình ảnh bìa */}
            <img src={
                coverImage ||
                "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg"
            }
                alt="Background"
                className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-90 cursor-pointer"
                onClick={() => setShowCoverPopup(true)} />

            {/* Nút Change background */}
            <button onClick={() => coverInputRef.current.click()}
                className="absolute top-4 left-4 flex items-center bg-black/40 text-white px-3 py-1 rounded border border-white transition-all duration-300 ease-in-out opacity-90 group-hover:opacity-100">
                <i className="fa-solid fa-camera text-[24px] h-6 text-white"></i>
                <span className="ml-2 hidden group-hover:inline transition  transition-opacity duration-300">
                    Change background
                </span>
            </button>
            <input type="file" accept="image/*" ref={coverInputRef} onChange={handleCoverImageChange} className="hidden" />

            {/* Hình ảnh đại diện và nút chọn avatar */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                    <img src={
                        profileImage ||
                        "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png"
                    }
                        alt="Avatar"
                        className="w-28 h-28 rounded-full border-4 border-white cursor-pointer"
                        onClick={() => setShowProfilePopup(true)} />
                    <button onClick={() => profileInputRef.current.click()}
                        className="absolute top-20 right-0 text-[30px] text-blue-600 bg-white rounded-full">
                        <i className="fa-solid fa-circle-plus"></i>
                    </button>
                    <input type="file" accept="image/*" ref={profileInputRef} onChange={handleProfileImageChange} className="hidden" />
                </div>
                <h1 className="mt-2 text-3xl font-bold text-center">{fullName || "Phuong Nam"}</h1>
            </div>

            {/* Popup chỉnh sửa avatar */}
            {showCropper && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-[500px] max-w-[90%]">
                        <h2 className="text-lg font-bold mb-4">Change avatar</h2>
                        <div className="relative w-full h-64">
                            <Cropper image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete} />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Zoom:</label>
                            <input type="range"
                                min="1"
                                max="3"
                                step="0.1"
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full" />
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={handleCropCancel} className="px-4 py-2 bg-gray-300 rounded-md">
                                Cancel
                            </button>
                            <button onClick={handleCropSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md" >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup xem background */}
            {showCoverPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowCoverPopup(false)} >
                    <div className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <div className="overflow-auto max-w-full max-h-[70vh]">
                            <img src={coverImage ||
                                "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg"
                            }
                                alt="Background"
                                className="max-w-full max-h-full object-contain"
                                style={{ transform: `scale(${coverZoom})` }} />
                        </div>
                        <div className="mt-4 w-48">
                            <label className="block mb-2">Zoom:</label>
                            <input type="range"
                                min="1"
                                max="3"
                                step="0.1"
                                value={coverZoom}
                                onChange={(e) => handleZoomChange("cover", e.target.value)}
                                className="w-full" />
                        </div>
                        <button onClick={() => coverInputRef.current.click()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md" >
                            Change Background
                        </button>
                    </div>
                </div>
            )}

            {/* Popup xem avatar */}
            {showProfilePopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowProfilePopup(false)} >
                    <div className="bg-white p-4 rounded-lg flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}>
                        {/* Hình vuông hiển thị ảnh avatar */}
                        <div className="w-[400px] h-[400px]">
                            <img src={
                                profileImage ||
                                "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png"
                            }
                                alt="Avatar"
                                className="w-full h-full object-contain rounded-md"
                                style={{ transform: `scale(${profileZoom})` }} />
                        </div>
                        {/* Nút đổi avatar */}
                        <button onClick={() => profileInputRef.current.click()}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
                            Change Avatar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileCover;