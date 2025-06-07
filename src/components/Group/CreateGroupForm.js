import React, { useState } from "react";
import "./createGroupStyle.css";
import adminAvt from "../../assets/images/Ellipse 50.png";
import memberAvt from "../../assets/images/Ellipse 52.png";

export default function CreateGroupForm() {
    const [bgImage, setBgImage] = useState(null);
    const [avatarImage, setAvatarImage] = useState(null);

    const handleBgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBgImage(URL.createObjectURL(file));
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="group-page-right w-full h-full flex flex-col pt-12 lg:mt-[120px] md:ml-[30%] mt-[63px] pr-4 pl-[8%] lg:pl-0">
            <div className="create-group-container w-full max-w-[832px] h-screen">
                <div className="create-h1-label">
                    <div className="create-group-h1">Create new group</div>
                </div>
                <div className="user-admin-container mt-5 flex md:flex-row items-center gap-4">
                    <div className="avatar-admin rounded-full w-[60px] h-[60px]">
                        <img src={adminAvt} alt=""/>
                    </div>
                    <div className="admin-info flex flex-col gap-2">
                        <div className="admin-name">Phuong Nam</div>
                        <div className="admin-role bg-[#3DB3FB] px-[14px] py-[7px] bg-opacity-25 w-fit">Admin</div>
                    </div>
                </div>

                <div className="image-upload-container mt-7 relative flex flex-col gap-4">
                    {/* Background upload */}
                    <div className="relative img-bg-container">
                        <input
                            className="hidden"
                            type="file"
                            id="background-group-img"
                            accept="image/*"
                            onChange={handleBgChange}
                        />
                        <label
                            htmlFor="background-group-img"
                            className="flex items-center justify-center gap-4 w-full h-[296px] rounded-[10px] bg-[#f5f5f5] border-[2px] border-solid border-[rgba(62,63,94,0.25)] cursor-pointer"
                        >
                            <i className="fa-solid fa-upload text-[var(--variable-collection-black)]"></i>
                            <p className="upload-bg-img-text">Upload Background</p>
                        </label>
                        {bgImage && (
                            <img
                                src={bgImage}
                                alt="bg"
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px] border-[2px] border-solid border-[rgba(62,63,94,0.25)] z-0 pointer-events-none"
                            />
                        )}
                    </div>

                    {/* Avatar upload */}
                    <div className="absolute top-[50%] left-[5%] img-avt-container">
                        <input
                            className="hidden"
                            type="file"
                            id="avatar-group-img"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                        <label
                            htmlFor="avatar-group-img"
                            className="flex items-center justify-center gap-2 rounded-full w-[130px] h-[130px] bg-[#ffffff] border-[3px] border-solid border-[rgba(62,63,94,0.25)] cursor-pointer"
                        >
                            <i className="upload-avt-icon fa-solid fa-upload text-[var(--variable-collection-black)]"></i>
                            <p className="upload-avt-img-text">Upload Avatar</p>
                        </label>
                        {avatarImage && (
                            <img
                                src={avatarImage}
                                alt="avatar"
                                className="absolute top-0 left-0 w-[130px] h-[130px] object-cover rounded-full border-[3px] border-solid border-[rgba(62,63,94,0.25)] z-10 pointer-events-none"
                            />
                        )}
                    </div>
                </div>

                <div className="group-name-container w-fit mt-4">
                    <input
                        className="group-name-text px-[46px] py-[15px] bg-[#3DB3FB] bg-opacity-25 rounded-sm text-black text-[24px] font-light placeholder:font-light placeholder:text-[24px] placeholder:text-[rgba(62,63,94,0.25)] font-roboto border-none focus:outline-none focus:ring-0 focus:border-none"
                        type="text"
                        placeholder="Type your group name"/>
                </div>

                <div className="type-privacy-container flex flex-row gap-6 mt-[54px]">
                    <div className="title-privacy h-10 flex flex-row items-center gap-2">
                        <div className="icon-privacy">
                            <i className="fa-solid fa-shield-halved text-[24px] text-[var(--variable-collection-black)] text-opacity-50"></i>
                        </div>
                        <div className="privacy-text">Select privacy</div>
                    </div>
                    <div className="select-privacy h-10">
                        <select className="w-[190px] p-2 bg-[#3DB3FB] bg-opacity-25 text-[#3DB3FB] focus:outline-none focus:ring-0 focus:border-none cursor-pointer font-roboto" name="" id="">
                            <option value="public">Public</option>
                            <option value="public">Private</option>
                        </select>
                    </div>
                </div>

                <div className="group-member-container flex flex-col lg:flex-row gap-6 mt-[94px]">
                    <div className="title-member h-10 flex flex-row items-center gap-2">
                        <div className="icon-member">
                            <i className="fa-solid fa-user-group text-[24px] text-[var(--variable-collection-black)] text-opacity-50"></i>
                        </div>
                        <div className="member-text">Invite friends</div>
                    </div>
                    <div className="search-container h-10 relative w-[190px] flex flex-row items-center gap-4 p-2">
                        <i className="fa-solid fa-magnifying-glass relative text-[#3db3fb]"></i>
                        <input className="input-friend w-fit relative text-black placeholder:text-[#3db3fb] focus:outline-none focus:ring-0 focus:border-none" type="text" placeholder="Search friend..."/>
                    </div>
                    <div className="member-list-container md:w-[345px] flex flex-col gap-6">
                        <div className="member-card flex flex-row items-center justify-between p-2 bg-[#3db3fb] bg-opacity-25">
                            <div className="member-info flex flex-row items-center gap-2">
                                <div className="member-avatar rounded-full">
                                    <img src={memberAvt} alt=""/>
                                </div>
                                <div className="member-name w-fit">Dang Khoa</div>
                            </div>
                            <i className="fa-solid fa-xmark text-[#3db3fb] cursor-pointer"></i>
                        </div>
                        <div className="member-card flex flex-row items-center justify-between p-2 bg-[#3db3fb] bg-opacity-25">
                            <div className="member-info flex flex-row items-center gap-2">
                                <div className="member-avatar rounded-full">
                                    <img src={memberAvt} alt=""/>
                                </div>
                                <div className="member-name w-fit">Dang Khoa</div>
                            </div>
                            <i className="fa-solid fa-xmark text-[#3db3fb] cursor-pointer"></i>
                        </div>
                    </div>
                </div>

                <div className="create-button lg:w-[220px] mt-14 p-[10px] flex items-center justify-center gap-[10px] bg-[#3db3fb] rounded-sm hover:bg-[#50ace6] cursor-pointer">
                    <div className="create-btn-text w-fit text-white">Create</div>
                </div>
            </div>
        </div>
    );
}