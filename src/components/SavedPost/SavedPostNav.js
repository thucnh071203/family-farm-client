import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./savedPostNavstyle.css";
import homeIcon from "../../assets/images/home_icon.svg";
import videoIcon from "../../assets/images/video_icon.svg";
import imageIcon from "../../assets/images/image_icon.svg";

export default function SavedPostNav() {
    return (
        <div class="save-post-page-container w-full lg:w-[289px] max-w-[289px] fixed h-screen hidden lg:block">
            <div class="save-post-page-title pt-8">SAVE POST PAGE</div>
            <div class="save-post-type-container mt-11 ml-8 flex flex-col justify-center gap-4">
                <div class="home-container type-post-text rounded-[10px] flex flex-row items-center gap-4 w-[225px] h-[41px] cursor-pointer">
                    <img class="pl-5" src={homeIcon} alt="" />
                    <p class="type-text">Home</p>
                </div>
                <div class="video-container type-post-text rounded-[10px] flex flex-row items-center gap-4 w-[225px] h-[41px] cursor-pointer">
                    <img class="pl-5" src={videoIcon} alt="" />
                    <p class="type-text">Video</p>
                </div>
                <div class="image-container type-post-text rounded-[10px] flex flex-row items-center gap-4 w-[225px] h-[41px] cursor-pointer">
                    <img class="pl-5" src={imageIcon} alt="" />
                    <p class="type-text">Image</p>
                </div>
            </div>
        </div>
    );
}