import React from "react";
import { Link } from "react-router-dom";

const BasicInfo = ({ info }) => {
    const defaultInfo = {
        gender: "Male",
        location: "An Giang, Viet Nam",
        study: "FPTU Viet Nam",
        work: "TP.HCM, Viet Nam",
    };
    const userInfo = { ...defaultInfo, ...info };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3">Basic Information</h2>
            <div className="flex justify-between items-center pb-3">
                <div>
                    <p className="font-bold pt-1 pb-1">Gender</p> {userInfo.gender}
                </div>
                <i className="fa-solid fa-venus-mars w-6 text-red-500"></i>
            </div>
            <div className="flex justify-between items-center pb-3">
                <div>
                    <p className="font-bold pt-1 pb-1">Lives in</p> {userInfo.location}
                </div>
                <i className="fa-solid fa-location-dot w-5 text-green-500"></i>
            </div>
            <div className="flex justify-between items-center pb-3">
                <div>
                    <p className="font-bold pt-1 pb-1">Study at</p> {userInfo.study}
                </div>
                <i className="fa-solid fa-graduation-cap w-6 text-yellow-600"></i>
            </div>
            <div className="flex justify-between items-center pb-3">
                <div>
                    <p className="font-bold pt-1 pb-1">Worked at</p> {userInfo.work}
                </div>
                <i className="fa-solid fa-briefcase w-6 text-sky-500"></i>
            </div>
            <Link to="/UpdateProfile">
                <button className="w-full font-bold mt-3 p-2 bg-gray-200 rounded-md">
                    Edit Information
                </button>
            </Link>
        </div>
    );
};

export default BasicInfo;