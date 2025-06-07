import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import WeatherWidget from "../../components/Home/WeatherWidget";
import PopularService from "../../components/Services/PopularService";
import PostCreate from "../../components/Post/PostCreate";
import PostCard from "../../components/Post/PostCard";
import SuggestedFriends from "../../components/Home/SuggestedFriends";
import SuggestedGroups from "../../components/Home/SuggestedGroups";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import instance from "../../Axios/axiosConfig";
import { toast, Bounce } from "react-toastify";
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const postContainerRef = useRef(null);
  const PAGE_SIZE = 5; // Phù hợp với mặc định của API

  const [suggestedFriends, setSuggestedFriends] = useState([]);

  // Hàm gọi API để lấy bài viết
  const fetchPosts = async ({ lastPostId, reset = false }) => {
    setLoading(true);
    if (lastPostId) setLoadingMore(true);
    setError(null);

    try {
      const response = await instance.get("/api/post/infinite", {
        params: {
          lastPostId,
          pageSize: PAGE_SIZE,
        },
      });

      if (response.data.success) {
        const newPosts = response.data.data || [];
        setPosts((prevPosts) =>
          reset ? newPosts : [...prevPosts, ...newPosts]
        );
        setHasMore(response.data.hasMore);

        // Cập nhật lastPostId từ bài viết cuối cùng
        if (newPosts.length > 0) {
          setLastPostId(newPosts[newPosts.length - 1].post.postId);
        } else {
          setLastPostId(null);
        }
      } else {
        setError(response.data.message || "Tải bài post thất bại!");
        toast.error(response.data.message || "Tải bài post thất bại!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
      }
    } catch (error) {
      setError("Tải bài post thất bại!");
      toast.error("Tải bài post thất bại!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Sử dụng hook useInfiniteScroll
  const { skip, setSkip } = useInfiniteScroll({
    fetchData: () => fetchPosts({ lastPostId }),
    containerRef: postContainerRef,
    direction: "down",
    threshold: 50,
    hasMore,
    loading,
    loadingMore,
    take: PAGE_SIZE,
    data: posts,
  });

  // Tải bài post ban đầu
  useEffect(() => {
    setSkip(0);
    setLastPostId(null);
    fetchPosts({ lastPostId: null, reset: true });
  }, []);

  // Hàm cập nhật số lượng comment
  const handleCommentCountChange = (postId, newCount) => {
    setPosts((prevPosts) =>
      prevPosts.map((postMapper) =>
        postMapper.post.postId === postId
          ? { ...postMapper, post: { ...postMapper.post, comments: newCount } }
          : postMapper
      )
    );
  };

  // get suggestion friend
  const fetchSuggestedFriends = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://localhost:7280/api/friend/suggestion-friend-home`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (json.data.length !== 0) {
        setSuggestedFriends(json.data);
      } else {
        setSuggestedFriends([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuggestedFriends();
  }, []);

  return (
    <div className="HomePage bg-gray-100">
      <Header />

      <NavbarHeader />
      <main className="max-w-7xl mx-auto lg:pt-[140px] pt-[65px]">
        <div className="gap-5 grid lg:grid-cols-[1fr_2fr_1fr] grid-cols-1">
          {/* Left */}
          <aside className="flex flex-col gap-5 order-1">
            <WeatherWidget />
            <PopularService />
          </aside>
          {/* Posts Section */}
          <section
            ref={postContainerRef}
            className="flex flex-col gap-5 lg:order-2 order-3 h-[calc(100vh-140px)] w-full overflow-y-auto"
          >
            <PostCreate />
            {loading && skip === 0 ? (
              <div className="text-center py-4">Đang tải bài viết...</div>
            ) : error ? (
              <div className="text-center py-4">{error}</div>
            ) : posts.length > 0 ? (
              posts.map((postMapper, index) => (
                <PostCard
                  key={`${postMapper.post.postId}-${index}`}
                  post={{
                    postId: postMapper.post.postId,
                    fullName: postMapper.post.accId, // Có thể cần gọi API lấy tên user từ accId
                    avatar:
                      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", // Placeholder
                    createAt: postMapper.post.createdAt,
                    content: postMapper.post.postContent,
                    images: postMapper.postImages.map((img) => img.imageUrl),
                    hashtags: postMapper.hashTags.map(
                      (tag) => tag.hashTagContent
                    ),
                    tagFriends: postMapper.postTags.map((tag) => tag.username),
                    categories: postMapper.postCategories.map(
                      (cat) => cat.categoryName
                    ),
                    likes: postMapper.post.likes || 0, // API chưa trả về, giả định 0
                    comments: postMapper.post.comments || 0, // Giả định 0
                    shares: postMapper.post.shares || 0, // Giả định 0
                  }}
                  onCommentCountChange={(newCount) =>
                    handleCommentCountChange(postMapper.post.postId, newCount)
                  }
                />
              ))
            ) : (
              <div className="text-center py-4">Không tìm thấy bài viết</div>
            )}
            {loadingMore && (
              <div className="text-center py-4">
                <svg
                  className="animate-spin h-5 w-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang tải thêm bài viết...
              </div>
            )}
          </section>
          {/* Right */}
          <section className="flex flex-col gap-5 lg:order-3 order-2">
            <SuggestedFriends
              friends={suggestedFriends}
              onLoadList={fetchSuggestedFriends} //load list suggestion khi click add friend success
            />
            <SuggestedGroups />
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
