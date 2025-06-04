import React, { useState, useEffect } from "react";
import OptionsPost from "./OptionsPost";
import ReactionPopup from "../Reaction/ReactionPopup";
import ReactionList from "../Reaction/ReactionList";
import CommentSection from "../Comment/CommentSection";
import formatTime from "../../utils/formatTime";
import instance from "../../Axios/axiosConfig";
import { toast, Bounce } from "react-toastify";

const PostCard = ({ post, onCommentCountChange }) => {
  // Default post data
  const defaultPost = {
    fullName: "Phuong Nam",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
    createAt: "July 29 2024, 07:49 AM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. #blog #nienmoulming #polytecode",
    images: null,
    hashtags: null,
    tagFriends: null,
    likes: 0,
    comments: 0,
    shares: 0,
  };

  const postData = { ...defaultPost, ...post };
  const hashTags = postData.hashtags || ["blog", "nienmoulming", "polytecode"];
  const categories = postData.categories || ["Pants", "Diseases"];
  const tagFriends = postData.tagFriends || [];

  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(postData.comments);
  const [likeCount, setLikeCount] = useState(postData.likes);
  const [reactionType, setReactionType] = useState(null);
  const [hasReacted, setHasReacted] = useState(false);
  const [isLikeHovered, setIsLikeHovered] = useState(false);
  const [showReactionList, setShowReactionList] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [loadingReactions, setLoadingReactions] = useState(true);

  // Get accId from localStorage or sessionStorage
  const accId = localStorage.getItem("accId") || sessionStorage.getItem("accId");

  // Fetch reactions from API
  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await instance.get("/api/category-reaction/all-available");
        if (response.data && Array.isArray(response.data)) {
          const formattedReactions = response.data.map((item) => ({
            id: item.id || item.categoryReactionId,
            name: item.reactionName || item.name || "Unknown",
            icon: item.iconUrl || item.image || "",
          }));
          setReactions(formattedReactions);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching reactions:", err);
        toast.error("Không thể tải danh sách biểu cảm!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
      } finally {
        setLoadingReactions(false);
      }
    };

    fetchReactions();
  }, []);

  // Get reaction count and user reaction state
  useEffect(() => {
    const fetchReactionData = async () => {
      if (!postData.postId || !accId) return;

      try {
        const response = await instance.get(`/api/reaction/all-by-post/${postData.postId}`);
        if (response.data.success && Array.isArray(response.data.reactionDTOs)) {
          setLikeCount(response.data.availableCount || 0);

          // Check if user has reacted
          const userReaction = response.data.reactionDTOs.find(
            (reaction) => reaction.account.accId === accId && !reaction.reaction.isDeleted
          );
          if (userReaction) {
            setHasReacted(true);
            setReactionType(userReaction.categoryReaction.id || userReaction.categoryReaction.categoryReactionId);
          } else {
            setHasReacted(false);
            setReactionType(null);
          }
        }
      } catch (err) {
        console.error("Error fetching reaction data:", err);
        toast.error("Unable to load reaction data!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
      }
    };

    fetchReactionData();
  }, [postData.postId, accId]);

  // Handle add or remove reaction
  const handleReact = async (categoryReactionId) => {
    if (!accId) {
      toast.error("Please log in to react!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

    try {
      if (!postData.postId || !/^[0-9a-fA-F]{24}$/.test(postData.postId)) {
        console.error("Invalid postId:", postData.postId);
        toast.error("Invalid post ID!", { position: "top-right", autoClose: 3000, transition: Bounce });
        return;
      }
      if (!categoryReactionId || !/^[0-9a-fA-F]{24}$/.test(categoryReactionId)) {
        console.error("Invalid categoryReactionId:", categoryReactionId);
        toast.error("Invalid reaction ID!", { position: "top-right", autoClose: 3000, transition: Bounce });
        return;
      }

      console.log(`Calling API with postId: ${postData.postId}, categoryReactionId: ${categoryReactionId}`);
      const response = await instance.post(
        `/api/reaction/toggle-post/${postData.postId}?categoryReactionId=${categoryReactionId}`
      );
      console.log("API Response:", response.data);

      if (
        response.data === "Reaction has been toggled." ||
        (response.data && response.data.success)
      ) {
        const reactionResponse = await instance.get(`/api/reaction/all-by-post/${postData.postId}`);
        console.log("Reaction Count Response:", reactionResponse.data);
        if (reactionResponse.data.success) {
          setLikeCount(reactionResponse.data.availableCount || 0);

          const userReaction = reactionResponse.data.reactionDTOs.find(
            (reaction) => reaction.account.accId === accId && !reaction.reaction.isDeleted
          );
          if (userReaction) {
            setHasReacted(true);
            setReactionType(userReaction.categoryReaction.id || userReaction.categoryReaction.categoryReactionId);
          } else {
            setHasReacted(false);
            setReactionType(null);
          }
        }

        setIsLikeHovered(false);
      } else {
        throw new Error(
          typeof response.data === "string"
            ? response.data
            : response.data.message || "Unable to toggle reaction"
        );
      }
    } catch (err) {
      console.error("Error toggling reaction:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      toast.error(`Unable to react: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  // Find the current reaction based on reactionType
  const currentReaction = reactions.find((reaction) => reaction.id === reactionType) || {
    name: "Like",
    icon: "https://example.com/like.png", // Fallback icon
  };

  const renderTagFriends = () => {
    const fullNameElement = (
      <span className="text-[#088DD0]">{postData.fullName}</span>
    );

    if (!tagFriends.length) return fullNameElement;

    if (tagFriends.length === 1) {
      return (
        <>
          {fullNameElement}
          <span className="text-black">
            <span className="text-gray-400 font-normal"> with </span> {tagFriends[0]}
          </span>
        </>
      );
    }

    if (tagFriends.length === 2) {
      return (
        <>
          {fullNameElement}
          <span className="text-black">
            <span className="text-gray-400 font-normal"> with </span> {tagFriends[0]} and {tagFriends[1]}
          </span>
        </>
      );
    }

    return (
      <>
        {fullNameElement}
        <span className="text-black">
          <span className="text-gray-400 font-normal"> with </span> {tagFriends[0]} and {tagFriends.length - 1} more
        </span>
      </>
    );
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentCountChange = (newCount) => {
    setCommentCount(newCount);
    onCommentCountChange(newCount);
  };

  return (
    <div className="p-4 text-left bg-white border border-gray-200 border-solid rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={postData.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-bold">{renderTagFriends()}</h3>
            <p className="text-sm text-gray-500">{formatTime(postData.createAt)}</p>
          </div>
        </div>
        <div>
          <OptionsPost />
        </div>
      </div>
      <div className="flex flex-col items-start mt-3 text-sm">
        <p className="mb-2 text-[#7D7E9E] font-light">{postData.content}</p>
        <p className="mb-2 font-bold">
          {hashTags.map((tag, index) => (
            <span key={index} className="mr-2">
              #{tag}
            </span>
          ))}
        </p>
        <div className="flex items-center gap-2 mb-2">
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 font-bold">
              Categories:
              {categories.map((cat, index) => (
                <span
                  key={index}
                  className="flex items-center px-2 py-1 font-normal text-gray-700 bg-gray-200 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {postData.images && postData.images.length > 0 && (
        <>
          {postData.images.length === 3 ? (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex flex-col gap-2">
                <img
                  src={postData.images[0]}
                  alt={postData.content}
                  className="object-cover w-full rounded-md h-1/2"
                />
                <img
                  src={postData.images[1]}
                  alt={postData.content}
                  className="object-cover w-full rounded-md h-1/2"
                />
              </div>
              <img
                src={postData.images[2]}
                alt={postData.content}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {postData.images.slice(0, 4).map((img, index) => {
                const isLastVisible = index === 3 && postData.images.length > 4;
                return (
                  <div
                    key={index}
                    className={`relative rounded-md overflow-hidden ${postData.images.length === 1 ? "col-span-2" : ""}`}
                  >
                    <img
                      src={img}
                      alt={postData.content}
                      className="object-cover w-full h-full"
                    />
                    {isLastVisible && (
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50">
                        +{postData.images.length - 4} more
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-8">
        <div className="flex justify-around w-full lg:w-1/4 lg:justify-between">
          <button
            onClick={() => setShowReactionList(true)}
            className="cursor-pointer hover:underline"
            title="Xem danh sách phản ứng"
          >
            <i className="text-blue-500 fa-solid fa-thumbs-up"></i> {likeCount}
          </button>
          <p>
            <i className="text-blue-500 fas fa-comment"></i> {commentCount}
          </p>
          <p>
            <i className="text-blue-500 fa-solid fa-share"></i> {postData.shares}
          </p>
        </div>
        <div className="flex justify-between w-full gap-1 lg:w-3/4 items-center">
          <div
            className="relative flex-1"
            onMouseEnter={() => setIsLikeHovered(true)}
            onMouseLeave={() => setIsLikeHovered(false)}
          >
            <button
              className="flex-1 p-2 text-center rounded-sm w-full flex items-center bg-gray-100 hover:bg-gray-200 h-9 justify-center"
            >
              {hasReacted ? (
                <>
                  <img
                    src={currentReaction.icon}
                    alt={currentReaction.name}
                    className="inline-block w-5 h-5 mr-1 object-contain" // Thêm object-contain để giữ tỷ lệ
                    style={{ verticalAlign: "middle" }} // Căn giữa theo chiều dọc
                  />
                  <span className="text-blue-600">{currentReaction.name}</span>
                </>
              ) : (
                <>
                  <i
                    className="mr-2 fa-solid fa-thumbs-up"
                  ></i>
                  <span>Like</span>
                </>
              )}
            </button>
            {isLikeHovered && <ReactionPopup onReact={handleReact} />}
          </div>
          <button
            className="flex-1 p-2 text-center bg-gray-100 rounded-sm hover:bg-gray-200 items-center h-9"
            onClick={handleToggleComments}
          >
            <i className="mr-2 fas fa-comment w-5 h-5"></i>Comment
          </button>
          <button className="flex-1 p-2 text-center bg-gray-100 rounded-sm hover:bg-gray-200 items-center h-9">
            <i className="mr-2 fa-solid fa-share  w-5 h-5"></i>Share
          </button>
        </div>
      </div>
      {showComments && (
        <CommentSection
          postId={postData.postId}
          commentCount={commentCount}
          onCommentCountChange={handleCommentCountChange}
        />
      )}
      <ReactionList
        postId={postData.postId}
        isOpen={showReactionList}
        onClose={() => setShowReactionList(false)}
      />
    </div>
  );
};

export default PostCard;