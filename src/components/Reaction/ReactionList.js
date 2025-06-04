// src/components/Reaction/ReactionList.js
import React, { useState, useEffect } from "react";
import instance from "../../Axios/axiosConfig";
import { toast, Bounce } from "react-toastify";

const ReactionList = ({ postId, isOpen, onClose }) => {
    const [reactions, setReactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([]); // Danh sách danh mục với icon và số lượng

    useEffect(() => {
        if (!isOpen || !postId) return;

        const fetchReactions = async () => {
            setLoading(true);
            try {
                const response = await instance.get(`/api/reaction/all-by-post/${postId}`);
                if (response.data.success && Array.isArray(response.data.reactionDTOs)) {
                    setReactions(response.data.reactionDTOs);

                    // Tạo danh sách danh mục với icon và số lượng
                    const categoryCounts = response.data.reactionDTOs.reduce((acc, item) => {
                        const reactionName = item.categoryReaction.reactionName;
                        acc[reactionName] = (acc[reactionName] || 0) + 1;
                        return acc;
                    }, {});

                    const uniqueCategories = [
                        { name: "All", icon: null, count: response.data.reactionDTOs.length },
                        ...new Set(
                            response.data.reactionDTOs.map((item) => ({
                                name: item.categoryReaction.reactionName,
                                icon: item.categoryReaction.iconUrl,
                                count: categoryCounts[item.categoryReaction.reactionName] || 0,
                            }))
                        ),
                    ];
                    setCategories(uniqueCategories);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                console.error("Error fetching post reactions:", err);
                toast.error("Không thể tải danh sách phản ứng!", {
                    position: "top-right",
                    autoClose: 3000,
                    transition: Bounce,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchReactions();
    }, [isOpen, postId]);

    // Lọc phản ứng theo danh mục
    const filteredReactions =
        selectedCategory === "All"
            ? reactions
            : reactions.filter(
                (reaction) => reaction.categoryReaction.reactionName === selectedCategory
            );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-lg h-96 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`flex items-center text-sm font-semibold px-2 py-1 border-b-2 ${selectedCategory === category.name
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-700 hover:text-blue-500"
                                    }`}
                            >
                                {category.name === "All" ? (
                                    <span>{category.name}</span>
                                ) : (
                                    <>
                                        <img
                                            src={category.icon}
                                            alt={category.name}
                                            className="w-5 h-5 mr-1"
                                        />
                                        <span>{category.count}</span>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Đóng"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Tabs lọc danh mục */}

                {/* Danh sách phản ứng */}
                {loading ? (
                    <div className="text-center text-gray-600">Đang tải...</div>
                ) : filteredReactions.length > 0 ? (
                    <ul className="space-y-3">
                        {filteredReactions.map((reaction) => (
                            <li
                                key={reaction.reaction.reactionId}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={reaction.account.avatar}
                                    alt={reaction.account.fullName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">{reaction.account.fullName}</p>
                                    <p className="text-sm text-gray-500">
                                        {reaction.categoryReaction.reactionName}
                                    </p>
                                </div>
                                <img
                                    src={reaction.categoryReaction.iconUrl}
                                    alt={reaction.categoryReaction.reactionName}
                                    className="w-6 h-6"
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-gray-600">
                        Không có phản ứng nào cho danh mục này
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReactionList;