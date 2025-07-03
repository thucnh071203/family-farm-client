import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProcessNav from "../ProcessNav/ProcessNav";
import "./waitingListstyle.css";
import avaiProcess from "../../assets/images/fluent_person-available-20-filled.png";
import unpaidOrder from "../../assets/images/material-symbols_warning.png";
import waitingOrder from "../../assets/images/medical-icon_waiting-area.png";
import attentionIcon from "../../assets/images/icon-park-solid_attention.png";
import searchIcon from "../../assets/images/material-symbols_search.png";
import nameFilterIcon from "../../assets/images/hugeicons_arrange-by-letters-az.png";
import workGray from "../../assets/images/material-symbols_work_gray.png";
import deatilIcon from "../../assets/images/material-symbols_read-more.png";
import ProgressMenu from "../ProcessList/ProgressMenu";

export default function WaitingList() {
    return (
        <div className="pt-16 progress-management">
            <div className="px-2 div">
                <ProcessNav inPage="Process"/>
                <div className="flex flex-col w-full gap-6 mt-6 progress-container lg:mt-14 lg:flex-row lg:justify-center">
                    <div className="progress-left w-full lg:w-[32%] xl:w-[344px] lg:max-w-[344px]">
                        <ProgressMenu inPage="Waiting"/>
                    </div>
                    
                    <div className="progress-right w-full lg:w-[66.5%] xl:w-[830px] lg:max-w-[830px]">
                        <div className="flex flex-col w-full gap-5 header-waiting-container lg:flex-row lg:justify-between lg:gap-0">
                            <div className="frame-6 flex flex-row justify-center items-center gap-3 sm:gap-[40px]">
                                <div className="text-wrapper-title">List of booking waiting</div>
                            </div>
                            <div className="frame-10">
                                <img className="img-2" src={searchIcon} />
                                <input type="text" className="text-wrapper-12" placeholder="Search in list progress" />
                            </div>
                        </div>
                        <div className="group-5 w-full sm:w-[85%] md:w-[80%] xl:w-[644px] xl:max-w-[644px] flex flex-row justify-between items-center mt-8">
                            <div className="frame-16">
                                <img className="img" src={nameFilterIcon} />
                                <div className="text-wrapper-16">Name progress</div>
                            </div>
                            <div className="text-wrapper-17 mr-[12%] sm:mr-0 sm:ml-[21%] xl:ml-[162px]">Owner</div>
                            <div className="hidden text-wrapper-18 sm:block">Date booking</div>
                        </div>
                        <div className="flex flex-col gap-6 mt-2 waiting-list-container">
                            <div className="group-2">
                                <div className="px-4 overlap-4">
                                    <div className="frame-12 md:w-[40%] lg:w-[50%] xl:w-[328px]">
                                        <img className="img" src={workGray} />
                                        <p className="p lg:w-[87%] xl:w-[288px]">Process of treating brown planthopper and yellow leaf disease in rice plants</p>
                                    </div>
                                    <div className="text-wrapper-14">Tran Phuong Nam</div>
                                    <div className="date-create hidden sm:flex flex-row justify-center items-center gap-[10px] w-[21.6%] xl:w-[139px] max-w-[139px]">
                                        <p className="p-date">April 4, 2025</p>
                                    </div>
                                    <div className="items-center justify-center hidden gap-2 frame-11 sm:inline-flex">
                                        <img className="img" src={deatilIcon} />
                                        <div className="text-wrapper-13">Create</div>
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