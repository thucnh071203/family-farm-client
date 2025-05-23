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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <div className="text-center w-full">
                        <h2 className="text-lg font-semibold">
                            <i className="fa-solid fa-plus text-blue-500"></i> Create New Post
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
                        <div className="mb-2 text-gray-500 text-sm flex flex-wrap gap-1 items-center">
                            Hashtag#:{" "}
                            {(content.match(/#\w+/g) || []).map((tag, index) => (
                                <span key={index}
                                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-1 cursor-help max-w-full truncate block whitespace-nowrap overflow-hidden"
                                    title={tag} >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2 items-center text-gray-500 text-sm">
                            Categories:
                            {categories.map((category, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center">
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
                        <div className="flex flex-wrap gap-2 mb-2 items-center text-gray-500 text-sm">
                            Tags:
                            {taggedFriends.map((friend, index) => (
                                <span key={index}
                                    className="bg-gray-400 text-white pl-2 rounded flex items-center text-sm">
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
                    <div className="mb-4 relative text-sm">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input ref={withWhomInputRef}
                            type="text"
                            value={withWhom}
                            onChange={(e) => setWithWhom(e.target.value)}
                            placeholder="Who are you with?"
                            className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg" />
                        {withWhom && (
                            <button type="button"
                                onClick={() => setWithWhom("")}
                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        )}
                        {withWhom && filteredFriends.length > 0 && (
                            <div className="absolute bg-white border rounded-lg mt-1 w-full z-10">
                                {filteredFriends.map((friend) => (
                                    <div key={friend}
                                        onClick={() => {
                                            if (!taggedFriends.includes(friend)) {
                                                setTaggedFriends([...taggedFriends, friend]);
                                            }
                                            setWithWhom("");
                                        }}
                                        className="cursor-pointer hover:bg-gray-100 p-2">
                                        {friend}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className="my-4">
                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                            <div className="relative inline-flex items-center bg-gray-100 text-blue-500 px-3 py-2 gap-2 rounded-lg border border-solid">
                                <img src={public_status_icon} alt="Photo/Video" />
                                <select value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="appearance-none bg-transparent outline-none pr-6" >
                                    <option value="Public">Public</option>
                                    <option value="Private">Private</option>
                                    <option value="Draft">Draft</option>
                                </select>
                                <div className="absolute right-2 pointer-events-none">
                                    <i className="fa-solid fa-caret-down text-blue-500"></i>
                                </div>
                            </div>
                            <div onClick={handlePhotoVideo}
                                className="bg-gray-100 text-blue-500 px-3 py-2 rounded-lg flex items-center gap-2 border border-solid">
                                <img src={camera_icon} alt="Photo/Video" /> Photo/Video
                            </div>
                            <div onClick={handleTagFriends}
                                className="bg-gray-100 text-blue-500 px-3 py-2 rounded-lg flex items-center gap-2 border border-solid">
                                <img src={tag_icon} alt="Photo/Video" />Tag friends
                            </div>
                            <div onClick={() => setCategoryDropdown(!categoryDropdown)}
                                className="bg-gray-100 text-blue-500 px-3 py-2 rounded-lg flex items-center gap-2 border border-solid">
                                <img src={post_category_icon} alt="Photo/Video" /> Categories{" "}
                                <i className="fa-solid fa-caret-down"></i>
                                {categoryDropdown && (
                                    <div className="absolute bg-white border rounded-lg mt-40 z-10 text-left">
                                        {listCategories.map((cat) => (
                                            <div key={cat}
                                                onClick={() => addCategory(cat)}
                                                className="cursor-pointer text-black hover:bg-gray-100 p-2 rounded">
                                                {cat}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-6 grid-cols-3 gap-3 mb-2">
                        {images.slice(0, 6).map((image, index) => (
                            <div key={index} className="relative">
                                <img src={image}
                                    alt="Post"
                                    className={`w-full h-24 rounded-lg object-cover ${index === 5 && images.length > 6 ? "brightness-50" : ""}`} />
                                {index === 5 && images.length > 6 && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
                                        +{images.length - 6} more
                                    </div>
                                )}
                                <button type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" >
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
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" >
                        PUBLISH
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostCreatePopup;