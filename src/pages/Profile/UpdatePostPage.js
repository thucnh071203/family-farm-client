import Header from "../../components/Header/Header";
import CoverBackground from "../../components/Profile/CoverBackground";
import ProfileAvatar from "../../components/Profile/ProfileAvatar";
import BasicInfo from "../../components/Profile/BasicInfo";
import FriendList from "../../components/Friend/FriendItemsList";
import PhotoGallery from "../../components/Profile/PhotoGallery";
import NavbarHeader from "../../components/Header/NavbarHeader";
import FriendActionButton from "../../components/Friend/FriendActionButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import UpdatePostForm from "../../components/Post/UpdatePostForm"

const UpdatePostPage = () => {
    const { postId } = useParams();
    const [isOwner, setIsOwner] = useState(true);
    const [avatar, setAvatar] = useState("");
    const [fullName, setFullName] = useState("Unknown");
    const [background, setBackground] = useState("");
    const [basicInfo, setBasicInfo] = useState({});

    //Biến lấy accId từ param khi xem profile người khác
    const { accId } = useParams();

    const defaultBackground = "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fdefault_background.jpg?alt=media&token=0b68b316-68d0-47b4-9ba5-f64b9dd1ea2c"

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

                        <ProfileAvatar initialProfileImage={avatar} fullName={fullName} />
                    </div>
                    <div className="flex flex-col gap-5 pt-20 lg:flex-row">
                        <aside className="flex flex-col w-full gap-5 lg:w-1/3">
                            <BasicInfo info={basicInfo} />
                            <FriendList />
                            <PhotoGallery />
                        </aside>
                        <section className="flex flex-col w-full h-full gap-5 lg:w-2/3">
                            {/* POST UPDATING HERE  */}
                            <UpdatePostForm postId={postId} avatar={avatar} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePostPage;