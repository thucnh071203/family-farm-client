import React, { useState, useRef } from "react";
import public_status_icon from "../../assets/icons/public_status_icon.svg";
import camera_icon from "../../assets/icons/camera_icon.svg";
import tag_icon from "../../assets/icons/tag_icon.svg";
import post_category_icon from "../../assets/icons/post_category_icon.svg";

const PostCreatePopup = ({ onClose }) => {
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [taggedFriends, setTaggedFriends] = useState([]);
    const [withWhom, setWithWhom] = useState("");
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState("Public");
    const [categoryDropdown, setCategoryDropdown] = useState(false);
    const withWhomInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const listCategories = ["Benh la", "Benh ray nau", "Du lich", "Am thuc"];
    const listFriends = ["Phuong Nam", "Minh Uyen", "Dang Khoa", "Nguyen Van A", "Tran Thi B"];

    const handleSubmit = (e) => {
        e.preventDefault();
        const hashtags = content.match(/#\w+/g) || [];
        console.log("Post content:", { content, hashtags, categories, taggedFriends, images, status });
        setContent("");
        setCategories([]);
        setTaggedFriends([]);
        setWithWhom("");
        setImages([]);
        onClose();
    };

    const removeCategory = (category) => {
        setCategories(categories.filter((c) => c !== category));
    };

    const removeFriend = (friend) => {
        setTaggedFriends(taggedFriends.filter((f) => f !== friend));
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const addCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories([...categories, category]);
        }
        setCategoryDropdown(false);
    };

    const handleTagFriends = () => {
        withWhomInputRef.current.focus();
    };

    const handlePhotoVideo = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImages([...images, ...imageUrls]);
        e.target.value = ""; // Reset input file
    };

    const filteredFriends = listFriends.filter((friend) =>
        friend.toLowerCase().includes(withWhom.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between pb-2 mb-4 border-b">
                    <div className="w-full text-center">
                        <h2 className="text-lg font-semibold">
                            <i className="text-blue-500 fa-solid fa-plus"></i> Create New Post
                        </h2>
                        <hr />
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-gray-500 hover:text-gray-700">
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2 mb-4">
                        <img src="https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
                            alt="Avatar" className="w-10 h-10 rounded-full" />
                        <textarea value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write something about you..."
                            className="flex-grow p-2" />
                    </div>
                    {(content.match(/#\w+/g) || []).length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mb-2 text-sm text-gray-500">
                            Hashtag#:{" "}
                            {(content.match(/#\w+/g) || []).map((tag, index) => (
                                <span key={index}
                                    className="block max-w-full px-2 py-1 mr-1 overflow-hidden text-gray-700 truncate bg-gray-200 rounded-full cursor-help whitespace-nowrap"
                                    title={tag} >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-500">
                            Categories:
                            {categories.map((category, index) => (
                                <span key={index} className="flex items-center px-2 py-1 text-gray-700 bg-gray-200 rounded-full">
                                    {category}
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(category)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        <i className="fa-solid fa-times"></i>
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    {taggedFriends.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-500">
                            Tags:
                            {taggedFriends.map((friend, index) => (
                                <span key={index}
                                    className="flex items-center pl-2 text-sm text-white bg-gray-400 rounded">
                                    {friend}
                                    <button type="button"
                                        onClick={() => removeFriend(friend)}
                                        className="ml-2 bg-gray-200 hover:bg-gray-300 text-white rounded-r flex items-center justify-center px-[8px] p-[5px]">
                                        <i className="fa-solid fa-times text-xs text-[#33B1FF]"></i>
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="relative mb-4 text-sm">
                        <i className="absolute text-gray-400 transform -translate-y-1/2 fa-solid fa-magnifying-glass left-3 top-1/2"></i>
                        <input ref={withWhomInputRef}
                            type="text"
                            value={withWhom}
                            onChange={(e) => setWithWhom(e.target.value)}
                            placeholder="Who are you with?"
                            className="w-full py-2 pl-10 pr-8 border border-gray-300 rounded-lg" />
                        {withWhom && (
                            <button type="button"
                                onClick={() => setWithWhom("")}
                                className="absolute text-gray-500 right-2 top-2 hover:text-gray-700">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        )}
                        {withWhom && filteredFriends.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg">
                                {filteredFriends.map((friend) => (
                                    <div key={friend}
                                        onClick={() => {
                                            if (!taggedFriends.includes(friend)) {
                                                setTaggedFriends([...taggedFriends, friend]);
                                            }
                                            setWithWhom("");
                                        }}
                                        className="p-2 cursor-pointer hover:bg-gray-100">
                                        {friend}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className="my-4">
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            <div className="relative inline-flex items-center gap-2 px-3 py-2 text-blue-500 bg-gray-100 border border-solid rounded-lg">
                                <img src={public_status_icon} alt="Photo/Video" />
                                <select value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="pr-6 bg-transparent outline-none appearance-none" >
                                    <option value="Public">Public</option>
                                    <option value="Private">Private</option>
                                    <option value="Draft">Draft</option>
                                </select>
                                <div className="absolute pointer-events-none right-2">
                                    <i className="text-blue-500 fa-solid fa-caret-down"></i>
                                </div>
                            </div>
                            <div onClick={handlePhotoVideo}
                                className="flex items-center gap-2 px-3 py-2 text-blue-500 bg-gray-100 border border-solid rounded-lg">
                                <img src={camera_icon} alt="Photo/Video" /> Photo/Video
                            </div>
                            <div onClick={handleTagFriends}
                                className="flex items-center gap-2 px-3 py-2 text-blue-500 bg-gray-100 border border-solid rounded-lg">
                                <img src={tag_icon} alt="Photo/Video" />Tag friends
                            </div>
                            <div onClick={() => setCategoryDropdown(!categoryDropdown)}
                                className="flex items-center gap-2 px-3 py-2 text-blue-500 bg-gray-100 border border-solid rounded-lg">
                                <img src={post_category_icon} alt="Photo/Video" /> Categories{" "}
                                <i className="fa-solid fa-caret-down"></i>
                                {categoryDropdown && (
                                    <div className="absolute z-10 mt-40 text-left bg-white border rounded-lg">
                                        {listCategories.map((cat) => (
                                            <div key={cat}
                                                onClick={() => addCategory(cat)}
                                                className="p-2 text-black rounded cursor-pointer hover:bg-gray-100">
                                                {cat}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-2 lg:grid-cols-6">
                        {images.slice(0, 6).map((image, index) => (
                            <div key={index} className="relative">
                                <img src={image}
                                    alt="Post"
                                    className={`w-full h-24 rounded-lg object-cover ${index === 5 && images.length > 6 ? "brightness-50" : ""}`} />
                                {index === 5 && images.length > 6 && (
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                                        +{images.length - 6} more
                                    </div>
                                )}
                                <button type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-gray-500 hover:text-gray-70" >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </div>
                        ))}
                        <input type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            className="hidden" />
                    </div>
                    <button type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600" >
                        PUBLISH
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostCreatePopup;