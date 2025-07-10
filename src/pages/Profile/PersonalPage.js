import Header from "../../components/Header/Header";
import CoverBackground from "../../components/Profile/CoverBackground";
import ProfileAvatar from "../../components/Profile/ProfileAvatar";
import BasicInfo from "../../components/Profile/BasicInfo";
import FriendList from "../../components/Friend/FriendItemsList";
import PhotoGallery from "../../components/Profile/PhotoGallery";
import PostCard from "../../components/Post/PostCard";
import PostCreate from "../../components/Post/PostCreate";
import PostFilters from "../../components/Post/PostFilters";
import NavbarHeader from "../../components/Header/NavbarHeader";
import FriendActionButton from "../../components/Friend/FriendActionButton";
import { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { HubConnectionBuilder } from "@microsoft/signalr";

const PersonalPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("Unknown");
  const [background, setBackground] = useState("");
  const [basicInfo, setBasicInfo] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);

  const { accId } = useParams();
  const defaultBackground =
    "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fdefault_background.jpg?alt=media&token=0b68b316-68d0-47b4-9ba5-f64b9dd1ea2c";
  const storeData =
    localStorage.getItem("profileData") ||
    sessionStorage.getItem("profileData");
  const myProfile = storeData ? JSON.parse(storeData) : null;
  const isOwner = !accId || accId === myProfile?.accId;
  const [listFriends, setListFriends] = useState([]);
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy thông tin người dùng từ storage
  useEffect(() => {
    const storedAccId =
      localStorage.getItem("accId") || sessionStorage.getItem("accId");
    const storedAccesstoken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (storedAccId) {
      setAccessToken(storedAccesstoken);
    }
  }, []);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        let response;
        if (isOwner) {
          response = await instance.get("/api/account/own-profile", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (response.status === 200) {
            const data = response.data.data;
            setFullName(data.fullName || data.firstName || "Unknown User");
            setAvatar(data.avatar || data.profileImage || "default-avatar-url");
            setBackground(data.background || data.coverImage || defaultBackground);
            setRoleId(data.roleId);


            const basicInfoMapping = {
              gender: data.gender || "Updating",
              location: data.address || "Updating",
              study: data.studyAt || "Updating",
              work: data.workAt || "Updating",
            };
            setBasicInfo(basicInfoMapping);

            const storage = localStorage.getItem("accessToken")
              ? localStorage
              : sessionStorage;
            storage.setItem("profileData", JSON.stringify(data));
            storage.setItem("avatarUrl", data.avatar);
            storage.setItem("fullName", data.fullName);
          }
        } else {
          response = await instance.get(
            `/api/account/profile-another/${accId}`
          );
          if (response.status === 200) {
            const data = response.data.data;
            setFullName(data.fullName || "Unknown");
            setAvatar(data.avatar);
            setBackground(data.background || defaultBackground);

            const basicInfoMapping = {
              gender: data.gender || "Updating",
              location: data.address || "Updating",
              study: data.studyAt || "Updating",
              work: data.workAt || "Updating",
            };
            setBasicInfo(basicInfoMapping);
          }
        }
      } catch (error) {
        console.error("Lỗi lấy profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchProfile();
    }
  }, [accId, isOwner, accessToken]);

  // Sync background từ UserContext khi thay đổi (chỉ cho owner)
  useEffect(() => {
    if (isOwner && user?.background) {
      setBackground(user.background);
    }
  }, [user?.background, isOwner]);

  // Sync avatar từ UserContext khi thay đổi (chỉ cho owner)
  useEffect(() => {
    if (isOwner && user?.avatar) {
      setAvatar(user.avatar);
    }
  }, [user?.avatar, isOwner]);

  // Sync fullName từ UserContext khi thay đổi (chỉ cho owner)
  useEffect(() => {
    if (isOwner && user?.fullName) {
      setFullName(user.fullName);
    }
  }, [user?.fullName, isOwner]);

  // Gọi api lấy list post trong trang cá nhân
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (isOwner) {
          response = await instance.get("/api/post/self-view", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        } else {
          response = await instance.get(`/api/post/another-view/${accId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        }
        if (response.status === 200) {
          setPosts(response.data.data);
        }
      } catch (error) {
        // toast.error("Cannot load list post!");
      }
    };

    if (accessToken) {
      fetchPosts();
    }
  }, [isOwner, accId, accessToken]);

  // Các method liên quan khác
  const handleCommentCountChange = (postId, newCount) => {
    setPosts((prevPosts) =>
      prevPosts.map((postMapper) =>
        postMapper.post && postMapper.post.postId === postId
          ? { ...postMapper, post: { ...postMapper.post, comments: newCount } }
          : postMapper
      )
    );
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post.postId !== postId)
    );
  };

  const handleRestorePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post.postId !== postId)
    );
  };

  const handleHardDeletePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post.postId !== postId)
    );
  };

  const handlePostCreate = (newPostData) => {
    if (
      newPostData.post.postScope === "Public" ||
      newPostData.post.postScope === "Private"
    ) {
      setPosts((prevPosts) => [newPostData, ...prevPosts]);
    }
  };
  // Get list friend
  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const url = isOwner
        ? `https://localhost:7280/api/friend/list-friend`
        : `https://localhost:7280/api/friend/list-friend-other/${accId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (json.data && json.data.length > 0) {
        setListFriends(json.data);
      } else {
        setListFriends([]);
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
      setListFriends([]);
    }
  };

  const fetchlistCheckRelationShip = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://localhost:7280/api/friend/check-is-friend?receiverId=${accId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      console.log("API response (check-is-friend):", json);
      if (json.status) {
        setFriendshipStatus(json.status);
        console.log("Friendship status:", json.status);
      } else {
        setFriendshipStatus(null);
      }
    } catch (err) {
      console.error("Error checking friendship status:", err.message || err);
      setFriendshipStatus(null);
    }
  };

  // Combined effect to fetch both friends and relationship data
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && !isOwner) {
        await Promise.all([fetchFriends(), fetchlistCheckRelationShip()]);
      } else if (accessToken && isOwner) {
        await fetchFriends();
      }
    };
    fetchData();
  }, [accId, isOwner, accessToken]);

  // Hàm xử lý bắt đầu chat
  const handleStartChat = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      // Kiểm tra xem đã có cuộc trò chuyện chưa
      const response = await instance.get("/api/chat/get-by-user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let chatId = null;
      if (response.data.success && response.data.chats) {
        const existingChat = response.data.chats.find(
          (chat) => chat.receiver && chat.receiver.accId === accId
        );
        if (existingChat) {
          chatId = existingChat.chatId;
        }
      }

      // Nếu chưa có cuộc trò chuyện, gọi API tạo mới
      if (!chatId) {
        const startChatResponse = await instance.post(
          `/api/chat/start-chat/${accId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (startChatResponse.data.success) {
          chatId = startChatResponse.data.data.chatId;
        } else {
          throw new Error("Failed to start chat.");
        }
      }

      // Điều hướng đến trang Chats với chatId
      navigate(`/Chats`, { state: { chatId, receiverId: accId } });
    } catch (error) {
      console.error("Error starting chat:", error);
      toast.error("Cannot start chat. Please try again.");
    }
  };

  const isFriend = friendshipStatus === "Friend";
  const matchedAccount = useMemo(() => {
    if (isOwner || !friendshipStatus) {
      return null;
    }
    return {
      accId: accId,
      friendStatus: friendshipStatus,
      roleId: roleId,
    };
  }, [isOwner, friendshipStatus, accId]);

  const renderActionButton = () => {
    if (isOwner) return null;
    console.log("Rendering action button - friendshipStatus:", friendshipStatus, "isFriend:", isFriend);
    if (isFriend) {
      return (
        <button
          onClick={handleStartChat}
          className="p-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-md w-32 transition flex items-center justify-center"
        >
          <i className="fa-solid fa-comment mr-2"></i>
          Start Chat
        </button>
      );
    }

    return (
      <FriendActionButton
        status={friendshipStatus}
        roleId={roleId}
        accId={accId}
      />
    )
  };
  console.log("accId:", accId);
  console.log("isOwner:", isOwner);
  console.log("friendshipStatus:", friendshipStatus);
  console.log("isFriend:", isFriend);
  console.log("listFriends:", listFriends);

//   const matchedAccount =
//     !isOwner &&
//     Array.isArray(listCheckRelationShip) &&
//     listCheckRelationShip.find((a) => a.accId === accId);
  //get list photo
  const fetchPhotos = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const url = isOwner
        ? `https://localhost:7280/api/post/images`
        : `https://localhost:7280/api/post/images/${accId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (json.data && json.count > 0) {
        setPhotos(json.data);
      } else {
        setPhotos([]);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setPhotos([]);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchPhotos();
    }
  }, [accId, isOwner, accessToken]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavbarHeader />
      <div className="flex-grow">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            <CoverBackground backgroundImage={background} isOwner={isOwner} />
            {!isOwner && (
              <div className="absolute right-4 bottom-4">
                {renderActionButton()}
              </div>
            )}
            <ProfileAvatar
              initialProfileImage={avatar}
              fullName={fullName}
              isOwner={isOwner}
            />
          </div>
          <div className="flex flex-col gap-5 pt-20 lg:flex-row">
            <aside className="flex flex-col w-full gap-5 lg:w-1/3">
              <BasicInfo info={basicInfo} isOwner={isOwner} />
              <FriendList
                friends={listFriends}
                isOwner={isOwner}
                isProfile={true}
                accId={accId}
              />
              <PhotoGallery photos={photos} isOwner={isOwner} accId={accId}/>
            </aside>
            <section className="flex flex-col w-full h-full gap-5 lg:w-2/3">
              {isOwner && (
                <PostCreate
                  profileImage={avatar}
                  onPostCreate={handlePostCreate}
                />
              )}

              <PostFilters />
              {!posts || posts.length <= 0 ? (
                <p className="font-normal text-gray-300 text-lg">
                  You have no posts in the trash!
                </p>
              ) : (
                posts.map((postMapper, index) => (
                  <PostCard
                    isDeleted={postMapper.post.isDeleted || false}
                    onRestore={handleRestorePost}
                    onHardDelete={handleHardDeletePost}
                    onDeletePost={handleDeletePost}
                    key={`${postMapper.post.postId}-${index}`}
                    post={{
                      accId: postMapper.ownerPost.accId,
                      postId: postMapper.post.postId,
                      fullName: postMapper.ownerPost
                        ? postMapper.ownerPost.fullName || postMapper.post.accId
                        : "Unknown User",
                      avatar:
                        isOwner && user?.avatar
                          ? user.avatar
                          : postMapper.ownerPost?.avatar,
                      createAt: postMapper.post.createdAt,
                      content: postMapper.post.postContent,
                      images: postMapper.postImages
                        ? postMapper.postImages.map((img) => img.imageUrl)
                        : [],
                      hashtags: postMapper.hashTags
                        ? postMapper.hashTags.map((tag) => tag.hashTagContent)
                        : [],
                      tagFriends: postMapper.postTags
                        ? postMapper.postTags.map((tag) => ({
                            accId: tag.accId,
                            fullname: tag.fullname || "Unknown",
                          }))
                        : [],
                      categories: postMapper.postCategories
                        ? postMapper.postCategories.map(
                            (cat) => cat.categoryName
                          )
                        : [],
                      likes: postMapper.reactionCount || 0,
                      comments: postMapper.commentCount || 0,
                      shares: postMapper.shareCount || 0,
                    }}
                    onCommentCountChange={(newCount) =>
                      handleCommentCountChange(postMapper.post.postId, newCount)
                    }
                  />
                ))
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
