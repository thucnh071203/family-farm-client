import React, { useState, useRef } from "react";
import { useEffect } from 'react';
import public_status_icon from "../../assets/icons/public_status_icon.svg";
import camera_icon from "../../assets/icons/camera_icon.svg";
import tag_icon from "../../assets/icons/tag_icon.svg";
import post_category_icon from "../../assets/icons/post_category_icon.svg";
import './CreatePost.css';
import defaultAvatar from '../../assets/images/default-avatar.png';
import instance from "../../Axios/axiosConfig";
import { toast } from "react-toastify";

const PostCreatePopup = ({ onCreatedPost, onClose }) => {

    const [withWhom, setWithWhom] = useState("");
    const [images, setImages] = useState([]);

    const [categoryDropdown, setCategoryDropdown] = useState(false);
    const withWhomInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [accountId, setAccountId] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [accessToken, setAccessToken] = useState("");


    //VARIABLE GỬI FORM CREATE
    const [imagesFile, setImagesFile] = useState([]);
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState("");
    const [taggedFriends, setTaggedFriends] = useState([]);
    const [status, setStatus] = useState("Public");

    //danh sách lấy từ db
    const [listCategories, setListCategory] = useState([]);
    const [listFriends, setListFriends] = useState([]);

    //xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        //Gán dữ liệu vào form data
        formData.append("PostContent", content);
        categories.forEach(cat => formData.append("ListCategoryOfPost", cat.categoryId));
        taggedFriends.forEach(friend => formData.append("ListTagFriend", friend.accId));
        imagesFile.forEach(file => formData.append("ListImage", file));

        formData.append("Privacy", status);
        formData.append("isInGroup", false);

        try {
            const response = await instance.post('/api/post/create', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data' // quan trọng
                }
            });

            console.log(response.data.data)

            if(response.status === 200){
                toast.success("Post successfully!");
                onCreatedPost(response.data.data);
            }
        } catch (err) {
            console.error("Lỗi khi gửi bài viết:", err);
        }
    };

    //lấy thông tin người dùng từ storage
    useEffect(() => {
        const storedAccId = localStorage.getItem("accId") || sessionStorage.getItem("accId");
        const storedAvatarUrl = localStorage.getItem("avatarUrl") || sessionStorage.getItem("avatarUrl");
        const storedAccesstoken = localStorage.getItem("accessToken");
        if (storedAccId) {
            setAccountId(storedAccId);
            setAvatarUrl(storedAvatarUrl || defaultAvatar);
            setAccessToken(storedAccesstoken);
        }
    }, []);

    //GỌI API LẤY DANH SÁCH FRIEND CỦA ACCID
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await instance.get('/api/friend/list-friend', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                if (response.status === 200) {
                    var listFriendDb = response.data.data;
                    setListFriends(listFriendDb);
                }
            } catch (error) {
                toast.error("Cannot get list friend!")
            }
        }

        fetchFriends();
    }, [])

    useEffect(() => {
        console.log("✅ list friend mới cập nhật:", listFriends);
    }, [listFriends]);

    //GỌI API LẤY CATEGORY post
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await instance.get('/api/category-post/list', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                if (response.status === 200) {
                    var listCategoryDb = response.data.data;
                    setListCategory(listCategoryDb);
                }
            } catch (error) {
                toast.error("Cannot get list category!")
            }
        }

        fetchCategories();
    }, [])

    useEffect(() => {
        console.log("✅ listCategory mới cập nhật:", listCategories);
    }, [listCategories]);

    const removeCategory = (category) => {
        setCategories(categories.filter((c) => c !== category));
    };

    const removeFriend = (friend) => {
        setTaggedFriends(taggedFriends.filter((f) => f !== friend));
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagesFile(prev => prev.filter((_, i) => i !== index));
    };

    const addCategory = (category) => {
        // Tránh thêm trùng ID
        if (!categories.find((c) => c.categoryId === category.categoryId)) {
            setCategories([...categories, category]); // ✅ Lưu object
        }
        setCategoryDropdown(false);
    };

    const handleTagFriends = () => {
        withWhomInputRef.current.focus();
    };

    const handlePhotoVideo = () => {
        fileInputRef.current.click();
    };

    // const handleFileChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     const imageUrls = files.map((file) => URL.createObjectURL(file));
    //     setImages([...images, ...imageUrls]);
    //     e.target.value = ""; // Reset input file
    // };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImagesFile(prev => [...prev, ...files]);
        const fileUrls = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...fileUrls]);
    };

    const filteredFriends = (listFriends || []).filter((friend) =>
        (friend?.fullName || "").toLowerCase().includes((withWhom || "").toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">

                <div className="header-create">
                    <div className="header-left-create">
                        <h2 className="">
                            <i className="fa-solid fa-plus"></i> Create New Post
                        </h2>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="btn-close-create-post">
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="flex items-center gap-2 mb-4">
                        <img src={avatarUrl}
                            alt="Avatar" className="w-10 h-10 rounded-full" />
                        <textarea value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write something about you..."
                            className="flex-grow p-2 outline-none" />
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
                            {categories.map((category) => (
                                <span key={category.categoryId} className="flex items-center px-2 py-1 text-gray-700 bg-gray-200 rounded-full">
                                    {category.categoryName || "Khong có"}
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
                            {taggedFriends.map((friend) => (
                                <span key={friend.accId}
                                    className="flex items-center pl-2 text-sm text-white bg-gray-400 rounded">
                                    {friend.fullName}
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
                                    <div key={friend.accId}
                                        onClick={() => {
                                            if (!taggedFriends.includes(friend)) {
                                                setTaggedFriends([...taggedFriends, friend]);
                                            }
                                            setWithWhom("");
                                        }}
                                        className="p-2 cursor-pointer hover:bg-gray-100">
                                        {friend.fullName}
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

                            <div className="relative inline-block">
                                <div
                                    onClick={() => setCategoryDropdown(!categoryDropdown)}
                                    className="flex items-center gap-2 px-3 py-2 text-blue-500 bg-gray-100 border border-solid rounded-lg cursor-pointer"
                                >
                                    <img src={post_category_icon} alt="Photo/Video" /> Categories{" "}
                                    <i className="fa-solid fa-caret-down"></i>
                                </div>

                                {categoryDropdown && (
                                    <div className="absolute z-10 mt-2 w-full text-left bg-white border rounded-lg">
                                        {listCategories.map((cat) => (
                                            <div
                                                key={cat.categoryId}
                                                onClick={() => {
                                                    addCategory(cat);
                                                    setCategoryDropdown(false); // Đóng dropdown sau khi chọn
                                                }}
                                                className="p-2 text-black rounded cursor-pointer hover:bg-gray-100"
                                            >
                                                {cat.categoryName}
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
                        className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600" >
                        PUBLISH
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostCreatePopup;