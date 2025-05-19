import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import CoverBackground from "../../components/Profile/CoverBackground";
import ProfileAvatar from "../../components/Profile/ProfileAvatar";
import FriendActionButton from "../../components/Friend/FriendActionButton";
import UpdateProfileForm from "../../components/Profile/UpdateProfileForm";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
    return (<div>
        <div className="min-h-screen flex flex-col">
            <Header />
            <NavbarHeader />
            <div className="flex-grow">
                <div className="container mx-auto max-w-6xl">
                    <div className="relative">
                        <CoverBackground />
                         <div className="absolute right-4 bottom-4">
                            <FriendActionButton />
                        </div>
                        <ProfileAvatar />
                    </div>
                    <div className="flex-row gap-5 pt-10 text-left">
                        <div className="p-3">
                            <Link to="/PersonalPage">Profile /</Link>
                            <Link className="text-blue-500" to=""> Update </Link>
                        </div>
                        <UpdateProfileForm />
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default UpdateProfile;

