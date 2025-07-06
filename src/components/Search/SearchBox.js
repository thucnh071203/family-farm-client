import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const isDeleting = useRef(false); // Thêm flag để track việc xóa

  const fetchSearchHistory = async () => {
    try {
      const response = await instance.get("/api/search-history/list-no-duplicate");
      if (response.data.success) {
        setSearchHistory(response.data.data || []);
      } else {
        console.error("Failed to fetch search history:", response.data.messageError);
      }
    } catch (err) {
      console.error("Error fetching search history:", err);
    }
  };

  const deleteSearchHistory = async (searchKey) => {
    try {
      isDeleting.current = true; // Đánh dấu đang xóa
      const response = await instance.delete(`/api/search-history/delete-by-search-key/${searchKey}`);
      if (response.data === true) {
        // Xóa mục khỏi danh sách lịch sử
        setSearchHistory((prev) => prev.filter((item) => item.searchKey !== searchKey));
      } else {
        console.error("Failed to delete search history");
      }
    } catch (err) {
      console.error("Error deleting search history:", err);
    } finally {
      // Reset flag sau khi hoàn thành
      setTimeout(() => {
        isDeleting.current = false;
      }, 100);
    }
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      console.log("Navigating with keyword:", keyword);
      navigate("/Search", { state: { section: "search-post", keyword, categoryIds: [] } });
      setShowHistory(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      handleSearch();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowHistory(true);
    fetchSearchHistory();
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Chỉ đóng popup nếu không đang trong quá trình xóa
    setTimeout(() => {
      if (!isDeleting.current) {
        setShowHistory(false);
      }
    }, 200);
  };

  const handleHistoryClick = (searchKey) => {
    setKeyword(searchKey);
    setShowHistory(false);
    navigate("/Search", { state: { section: "search-post", keyword: searchKey, categoryIds: [] } });
  };

  // Xử lý click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Chỉ đóng nếu không đang xóa
        if (!isDeleting.current) {
          setShowHistory(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-box relative">
      <div className={`search-box-wrapper ${isFocused ? "focused" : ""}`}>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <i
          className="fa-solid fa-magnifying-glass search-icon"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
      {showHistory && searchHistory.length > 0 && (
        <div
          ref={popupRef}
          className="absolute top-full mt-0 w-[80%] text-left bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto"
        >
          {searchHistory.map((history) => (
            <div
              key={history.searchHistoryId}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
            >
              <span
                className="cursor-pointer flex-1"
                onClick={() => handleHistoryClick(history.searchKey)}
              >
                {history.searchKey}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn event bubbling
                  deleteSearchHistory(history.searchKey);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;