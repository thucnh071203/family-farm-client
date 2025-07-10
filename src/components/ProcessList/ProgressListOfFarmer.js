import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuProgressFarmer from "../MenuProgressFarmer/MenuProgress";
import "./progressListFarmerstyle.css";
import searchIcon from "../../assets/images/material-symbols_search.svg";
import { toast } from "react-toastify";
import instance from "../../Axios/axiosConfig";

export default function ProgressListOfFarmer() {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState("");
    const [subprocesses, setSuprocesses] = useState([])

    //lấy thông tin người dùng từ storage
    useEffect(() => {
        const storedAccId = localStorage.getItem("accId") || sessionStorage.getItem("accId");
        const storedAccesstoken = localStorage.getItem("accessToken");
        if (storedAccId) {
            setAccessToken(storedAccesstoken);
        }
    }, []);

    //GỌI API lấy list subprocess
    useEffect(() => {
        const fetchListProcess = async () => {
            try {
                const response = await instance.get("/api/process/subprocesses/farmer-self-view",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                console.log(response.data);
                if (response.status === 200) {
                    setSuprocesses(response.data.subprocesses);
                }
            } catch (error) {
                toast.error("Cannot get list sub process")
            }
        }
        fetchListProcess();
    }, [accessToken])

    const handleClickViewProcess = (SubprocessData, ProcessStepsData) => {
        navigate(`/ProcessResult/${SubprocessData.subprocessId}`, {
            state: { SubprocessData, ProcessStepsData },
        });
    };

    return (
        <div class="progress-managment pt-36">
            <div class="progress-managment-container flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[23px] px-2">
                <MenuProgressFarmer inPage="process" />
                <div class="list-progress-section w-full xl:w-[831px] max-w-[831px]">
                    <div class="status-nav-container w-full">
                        <div class="status-progress-nav w-full">
                            <div class="status-all w-[12.15%]">
                                <div class="text-2">All</div>
                            </div>
                            <div class="status-uncompleted w-[21.5%]">
                                <div class="text-2">Uncompleted</div>
                            </div>
                            <div class="status-completed w-[17.8%]">
                                <div class="text-2">Completed</div>
                            </div>
                            <div class="status-need-info w-[17.8%]">
                                <div class="text-2">Need confirmation</div>
                            </div>
                        </div>
                    </div>
                    <div class="search-progress-container mt-[13px] h-10">
                        <div class="search-bar w-full h-full">
                            <div class="search-bar relative w-full h-full flex items-center">
                                <img class="material-symbols-2 pl-4" src={searchIcon} alt="search icon" />
                                <input type="text" class="search-input w-[38.5%]" placeholder="Search based on service name, expert name, or booking ID" />
                            </div>
                        </div>
                    </div>
                    <div class="progress-list-container mt-[26px] flex flex-col gap-10">

                        {Array.isArray(subprocesses) && subprocesses.length > 0 ? (
                            subprocesses.map((item, index) => (
                                <div key={item.subProcess.subprocessId || index} class="progress-card w-full">
                                    <div class="header-progress-section flex flex-col sm:flex-row justify-between">
                                        <div class="infor-progress-section">
                                            <div class="info-1">
                                                <div class="text-progress-info-1">ID Process:</div>
                                                <div class="text-progress-id">{item.subProcess.subprocessId}</div>
                                            </div>
                                            <div class="info-1">
                                                <div class="text-progress-info-1">ID booking:</div>
                                                <div class="text-progress-p-1">{item.subProcess.bookingServiceId}</div>
                                            </div>
                                            <div class="date-info">
                                                <div class="text-progress-info-1">Lasted updated:</div>
                                                {(() => {
                                                    const d = new Date(item.subProcess.updatedAt || item.subProcess.createdAt);
                                                    const dateStr = d.toLocaleDateString("vi-VN");
                                                    const timeStr = d.toLocaleTimeString("vi-VN");
                                                    return (
                                                        <div className="text-progress-p-1">
                                                            {timeStr} - {dateStr}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div>

                                        {item.subProcess.subProcessStatus === "Created" && (
                                            <div class="status-info-uncompleted max-h-[30px] mt-4 sm:mt-0">
                                                <div class="text-uncompleted-a-need">{item.subProcess.subProcessStatus}</div>
                                            </div>
                                        )}

                                        {item.subProcess.subProcessStatus === "On Process" && (
                                            <div class="status-info-completed max-h-[30px] mt-4 sm:mt-0">
                                                <div class="text-completed">On Process</div>
                                            </div>
                                        )}

                                        {item.subProcess.subProcessStatus === "Completed" && (
                                            <div class="status-info-completed max-h-[30px] mt-4 sm:mt-0">
                                                <div class="text-completed">Completed</div>
                                            </div>
                                        )}


                                    </div>
                                    <div class="progress-step-container w-full">
                                        {item.processSteps.length > 0 && (
                                            item.processSteps.map((step, index) => (
                                                <div class={step.processStep.stepNumber <= item.subProcess.continueStep ? "done-step" : "not-done-step"}>
                                                    <div class="text-progress-info-1">Step {step.processStep.stepNumber}</div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div class="footer-progress-section">
                                        <div class="footer-progress-button"
                                            onClick={() => handleClickViewProcess(item.subProcess, item.processSteps)}>
                                            <div class="progress-button-text">Continue</div>
                                        </div>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <p className="text-center text-gray-500 mt-4">No process found.</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}