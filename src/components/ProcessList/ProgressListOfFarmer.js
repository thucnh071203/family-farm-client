import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuProgressFarmer from "../MenuProgressFarmer/MenuProgress";
import "./progressListFarmerstyle.css";
import searchIcon from "../../assets/images/material-symbols_search.svg";

export default function ProgressListOfFarmer() {
    return (
        <div class="progress-managment pt-36">
            <div class="progress-managment-container flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[23px] px-2">
                <MenuProgressFarmer/>
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
                        <div class="progress-card w-full">
                            <div class="header-progress-section flex flex-col sm:flex-row justify-between">
                                <div class="infor-progress-section">
                                    <div class="info-1">
                                        <div class="text-progress-info-1">ID progress:</div>
                                        <div class="text-progress-id">68007b0387b41211f0af1d56</div>
                                    </div>
                                    <div class="info-1">
                                        <div class="text-progress-info-1">Service name:</div>
                                        <div class="text-progress-p-1">Support ReactJS tutorials</div>
                                    </div>
                                    <div class="date-info">
                                        <div class="text-progress-info-1">Lasted updated:</div>
                                        <div class="text-progress-p-1">Aug, 21 2025</div>
                                    </div>
                                </div>
                                <div class="status-info-uncompleted max-h-[30px] mt-4 sm:mt-0">
                                    <div class="text-uncompleted-a-need">Uncompleted</div>
                                </div>
                            </div>
                            <div class="progress-step-container w-full">
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 1</div>
                                </div>
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 2</div>
                                </div>
                                <div class="not-done-step">
                                    <div class="text-progress-info-1">Step 3</div>
                                </div>
                                <div class="not-done-step">
                                    <div class="text-progress-info-1">Step 4</div>
                                </div>
                                <div class="not-done-step">
                                    <div class="text-progress-info-1">Step 5</div>
                                </div>
                            </div>
                            <div class="footer-progress-section">
                                <div class="footer-progress-button">
                                    <div class="progress-button-text">Continue</div>
                                </div>
                            </div>
                        </div>
                        <div class="progress-card">
                            <div class="header-progress-section flex flex-col sm:flex-row justify-between">
                                <div class="infor-progress-section">
                                    <div class="info-1">
                                        <div class="text-progress-info-1">ID progress:</div>
                                        <div class="text-progress-id">68007b0387b41211f0af1d56</div>
                                    </div>
                                    <div class="info-1">
                                        <div class="text-progress-info-1">Service name:</div>
                                        <div class="text-progress-p-1">Support ReactJS tutorials</div>
                                    </div>
                                    <div class="date-info">
                                        <div class="text-progress-info-1">Lasted updated:</div>
                                        <div class="text-progress-p-1">Aug, 21 2025</div>
                                    </div>
                                </div>
                                <div class="status-info-completed max-h-[30px] mt-4 sm:mt-0">
                                    <div class="text-completed">Completed</div>
                                </div>
                            </div>
                            <div class="progress-step-container">
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 1</div>
                                </div>
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 2</div>
                                </div>
                                <div class="not-done-step">
                                    <div class="text-progress-info-1">Step 3</div>
                                </div>
                                <div class="not-done-step">
                                    <div class="text-progress-info-1">Step 4</div>
                                </div>
                                <div class="not-done-step">
                                    <div class="text-progress-info-1">Step 5</div>
                                </div>
                            </div>
                        </div>
                        <div class="progress-card">
                            <div class="header-progress-section flex flex-col sm:flex-row justify-between">
                                <div class="infor-progress-section">
                                    <div class="info-1">
                                        <div class="text-progress-info-1">ID progress:</div>
                                        <div class="text-progress-id">68007b0387b41211f0af1d56</div>
                                    </div>
                                    <div class="info-1">
                                        <div class="text-progress-info-1">Service name:</div>
                                        <div class="text-progress-p-1">Support ReactJS tutorials</div>
                                    </div>
                                    <div class="date-info">
                                        <div class="text-progress-info-1">Lasted updated:</div>
                                        <div class="text-progress-p-1">Aug, 21 2025</div>
                                    </div>
                                </div>
                                <div class="status-info-needinf max-h-[30px] mt-4 sm:mt-0">
                                    <div class="text-uncompleted-a-need">Need confirmation</div>
                                </div>
                            </div>
                            <div class="progress-step-container">
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 1</div>
                                </div>
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 2</div>
                                </div>
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 3</div>
                                </div>
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 4</div>
                                </div>
                                <div class="done-step">
                                    <div class="text-progress-info-1">Step 5</div>
                                </div>
                            </div>
                            <div class="footer-progress-section">
                                <div class="footer-progress-button">
                                    <div class="progress-button-text">Confirm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}