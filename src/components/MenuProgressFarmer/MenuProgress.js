import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./menuprogressstyle.css";
import bookingIcon from "../../assets/images/booking-icon.svg";
import progressIcon from "../../assets/images/your-progress.svg";

export default function MenuProgress({ inPage }) {
    return (
        <div class="menu-progress-section hidden lg:block h-[164px] w-full xl:w-[344px] max-w-[344px]">
            <div class="menu-progress-container w-full">
                <div class="menu-title text-start">Menu</div>

                {inPage === "booking" && (
                    <>
                        <Link to="/HomeProcessFarmer" class="menu-booking-content mt-[13px] cursor-pointer inPageBackground">
                            <img class="menu-booking-icon" alt="" src={bookingIcon} />
                            <div class="text-menu-booking">Your service bookings</div>
                        </Link>
                        <Link to="/ProgressListFarmer" class="menu-your-progress-content mt-6 cursor-pointer">
                            <img class="your-progress-icon h-4 w-4" src={progressIcon} alt=""/>
                            <div class="text-menu-booking">Your process</div>
                        </Link>
                    </>
                )}

                {inPage === "process" && (
                    <>
                        <Link to="/HomeProcessFarmer" class="menu-booking-content mt-[13px] cursor-pointer">
                            <img class="menu-booking-icon" alt="" src={bookingIcon} />
                            <div class="text-menu-booking">Your service bookings</div>
                        </Link>
                        <Link to="/ProgressListFarmer" class="menu-your-progress-content mt-6 cursor-pointer inPageBackground">
                            <img class="your-progress-icon h-4 w-4" alt="" src={progressIcon} />
                            <div class="text-menu-booking">Your process</div>
                        </Link>
                    </>
                )}

            </div>
        </div>
    );
}