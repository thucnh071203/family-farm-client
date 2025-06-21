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

const PersonalPage = () => {
    const { user } = useUser();
    const [avatar, setAvatar] = useState("");
    const [fullName, setFullName] = useState(user?.fullName || "Unknown");
    const [background, setBackground] = useState("");
    const [basicInfo, setBasicInfo] = useState({});
    const [accessToken, setAccessToken] = useState("");
    const [posts, setPosts] = useState([]);

    const { accId } = useParams();
    const defaultBackground = "...";
    const storeData = localStorage.getItem("profileData") || sessionStorage.getItem("profileData");
    const myProfile = storeData ? JSON.parse(storeData) : null;
    const isOwner = !accId || accId === myProfile?.accId;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let response;
                if (isOwner) {
                    response = await instance.get("/api/account/own-profile", {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
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

                        const storage = localStorage.getItem("accessToken") ? localStorage : sessionStorage;
                        storage.setItem("profileData", JSON.stringify(data));
                        storage.setItem("avatarUrl", data.avatar);
                        storage.setItem("fullName", data.fullName);
                    }
                } else {
                    response = await instance.get(`/api/account/profile-another/${accId}`);
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
            }
        };

        fetchProfile();
    }, [accId, isOwner, accessToken]);

    //lấy thông tin người dùng từ storage
    useEffect(() => {
        const storedAccId = localStorage.getItem("accId") || sessionStorage.getItem("accId");
        const storedAccesstoken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

        if (storedAccId) {
            setAccessToken(storedAccesstoken);
        }
    }, []);

    //Goi api lay list post trong trang can nhan
    // const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let response;
                if (isOwner) {
                    response = await instance.get("/api/post/self-view", {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });
                } else {
                    response = await instance.get(`/api/post/another-view/${accId}`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });
                }
                if (response.status === 200) {
                    setPosts(response.data.data);
                }
            } catch (error) {
                toast.error("Cannot load list post!");
            }
        };
        fetchPosts();
    }, [isOwner, accId, accessToken, user?.avatar]);

    //CAC METHOD LIEN QUAN KHAC
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

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavbarHeader />
            <div className="flex-grow">
                <div className="container mx-auto max-w-7xl">
                    <div className="relative">
                        <CoverBackground coverImage={background} />

                        {!isOwner && (
                            <div className="absolute right-4 bottom-4">
                                <FriendActionButton />
                            </div>
                        )}

                        <ProfileAvatar initialProfileImage={avatar} fullName={fullName || user?.fullName} />
                    </div>
                    <div className="flex flex-col gap-5 pt-20 lg:flex-row">
                        <aside className="flex flex-col w-full gap-5 lg:w-1/3">
                            <BasicInfo info={basicInfo} />
                            <FriendList />
                            <PhotoGallery />
                        </aside>
                        <section className="flex flex-col w-full h-full gap-5 lg:w-2/3">
                            {isOwner && (
                                <PostCreate />
                            )}

                            <PostFilters />

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
                                            avatar: postMapper.ownerPost ? postMapper.ownerPost.avatar || "https://via.placeholder.com/40" : "https://via.placeholder.com/40",
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

export default PersonalPage;