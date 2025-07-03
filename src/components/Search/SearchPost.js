import React, { useEffect, useRef, useState } from "react";
import PostCard from "../Post/PostCard";
import { useLocation } from "react-router-dom";
import instance from "../../Axios/axiosConfig";

const SearchPost = ({ keyword }) => {
  const { state } = useLocation();
  const { categoryIds = [] } = state || {};
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(categoryIds);
  const [isAndLogic, setIsAndLogic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const popupRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await instance.get("/api/category-post/list");
      if (response.data.success) {
        setCategories(
          response.data.data.map((cat) => ({
            id: cat.categoryId,
            name: cat.categoryName,
          }))
        );
      } else {
        setError(response.data.messageError || "Failed to fetch categories");
      }
    } catch (err) {
      setError("Failed to fetch categories");
    }
  };

  const fetchPosts = async (keywordToSearch = searchKeyword) => {
    try {
      setLoading(true);
      setError(null); // Reset error trước khi fetch
      
      // Trim và validate keyword
      const trimmedKeyword = keywordToSearch?.trim();
      
      const params = {
        keyword: trimmedKeyword || undefined,
        categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
        isAndLogic,
      };

      console.log("Fetch params:", params);
      console.log("Keyword from prop:", keyword);
      console.log("Search keyword state:", searchKeyword);
      console.log("Keyword to search:", keywordToSearch);

      const response = await instance.get("/api/post/search", {
        params,
        paramsSerializer: {
          indexes: null,
        },
      });

      if (response.data.success) {
        setPosts(response.data.data || []);
        console.log("List search: ", response.data.data);
      } else {
        setError(response.data.message || "No posts found");
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.message || "Failed to fetch posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories only once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Update searchKeyword when keyword prop changes và fetch ngay lập tức
  useEffect(() => {
    console.log("Keyword prop changed:", keyword);
    if (keyword !== undefined && keyword !== searchKeyword) {
      setSearchKeyword(keyword);
      // Fetch posts ngay lập tức với keyword mới
      fetchPosts(keyword);
    }
  }, [keyword]);

  // Fetch posts when selectedCategories or isAndLogic changes
  useEffect(() => {
    if (searchKeyword !== undefined) {
      fetchPosts();
    }
  }, [selectedCategories, isAndLogic]);

  // Initial fetch when component mounts và có searchKeyword
  useEffect(() => {
    if (searchKeyword !== undefined) {
      fetchPosts();
    }
  }, []); // Chỉ chạy 1 lần khi mount

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsCategoryPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleLogicToggle = () => {
    setIsAndLogic(!isAndLogic);
  };

  const handleSearch = () => {
    fetchPosts();
    setIsCategoryPopupOpen(false); // Close popup after search
  };

  const toggleCategoryPopup = () => {
    setIsCategoryPopupOpen(!isCategoryPopupOpen);
  };

  // Get selected category names
  const selectedCategoryNames = selectedCategories
    .map((id) => categories.find((cat) => cat.id === id)?.name)
    .filter(Boolean);

  const logicText = isAndLogic ? "and" : "or";
  let displayText = "";
  if (selectedCategoryNames.length === 1) {
    displayText = selectedCategoryNames[0];
  } else if (selectedCategoryNames.length === 2) {
    displayText = `${selectedCategoryNames[0]} ${logicText} ${selectedCategoryNames[1]}`;
  } else if (selectedCategoryNames.length > 2) {
    const allExceptLast = selectedCategoryNames.slice(0, -1).join(", ");
    const last = selectedCategoryNames[selectedCategoryNames.length - 1];
    displayText = `${allExceptLast} ${logicText} ${last}`;
  }

  return (
    <div className="w-full flex flex-col items-center pt-12 lg:mt-[120px] mt-[63px]">
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <span className="font-bold">KEYWORD: </span>
            <span>{searchKeyword || "None"}</span>
          </div>
          <button onClick={toggleCategoryPopup}>
            <i className="fas fa-sliders-h text-sky-400 text-xl"></i>
          </button>
        </div>

        {isCategoryPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={popupRef}
              className="bg-white p-4 rounded-lg max-h-[80vh] overflow-y-auto w-11/12 max-w-md"
            >
              <h3 className="font-bold mb-2">Filter Posts</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isAndLogic}
                    onChange={handleLogicToggle}
                    className="h-4 w-4"
                  />
                  <span>Match all selected categories</span>
                </label>
                <h4 className="font-semibold mt-2">Select Categories</h4>
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="h-4 w-4"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="p-3 bg-blue-500 text-white rounded-md flex-1"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="p-3 bg-gray-200 text-gray-800 rounded-md flex-1"
                  onClick={toggleCategoryPopup}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.post.postId}
              post={{
                postId: post.post.postId,
                accId: post.post.accId,
                fullName: post.ownerPost?.fullName,
                avatar: post.ownerPost?.avatar,
                createAt: post.post.createdAt,
                content: post.post.postContent,
                images: post.postImages?.map((img) => img.imageUrl),
                hashtags: post.hashTags?.map((tag) => tag.hashTagContent),
                categories: post.postCategories?.map((cat) => cat.categoryName),
                tagFriends: post.postTags?.map((tag) => ({
                  accId: tag.accId,
                  fullname: tag.fullname || tag.username,
                })),
                likes: post.reactionCount,
                comments: post.commentCount,
                shares: post.shareCount,
              }}
              onCommentCountChange={(newCount) =>
                console.log("Comment count updated:", newCount)
              }
            />
          ))
        ) : (
          <div>
            No posts found for "{searchKeyword}"
            {displayText && (
              <>
                {" in "}
                {displayText || "no categories"}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPost;