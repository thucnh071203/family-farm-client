import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./progressNavstyle.css";
import overviewIcon from "../../assets/images/tdesign_personal-information-filled_svg.svg";
import serviceIcon from "../../assets/images/eos-icons_service_svg.svg";
import progressIcon from "../../assets/images/fluent_step-16-filled_svg.svg";

export default function ProcessNav() {
    return (
        <div className="overflow-x-auto md:overflow-x-visible mt-7">
            <div className="flex flex-row w-full mx-auto frame lg:max-w-7xl md:justify-center lg:justify-start">
                <div className="frame-overview">
                    <img className="img" src={overviewIcon} />
                    <div className="text-xl text-wrapper-4 lg:text-base">Overview</div>
                </div>
                <div className="frame-service">
                    <img className="img" src={serviceIcon} />
                    <div className="text-xl text-wrapper-5 lg:text-base">
                        <Link to="/ServiceManagement">
                            Service Management
                        </Link>
                    </div>
                </div>
                <div className="frame-2">
                    <img className="img" src={progressIcon} />
                    <div className="text-xl text-wrapper-6 lg:text-base">
                        <Link to="/ProgressList">Progress Management</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}