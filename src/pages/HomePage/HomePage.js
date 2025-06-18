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
import PostCardSkeleton from "../../components/Post/PostCardSkeleton";
import defaultAvatar from '../../assets/images/default-avatar.png';


const HomePage = () => {
  const [accountId, setAccountId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  //DÙNG CHO INFINITE SCROLL
  const [posts, setPosts] = useState([]);

  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const postContainerRef = useRef(null);
  const PAGE_SIZE = 5;
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  //lấy thông tin người dùng từ storage
  useEffect(() => {
    const storedAccId = localStorage.getItem("accId") || sessionStorage.getItem("accId");
    const storedAvatarUrl = localStorage.getItem("avatarUrl") || sessionStorage.getItem("avatarUrl");

    if (storedAccId) {
      setAccountId(storedAccId);
      setAvatarUrl(storedAvatarUrl || defaultAvatar);
    }
  }, []);

  const fetchPosts = async ({ lastPostId, reset = false }) => {
    setLoading(true);
    if (lastPostId) setLoadingMore(true);
    setError(null);

    try {
      const response = await instance.get("/api/post/infinite", {
        params: {
          lastPostId: lastPostId,
          pageSize: PAGE_SIZE,
        },
      });

      console.log("API posts response:", response.data.data); // Debug

      if (response.data.success) {
        const newPosts = response.data.data || [];
        setPosts((prevPosts) =>
          reset ? newPosts : [...prevPosts, ...newPosts]
        );
        setHasMore(response.data.hasMore);

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
      setError("Failed to load posts!");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  //GỌI LẦN ĐẦU

  useEffect(() => {
    setSkip(0);
    setLastPostId(null);
    fetchPosts({ lastPostId: null, reset: true });
  }, []);

  const { skip, setSkip } = useInfiniteScroll({
    fetchData: () => fetchPosts({ lastPostId }),
    containerRef: window, //thay đổi thành window do scroll nguyên trang
    direction: "down",
    threshold: 50,
    hasMore,
    loading,
    loadingMore,
    comments: posts.length,
    data: PAGE_SIZE,
    take: posts.length,
  });

  const handleCommentCountChange = (postId, newCount) => {
    setPosts((prevPosts) =>
      prevPosts.map((postMapper) =>
        postMapper.post && (postMapper.post.postId) === postId
          ? { ...postMapper, post: { ...postMapper.post, comments: newCount } }
          : postMapper
      )
    );
  };

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

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.post.postId !== postId));
  };

  const handlePostCreate = (newPostData) => {
    if (newPostData.postScope === "Public") {
      setPosts((prevPosts) => [newPostData, ...prevPosts]);
    }

  }

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
            className="flex flex-col gap-5 lg:order-2 order-3 w-full"
          >
            <PostCreate profileImage={avatarUrl} onPostCreate={handlePostCreate} />
            {loading && skip === 0 ? (
              <div className="flex flex-col gap-5">
                {[...Array(3)].map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-4">{error}</div>
            ) : posts.length > 0 ? (
              posts.map((postMapper, index) => (
                postMapper && postMapper.post && postMapper.ownerPost ? (
                  <PostCard
                    onDeletePost={handleDeletePost}
                    key={`${postMapper.post.postId}-${index}`}
                    post={{
                      accId: postMapper.ownerPost.accId || "Unknown",
                      postId: postMapper.post.postId,
                      fullName: postMapper.ownerPost.fullName || "Unknown User",
                      avatar: postMapper.ownerPost.avatar || "https://via.placeholder.com/40",
                      createAt: postMapper.post.createdAt,
                      content: postMapper.post.postContent,
                      images: postMapper.postImages?.map((img) => img.imageUrl) || [],
                      hashtags: postMapper.hashTags?.map((tag) => tag.hashTagContent) || [],
                      tagFriends: postMapper.postTags?.map((tag) => ({
                        accId: tag.accId,
                        fullname: tag.fullname || tag.username || "Unknown", // Sử dụng username nếu fullname là null
                      })) || [],
                      categories: postMapper.postCategories?.map((cat) => cat.categoryName) || [],
                      likes: postMapper.reactionCount || 0,
                      comments: postMapper.commentCount || 0,
                      shares: postMapper.shareCount || 0,
                    }}
                    onCommentCountChange={(newCount) =>
                      handleCommentCountChange(postMapper.post.postId, newCount)
                    }
                  />
                ) : null
              ))
            ) : (
              <div className="text-center py-4">Không tìm thấy bài viết</div>
            )}
            {loadingMore && (
              <div className="flex flex-col gap-5 py-4">
                {[...Array(2)].map((_, index) => (
                  <PostCardSkeleton key={`more-${index}`} />
                ))}
              </div>
            )}
          </section>
          {/* Right */}
          <section className="flex flex-col gap-5 lg:order-3 order-2">
            <SuggestedFriends
              friends={suggestedFriends}
              onLoadList={fetchSuggestedFriends}
            />
            <SuggestedGroups />
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
