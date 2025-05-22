import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./notificationstyle.css";
import cancelIcon from "../../assets/images/cancel_vector.png";
import headLine from "../../assets/images/head_line.png";
import userAvatar from "../../assets/images/noti_avatar.png";
import readIcon from "../../assets/images/letter_vector.png";
import lineShape from "../../assets/images/border_line.png";

export default function NotificationList() {
    return (
        <div class="popup-notifi mx-auto w-[90%] sm:w-[340px] max-w-[340px]">
            <div class="popup-container w-full bg-slate-200">
                <div class="popup-header w-full sm:w-[308px] flex justify-between items-center mx-auto px-4 sm:px-0">
                    <div class="popup-title">Notifications</div>
                    <div class="cancel-notifi" onClick={() => window.dispatchEvent(new Event("closeNotification"))}><img class="vector" src={cancelIcon} /></div>
                </div>
                <img class="header-noti-line w-full mt-3" src={headLine} />
                <div class="read-status-container flex flex-row gap-2 mt-3 ml-4 px-4 sm:px-0">
                    <div class="all-noti">All</div>
                    <div class="not-read-noti">Not read yet</div>
                </div>
                <div class="noti-list-container w-full md:w-[308px] mx-auto mt-[16.3px] px-4 sm:px-0 flex flex-col justify-center items-center gap-3">
                    <div class="noti-item-container w-full flex flex-col items-start gap-3">
                        <div class="noti-item">
                            <div class="noti-content">
                                <img class="noti-avatar" src={userAvatar} />
                                <div class="noti-info">
                                    <p class="p-noti text-start"><span class="username-span">Alis Wells </span> <span class="noti-action">has
                                        posted.</span></p>
                                    <div class="action-time">3 minutes ago</div>
                                </div>
                            </div>
                            <img class="noti-status" src={readIcon} />
                        </div>
                        <img class="noti-item-line" src={lineShape} />
                    </div>
                    <div class="noti-item-container w-full flex flex-col items-start gap-3">
                        <div class="noti-item">
                            <div class="noti-content">
                                <img class="noti-avatar" src={userAvatar} />
                                <div class="noti-info">
                                    <p class="p-noti"><span class="username-span">Alis Wells </span> <span class="noti-action">has
                                        posted.</span></p>
                                    <div class="action-time">3 minutes ago</div>
                                </div>
                            </div>
                            <img class="noti-status" src={readIcon} />
                        </div>
                        <img class="noti-item-line" src={lineShape} />
                    </div>
                    <div class="noti-item-container w-full flex flex-col items-start gap-3">
                        <div class="noti-item">
                            <div class="noti-content">
                                <img class="noti-avatar" src={userAvatar} />
                                <div class="noti-info">
                                    <p class="p-noti"><span class="username-span">Alis Wells </span> <span class="noti-action">has
                                        posted.</span></p>
                                    <div class="action-time">3 minutes ago</div>
                                </div>
                            </div>
                            <img class="noti-status" src={readIcon} />
                        </div>
                        <img class="noti-item-line" src={lineShape} />
                    </div>
                    <div class="noti-item-container w-full flex flex-col items-start gap-3">
                        <div class="noti-item">
                            <div class="noti-content">
                                <img class="noti-avatar" src={userAvatar} />
                                <div class="noti-info">
                                    <p class="p-noti">
                                        <span class="username-span">David Kim </span> <span class="noti-action">commented on your
                                            posted.</span>
                                    </p>
                                    <div class="action-time">Yesterday</div>
                                </div>
                            </div>
                            <img class="noti-status" src={readIcon} />
                        </div>
                        <img class="noti-item-line" src={lineShape} />
                    </div>
                    <div class="noti-item-container w-full flex flex-col items-start gap-3">
                        <div class="noti-item">
                            <div class="noti-content">
                                <img class="noti-avatar" src={userAvatar} />
                                <div class="noti-info">
                                    <p class="p-noti">
                                        <span class="username-span">David Kim </span> <span class="noti-action">commented on your
                                            posted.</span>
                                    </p>
                                    <div class="action-time">Yesterday</div>
                                </div>
                            </div>
                            <img class="noti-status" src={readIcon} />
                        </div>
                        <img class="noti-item-line" src={lineShape} />
                    </div>
                    <div class="noti-item-container w-full flex flex-col items-start gap-3">
                        <div class="noti-item">
                            <div class="noti-content">
                                <img class="noti-avatar" src={userAvatar} />
                                <div class="noti-info">
                                    <p class="p-noti">
                                        <span class="username-span">Elise Walker </span> <span class="noti-action">shared a
                                            post.</span>
                                    </p>
                                    <div class="action-time">2 days ago</div>
                                </div>
                            </div>
                            <img class="noti-status-not" src={readIcon} />
                        </div>
                        <img class="noti-item-line" src={lineShape} />
                    </div>
                    <div class="noti-item-container w-full flex flex-col items-start gap-3">
                        <div class="noti-item">
                            <div class="noti-content">
                                <img class="noti-avatar" src={userAvatar} />
                                <div class="noti-info">
                                    <p class="p-noti">
                                        <span class="username-span">David Kim </span> <span class="noti-action">commented on your
                                            posted.</span>
                                    </p>
                                    <div class="action-time">Yesterday</div>
                                </div>
                            </div>
                            <img class="noti-status-not" src={readIcon} />
                        </div>
                        <img class="noti-item-line" src={lineShape} />
                    </div>
                </div>
                <div class="view-all-wrapper w-full">
                    <div class="view-all">VIEW ALL</div>
                </div>
            </div>
        </div>
    );
}