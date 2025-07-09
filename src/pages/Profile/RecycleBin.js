import Header from "../../components/Header/Header";
import CoverBackground from "../../components/Profile/CoverBackground";
import ProfileAvatar from "../../components/Profile/ProfileAvatar";
import BasicInfo from "../../components/Profile/BasicInfo";
import FriendList from "../../components/Friend/FriendItemsList";
import PhotoGallery from "../../components/Profile/PhotoGallery";
import PostCard from "../../components/Post/PostCard";
import PostFilters from "../../components/Post/PostFilters";
import NavbarHeader from "../../components/Header/NavbarHeader";
import FriendActionButton from "../../components/Friend/FriendActionButton";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../Axios/axiosConfig";


const RecycleBin = () => {
    const [isOwner, setIsOwner] = useState(true);
    const [avatar, setAvatar] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [fullName, setFullName] = useState("Unknown");
    const [background, setBackground] = useState("");
    const [basicInfo, setBasicInfo] = useState({});
// get list friend
    const [listFriends, setListFriends] = useState([]);
    //Biến lấy accId từ param khi xem profile người khác
    const { accId } = useParams();
    const defaultBackground = "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fdefault_background.jpg?alt=media&token=0b68b316-68d0-47b4-9ba5-f64b9dd1ea2c"

    //Lấy token từ session
    useEffect(() => {
        const storedAccId = localStorage.getItem("accId") || sessionStorage.getItem("accId");
        const storedAccesstoken = localStorage.getItem("accessToken");
        if (storedAccId) {
            setAccessToken(storedAccesstoken);
        }
    }, []);

    useEffect(() => {
        //lay thong tin người dùng đang đăng nhập
        const storeData = localStorage.getItem("profileData") || sessionStorage.getItem("profileData");
        const myProfile = storeData ? JSON.parse(storeData) : null;
        const fetchProfile = async () => {
            if (!accId || accId === myProfile.accId) {
                // Trang cá nhân của mình
                setIsOwner(true);

                if (myProfile) {
                    setFullName(myProfile.fullName);
                    setAvatar(myProfile.avatar);
                    setBackground(myProfile.background || defaultBackground);

                    let basicInfoMapping = {
                        gender: myProfile.gender,
                        location: myProfile.address,
                        study: myProfile.studyAt,
                        work: myProfile.workAt
                    };
                    setBasicInfo(basicInfoMapping);
                }

            } else {
                // Trang cá nhân của người khác
                setIsOwner(false);
                try {
                    const response = await instance.get(`/api/account/profile-another/${accId}`);

                    if (response.status === 200) {
                        console.log(response.data.data);
                        // Cập nhật state giống như của mình luôn
                        setFullName(response.data.data.fullName || "Unknown");
                        setAvatar(response.data.data.avatar);
                        setBackground(response.data.data.background || defaultBackground);

                        let basicInfoMapping = {
                            gender: (response.data.data.gender || "Updating"),
                            location: (response.data.data.address || "Updating"),
                            study: (response.data.data.studyAt || "Updating"),
                            work: (response.data.data.workAt || "Updating")
                        };
                        setBasicInfo(basicInfoMapping);
                    }
                } catch (error) {
                    console.error("Lỗi lấy profile người khác:", error);
                }
            }
        };

        fetchProfile(); // gọi function async
    }, [accId]);

    const [posts, setPosts] = useState([]);

    //Gọi api lấy danh sách post đã xóa
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await instance.get("/api/post/account/deleted-post", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                if (response.status === 200) {
                    setPosts(response.data.data)

                }
            } catch (error) {
                console.log("Error request api get: " + error)
            }
        }

        fetchPost()
    }, []);

    const handleCommentCountChange = (postId, newCount) => {
        setPosts((prevPosts) =>
            prevPosts.map((postMapper) =>
                postMapper.post && (postMapper.post.postId) === postId
                    ? { ...postMapper, post: { ...postMapper.post, comments: newCount } }
                    : postMapper
            )
        );
    };

    const handleDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.post.postId !== postId));
    };

    const handleRestorePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.post.postId !== postId));
    }

    const handleHardDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.post.postId !== postId));
    }

    // get list friend
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
        //console.log(isOwner + "aaaaaaaaaaaaaaaaaa");
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


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavbarHeader />
            <div className="flex-grow">
                <div className="container mx-auto max-w-7xl">
                    <div className="relative">
                        <CoverBackground coverImage={background} isOwner={isOwner}/>

                        {!isOwner && (
                            <div className="absolute right-4 bottom-4">
                                <FriendActionButton />
                            </div>
                        )}

                        <ProfileAvatar initialProfileImage={avatar} fullName={fullName} isOwner={isOwner} />
                    </div>
                    <div className="flex flex-col gap-5 pt-20 lg:flex-row">
                        <aside className="flex flex-col w-full gap-5 lg:w-1/3">
                            <BasicInfo info={basicInfo} isOwner={isOwner}/>
                            <FriendList
                            friends={listFriends}
                            isOwner={isOwner}
                            isProfile={true}
                            accId = {accId}
                            />
                            <PhotoGallery />
                        </aside>
                        <section className="flex flex-col w-full h-full gap-5 lg:w-2/3">
                            <h1 style={{ color: "#3E3F5E", fontFamily: "Roboto", fontWeight: "bold", fontSize: "24px" }} className="text-start">RECYCLE BIN</h1>

                            {!posts || posts.length <= 0 ? (
                                <p className="font-normal text-gray-300 text-lg">You have no posts in the trash!</p>
                            ) :
                                posts.map((postMapper, index) => (
                                    <PostCard
                                        isDeleted="true"
                                        onRestore={handleRestorePost}
                                        onHardDelete={handleHardDeletePost}
                                        onDeletePost={handleDeletePost}
                                        key={`${postMapper.post.postId}-${index}`}
                                        post={{
                                            accId: postMapper.ownerPost.accId,
                                            postId: postMapper.post.postId,
                                            fullName: postMapper.ownerPost ? postMapper.ownerPost.fullName || postMapper.post.accId : "Unknown User",
                                            avatar: postMapper.ownerPost ? postMapper.ownerPost.avatar : "https://via.placeholder.com/40",
                                            createAt: postMapper.post.createdAt,
                                            content: postMapper.post.postContent,
                                            images: postMapper.postImages ? postMapper.postImages.map((img) => img.imageUrl) : [],
                                            hashtags: postMapper.hashTags ? postMapper.hashTags.map((tag) => tag.hashTagContent) : [],
                                            tagFriends: postMapper.postTags ? postMapper.postTags.map((tag) => ({
                                                accId: tag.accId,
                                                fullname: tag.fullname || "Unknown"
                                            })) : [],
                                            categories: postMapper.postCategories ? postMapper.postCategories.map((cat) => cat.categoryName) : [],
                                            likes: postMapper.reactionCount || 0,
                                            comments: postMapper.commentCount || 0,
                                            shares: postMapper.shareCount || 0,
                                        }}
                                        onCommentCountChange={(newCount) =>
                                            handleCommentCountChange(postMapper.post.postId, newCount)
                                        }
                                    />
                                ))
                            }

                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecycleBin;