import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./progressMenustyle.css";
import avaiProcess from "../../assets/images/fluent_person-available-20-filled.png";
import unpaidOrder from "../../assets/images/material-symbols_warning.png";
import waitingOrder from "../../assets/images/medical-icon_waiting-area.png";
import attentionIcon from "../../assets/images/icon-park-solid_attention.png";

export default function ProgressMenu() {
    return (
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
    );
}