import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProcessNav from "../ProcessNav/ProcessNav";
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

export default function ProcessList() {
    return (
        <div className="pt-16 progress-management">
            <div className="px-2 mx-auto div max-w-7xl">
                <ProcessNav />
                <div className="flex flex-col w-full gap-6 mt-6 progress-container lg:mt-14 lg:flex-row lg:justify-center">
                    <div className="progress-left w-full lg:w-[32%] xl:w-[344px] lg:max-w-[344px]">
                        <div className="w-full overlap-wrapper">
                            <div className="flex flex-col w-full overlap-3">
                                <div className="text-wrapper-7 mt-[16px] ml-[16px]">Menu</div>
                                <div className="status-progress-container mt-[13px] flex flex-col justify-center items-center gap-6">
                                    <div className="frame-3 w-[91.3%]">
                                        <img className="img-2" src={avaiProcess} />
                                        <div className="text-wrapper-8">List of available processes</div>
                                    </div>
                                    <div className="frame-4 w-[91.3%]">
                                        <img className="img-2" src={unpaidOrder} />
                                        <div className="text-wrapper-8">List of unpaid orders</div>
                                    </div>
                                    <div className="frame-5 w-[91.3%]">
                                        <img className="img-2" src={waitingOrder} />
                                        <div className="text-wrapper-8">List of orders waiting</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 attention-container">
                            <div className="flex flex-row items-center gap-2 frame-18">
                                <div className="img"><img className="mask-group" src={attentionIcon} /></div>
                                <div className="text-wrapper-16">ATTENTION</div>
                            </div>
                            <div className="flex flex-row flex-wrap items-center justify-center gap-1 mt-4 frame-17">
                                <div className="text-wrapper-19">You have</div>
                                <div className="text-wrapper-20">3 progress</div>
                                <div className="text-wrapper-19">need confirmation of completion</div>
                            </div>
                        </div>
                    </div>
                    <div className="progress-right w-full lg:w-[66.5%] xl:w-[830px] lg:max-w-[830px]">
                        <div className="flex flex-col w-full gap-5 filter-progress-container lg:flex-row lg:justify-between lg:gap-0">
                            <div className="frame-6 flex flex-row justify-center items-center gap-3 sm:gap-[40px]">
                                <div className="frame-7">
                                    <div className="text-wrapper-9">Completed</div>
                                </div>
                                <div className="frame-8">
                                    <div className="text-wrapper-10">Not completed</div>
                                </div>
                                <div className="frame-9">
                                    <div className="text-wrapper-11">Service</div>
                                    {/* <i className="polygon fa-solid fa-caret-down"></i> */}
                                    <i className="polygon fa-solid fa-caret-down"></i>
                                </div>
                            </div>
                            <div className="frame-10">
                                <img className="img-2" src={searchIcon} />
                                <input type="text" className="text-wrapper-12" placeholder="Search in list progress" />
                            </div>
                        </div>
                        <div className="group-5 w-full sm:w-[85%] md:w-[78%] xl:w-[644px] xl:max-w-[644px] flex flex-row justify-between items-center mt-8">
                            <div className="frame-16">
                                <img className="img" src={nameFilterIcon} />
                                <div className="text-wrapper-16">Name progress</div>
                            </div>
                            <div className="text-wrapper-17 mr-[12%] sm:mr-0 sm:ml-[8%] lg:ml-[7%] xl:ml-[34px]">Owner</div>
                            <div className="hidden text-wrapper-18 lg:ml-0 sm:block">Status</div>
                        </div>
                        <div className="flex flex-col gap-6 mt-2 progress-list-container">
                            <div className="group-2">
                                <div className="px-4 overlap-4">
                                    <div className="frame-12 md:w-[40%] lg:w-[50%] xl:w-[328px]">
                                        <img className="img" src={workBlue} />
                                        <p className="p lg:w-[87%] xl:w-[288px]">Process of treating brown planthopper and yellow leaf disease in rice plants</p>
                                    </div>
                                    <div className="text-wrapper-14">Tran Phuong Nam</div>
                                    <div className="frame-13 hidden sm:flex flex-row justify-center items-center gap-[10px] w-[21.6%] xl:w-[139px] max-w-[139px]">
                                        <div className="text-wrapper-15">In Progress</div>
                                    </div>
                                    <div className="items-center justify-center hidden gap-2 frame-11 sm:inline-flex">
                                        <img className="img" src={deatilIcon} />
                                        <div className="text-wrapper-13">Detail</div>
                                    </div>
                                </div>
                            </div>
                            <div className="group-3">
                                <div className="px-4 overlap-4">
                                    <div className="frame-12 md:w-[40%] lg:w-[50%] xl:w-[328px]">
                                        <img className="img" src={workGreen} />
                                        <p className="p lg:w-[87%] xl:w-[288px]">Process of treating brown planthopper and yellow leaf disease in rice plants</p>
                                    </div>
                                    <div className="text-wrapper-14">Tran Phuong Nam</div>
                                    <div className="frame-14 hidden sm:flex flex-row justify-center items-center gap-[10px] w-[21.6%] xl:w-[139px] max-w-[139px]">
                                        <div className="text-wrapper-15">Completed</div>
                                    </div>
                                    <div className="items-center justify-center hidden gap-2 frame-11 sm:inline-flex">
                                        <img className="img" src={deatilIcon} />
                                        <div className="text-wrapper-13">Detail</div>
                                    </div>
                                </div>
                            </div>
                            <div className="group-4">
                                <div className="px-4 overlap-4">
                                    <div className="frame-12 md:w-[40%] lg:w-[50%] xl:w-[328px]">
                                        <img className="img" src={workRed} />
                                        <p className="p lg:w-[87%] xl:w-[288px]">Process of treating brown planthopper and yellow leaf disease in rice plants</p>
                                    </div>
                                    <div className="text-wrapper-14">Tran Phuong Nam</div>
                                    <div className="frame-15 hidden sm:flex flex-row justify-center items-center gap-[10px] w-[21.6%] xl:w-[139px] max-w-[139px]">
                                        <div className="text-wrapper-15">Not Rated</div>
                                    </div>
                                    <div className="items-center justify-center hidden gap-2 frame-11 sm:inline-flex">
                                        <img className="img" src={deatilIcon} />
                                        <div className="text-wrapper-13">Detail</div>
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