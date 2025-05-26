import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./savedPostNavstyle.css";
import homeIcon from "../../assets/images/home_icon.svg";
import videoIcon from "../../assets/images/video_icon.svg";
import imageIcon from "../../assets/images/image_icon.svg";

export default function SavedPostNav() {
    return (
        <div className="save-post-page-container w-full lg:w-[289px] max-w-[289px] fixed h-screen hidden lg:block">
            <div className="pt-8 save-post-page-title">SAVE POST PAGE</div>
            <div className="flex flex-col justify-center gap-4 ml-8 save-post-type-container mt-11">
                <div className="home-container type-post-text rounded-[10px] flex flex-row items-center gap-4 w-[225px] h-[41px] cursor-pointer">
                    <img className="pl-5" src={homeIcon} alt="" />
                    <p className="type-text">Home</p>
                </div>
                <div className="video-container type-post-text rounded-[10px] flex flex-row items-center gap-4 w-[225px] h-[41px] cursor-pointer">
                    <img className="pl-5" src={videoIcon} alt="" />
                    <p className="type-text">Video</p>
                </div>
                <div className="image-container type-post-text rounded-[10px] flex flex-row items-center gap-4 w-[225px] h-[41px] cursor-pointer">
                    <img className="pl-5" src={imageIcon} alt="" />
                    <p className="type-text">Image</p>
                </div>
            </div>
        </div>
    );
}