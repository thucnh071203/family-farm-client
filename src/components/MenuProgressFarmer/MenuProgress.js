import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./menuprogressstyle.css";
import bookingIcon from "../../assets/images/booking-icon.svg";
import progressIcon from "../../assets/images/your-progress.svg";

export default function MenuProgress() {
    return (
        <div class="menu-progress-section hidden lg:block h-[164px] w-full xl:w-[344px] max-w-[344px]">
            <div class="menu-progress-container w-full">
                <div class="menu-title text-start">Menu</div>
                <div class="menu-booking-content mt-[13px] cursor-pointer">
                    <img class="menu-booking-icon" src={bookingIcon} />
                    <div class="text-menu-booking">Your service bookings</div>
                </div>
                <div class="menu-your-progress-content mt-6 cursor-pointer">
                    <img class="your-progress-icon h-4 w-4" src={progressIcon} />
                    <div class="text-menu-booking">Your progress</div>
                </div>
            </div>
        </div>
    );
}