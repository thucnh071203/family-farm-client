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
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { HubConnectionBuilder } from "@microsoft/signalr";

const PersonalPage = () => {
  const { user } = useUser();
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("Unknown");
  const [background, setBackground] = useState("");
  const [basicInfo, setBasicInfo] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [posts, setPosts] = useState([]);

  const { accId } = useParams();
  const defaultBackground =
    "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fdefault_background.jpg?alt=media&token=0b68b316-68d0-47b4-9ba5-f64b9dd1ea2c";
  const storeData =
    localStorage.getItem("profileData") ||
    sessionStorage.getItem("profileData");
  const myProfile = storeData ? JSON.parse(storeData) : null;
  const isOwner = !accId || accId === myProfile?.accId;
  const [listFriends, setListFriends] = useState([]);
  const [listCheckRelationShip, setlistCheckRelationShip] = useState([]);
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
            setBackground(
              data.background || data.coverImage || defaultBackground
            );

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

  useEffect(() => {
    if (accessToken) {
      fetchFriends();
    }
  }, [accId, isOwner, accessToken]);

  const fetchlistCheckRelationShip = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `https://localhost:7280/api/friend/list-account-no-relation`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const jsonArray = await res.json();
      console.log("API response (list-account-no-relation):", jsonArray);

      // Gộp tất cả data từ các object có isSuccess === true
      const combinedList = jsonArray
        .filter((item) => item.isSuccess && Array.isArray(item.data))
        .flatMap((item) => item.data); // dùng flatMap để nối tất cả mảng lại

      if (combinedList.length > 0) {
        setlistCheckRelationShip(combinedList);
        console.log("Danh sách không có quan hệ:", combinedList);
      } else {
        setlistCheckRelationShip([]);
      }
    } catch (err) {
      console.error("Error fetching friends:", err.message || err);
      setlistCheckRelationShip([]);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchlistCheckRelationShip();
    }
  }, [accessToken]);

  const matchedAccount =
    !isOwner &&
    Array.isArray(listCheckRelationShip) &&
    listCheckRelationShip.find((a) => a.accId === accId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavbarHeader />
      <div className="flex-grow">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            <CoverBackground backgroundImage={background} isOwner={isOwner} />

            {matchedAccount && (
              <div className="absolute right-4 bottom-4">
                <FriendActionButton
                  status={matchedAccount.friendStatus}
                  roleId={matchedAccount.roleId}
                  accId={matchedAccount.accId}
                />
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
              <BasicInfo info={basicInfo} isOwner={isOwner}/>
              <FriendList
                friends={listFriends}
                isOwner={isOwner}
                isProfile={true}
                accId={accId}
              />
              <PhotoGallery />
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
                      avatar: isOwner && user?.avatar
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
