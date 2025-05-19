import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./progressNavstyle.css";
import overviewIcon from "../../assets/images/tdesign_personal-information-filled_svg.svg";
import serviceIcon from "../../assets/images/eos-icons_service_svg.svg";
import progressIcon from "../../assets/images/fluent_step-16-filled_svg.svg";

export default function ProgressNav() {
    return (
        <div class="overflow-x-auto md:overflow-x-visible">
            <div class="frame w-full lg:max-w-[1197px] flex flex-row md:justify-center lg:justify-start mx-auto">
                <div class="frame-overview">
                    <img class="img" src={overviewIcon} />
                    <div class="text-wrapper-4 text-xl lg:text-base">Overview</div>
                </div>
                <div class="frame-service">
                    <img class="img" src={serviceIcon} />
                    <div class="text-wrapper-5 text-xl lg:text-base">Service Management</div>
                </div>
                <div class="frame-2">
                    <img class="img" src={progressIcon} />
                    <div class="text-wrapper-6 text-xl lg:text-base">Progress Management</div>
                </div>
            </div>
        </div>
    );
}