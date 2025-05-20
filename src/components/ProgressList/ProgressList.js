import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressNav from "../ProgressNav/ProgressNav";
import Header from "../Header/Header";
import "./progressListstyle.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import avaiProcess from "../../assets/images/fluent_person-available-20-filled.png";
import unpaidOrder from "../../assets/images/material-symbols_warning.png";
import waitingOrder from "../../assets/images/medical-icon_waiting-area.png";
import attentionIcon from "../../assets/images/icon-park-solid_attention.png";
import searchIcon from "../../assets/images/material-symbols_search.png";
import nameFilterIcon from "../../assets/images/hugeicons_arrange-by-letters-az.png";
import workBlue from "../../assets/images/material-symbols_work_blue.png";
import workGreen from "../../assets/images/material-symbols_work_blue.png";
import workRed from "../../assets/images/material-symbols_work_blue.png";
import deatilIcon from "../../assets/images/material-symbols_read-more.png";

export default function ProgressList() {
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
                        <div class="filter-progress-container w-full flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-0">
                            <div class="frame-6 flex flex-row justify-center items-center gap-3 sm:gap-[40px]">
                                <div class="frame-7">
                                    <div class="text-wrapper-9">Completed</div>
                                </div>
                                <div class="frame-8">
                                    <div class="text-wrapper-10">Not completed</div>
                                </div>
                                <div class="frame-9">
                                    <div class="text-wrapper-11">Service</div>
                                    {/* <i class="polygon fa-solid fa-caret-down"></i> */}
                                    <i className="polygon fa-solid fa-caret-down"></i>
                                </div>
                            </div>
                            <div class="frame-10">
                                <img class="img-2" src={searchIcon} />
                                <input type="text" class="text-wrapper-12" placeholder="Search in list progress" />
                            </div>
                        </div>
                        <div class="group-5 w-full sm:w-[77.6%] xl:w-[644px] max-w-[644px] flex flex-row justify-between items-center mt-8">
                            <div class="frame-16">
                                <img class="img" src={nameFilterIcon} />
                                <div class="text-wrapper-16">Name progress</div>
                            </div>
                            <div class="text-wrapper-17 mr-[15%] sm:ml-[21%] xl:ml-[124px]">Owner</div>
                            <div class="text-wrapper-18 hidden sm:block">Status</div>
                        </div>
                        <div class="progress-list-container flex flex-col gap-6 mt-2">
                            <div class="group-2">
                                <div class="overlap-4 px-4">
                                    <div class="frame-12 lg:w-[50%] xl:w-[328px]">
                                        <img class="img" src={workBlue} />
                                        <p class="p lg:w-[87%] xl:w-[288px]">Process of treating brown planthopper and yellow leaf disease in rice plants</p>
                                    </div>
                                    <div class="text-wrapper-14">Tran Phuong Nam</div>
                                    <div class="frame-13 hidden sm:flex flex-row justify-center items-center gap-[10px] w-[21.6%] xl:w-[139px] max-w-[139px]">
                                        <div class="text-wrapper-15">In Progress</div>
                                    </div>
                                    <div class="frame-11 hidden sm:inline-flex items-center justify-center gap-2">
                                        <img class="img" src={deatilIcon} />
                                        <div class="text-wrapper-13">Detail</div>
                                    </div>
                                </div>
                            </div>
                            <div class="group-3">
                                <div class="overlap-4 px-4">
                                    <div class="frame-12 lg:w-[50%] xl:w-[328px]">
                                        <img class="img" src={workGreen} />
                                        <p class="p lg:w-[87%] xl:w-[288px]">Process of treating brown planthopper and yellow leaf disease in rice plants</p>
                                    </div>
                                    <div class="text-wrapper-14">Tran Phuong Nam</div>
                                    <div class="frame-14 hidden sm:flex flex-row justify-center items-center gap-[10px] w-[21.6%] xl:w-[139px] max-w-[139px]">
                                        <div class="text-wrapper-15">Completed</div>
                                    </div>
                                    <div class="frame-11 hidden sm:inline-flex items-center justify-center gap-2">
                                        <img class="img" src={deatilIcon} />
                                        <div class="text-wrapper-13">Detail</div>
                                    </div>
                                </div>
                            </div>
                            <div class="group-4">
                                <div class="overlap-4 px-4">
                                    <div class="frame-12 lg:w-[50%] xl:w-[328px]">
                                        <img class="img" src={workRed} />
                                        <p class="p lg:w-[87%] xl:w-[288px]">Process of treating brown planthopper and yellow leaf disease in rice plants</p>
                                    </div>
                                    <div class="text-wrapper-14">Tran Phuong Nam</div>
                                    <div class="frame-15 hidden sm:flex flex-row justify-center items-center gap-[10px] w-[21.6%] xl:w-[139px] max-w-[139px]">
                                        <div class="text-wrapper-15">Not Rated</div>
                                    </div>
                                    <div class="frame-11 hidden sm:inline-flex items-center justify-center gap-2">
                                        <img class="img" src={deatilIcon} />
                                        <div class="text-wrapper-13">Detail</div>
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