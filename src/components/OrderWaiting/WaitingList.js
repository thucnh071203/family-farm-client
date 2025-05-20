import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressNav from "../ProgressNav/ProgressNav";
import "./waitingListstyle.css";
import avaiProcess from "../../assets/images/fluent_person-available-20-filled.png";
import unpaidOrder from "../../assets/images/material-symbols_warning.png";
import waitingOrder from "../../assets/images/medical-icon_waiting-area.png";
import attentionIcon from "../../assets/images/icon-park-solid_attention.png";
import searchIcon from "../../assets/images/material-symbols_search.png";
import nameFilterIcon from "../../assets/images/hugeicons_arrange-by-letters-az.png";
import workGray from "../../assets/images/material-symbols_work_gray.png";
import deatilIcon from "../../assets/images/material-symbols_read-more.png";

export default function WaitingList() {
    return (
        <div class="progress-managament pt-16">
            <div class="div px-2">
                <ProgressNav />
                <div class="progress-container w-full mt-6 lg:mt-14 flex flex-col lg:flex-row lg:justify-center gap-6">
                    <div class="progress-left w-full lg:w-[32%] xl:w-[344px] lg:max-w-[344px]">
                        <div class="overlap-wrapper w-full">
                            <div class="overlap-3 w-full flex flex-col">
                                <div class="text-wrapper-7 mt-[16px] ml-[16px]">Menu</div>
                                <div class="status-progress-container mt-[13px] flex flex-col justify-center items-center gap-6">
                                    <div class="frame-3 w-[91.3%]">
                                        <img class="img-2" src={avaiProcess} />
                                        <div class="text-wrapper-8">List of available processes</div>
                                    </div>
                                    <div class="frame-4 w-[91.3%]">
                                        <img class="img-2" src={unpaidOrder} />
                                        <div class="text-wrapper-8">List of unpaid orders</div>
                                    </div>
                                    <div class="frame-5 w-[91.3%]">
                                        <img class="img-2" src={waitingOrder} />
                                        <div class="text-wrapper-8">List of orders waiting</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="attention-container mt-4">
                            <div class="frame-18 flex flex-row items-center gap-2">
                                <div class="img"><img class="mask-group" src={attentionIcon} /></div>
                                <div class="text-wrapper-16">ATTENTION</div>
                            </div>
                            <div class="frame-17 mt-4 flex flex-wrap flex-row justify-center items-center gap-1">
                                <div class="text-wrapper-19">You have</div>
                                <div class="text-wrapper-20">3 progress</div>
                                <div class="text-wrapper-19">need confirmation of completion</div>
                            </div>
                        </div>
                    </div>
                    <div class="progress-right w-full lg:w-[66.5%] xl:w-[830px] lg:max-w-[830px]">
                        <div class="header-waiting-container w-full flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-0">
                            <div class="frame-6 flex flex-row justify-center items-center gap-3 sm:gap-[40px]">
                                <div class="text-wrapper-title">List of booking waiting</div>
                            </div>
                            <div class="frame-10">
                                <img class="img-2" src={searchIcon} />
                                <input type="text" class="text-wrapper-12" placeholder="Search in list progress" />
                            </div>
                        </div>
                        <div class="group-5 w-full sm:w-[85%] md:w-[80%] xl:w-[644px] xl:max-w-[644px] flex flex-row justify-between items-center mt-8">
                            <div class="frame-16">
                                <img class="img" src={nameFilterIcon} />
                                <div class="text-wrapper-16">Name progress</div>
                            </div>
                            <div class="text-wrapper-17 mr-[12%] sm:mr-0 sm:ml-[21%] xl:ml-[162px]">Owner</div>
                            <div class="text-wrapper-18 hidden sm:block">Date booking</div>
                        </div>
                        <div class="waiting-list-container flex flex-col gap-6 mt-2">
                            <div class="group-2">
                                <div class="overlap-4 px-4">
                                    <div class="frame-12 md:w-[40%] lg:w-[50%] xl:w-[328px]">
                                        <img class="img" src={workGray} />
                                        <p class="p lg:w-[87%] xl:w-[288px]">Process of treating brown planthopper and yellow leaf disease in rice plants</p>
                                    </div>
                                    <div class="text-wrapper-14">Tran Phuong Nam</div>
                                    <div class="date-create hidden sm:flex flex-row justify-center items-center gap-[10px] w-[21.6%] xl:w-[139px] max-w-[139px]">
                                        <p class="p-date">April 4, 2025</p>
                                    </div>
                                    <div class="frame-11 hidden sm:inline-flex items-center justify-center gap-2">
                                        <img class="img" src={deatilIcon} />
                                        <div class="text-wrapper-13">Create</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}