import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import user_black_icon from "../../assets/icons/user_black_icon.svg";
import plus_icon from "../../assets/icons/plus_icon.svg";
import service_black_icon from "../../assets/icons/service_black_icon.svg";
import payment_icon from "../../assets/icons/payment_icon.svg";
import cancelIcon from "../../assets/images/cancel_vector.png";
import headLine from "../../assets/images/head_line.png";

const MenuHeader = ({ onToggle, isVisible }) => {
    const navigate = useNavigate();
    // Xử lý logout
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/Login');
        onToggle();
    };

    return (
        isVisible && (
            <div className="fixed md:right-5 right-0 top-16 max-w-sm z-[1001] border border-gray-300 border-solid shadow-lg rounded-xl max-h-[90vh] overflow-y-auto">
                <div className="w-full h-full p-4 pt-4 bg-white rounded-xl">
                    <div className="w-full flex justify-between items-center mx-auto px-4 sm:px-0 h-[35px]">
                        <div className="font-bold text-black text-[18px] leading-normal whitespace-nowrap">
                            Menu
                        </div>
                        <div
                            className="flex w-[35px] h-[35px] items-center justify-center gap-2.5 p-1.5 bg-[#c0bebe] rounded-full overflow-hidden cursor-pointer hover:bg-[#999999]"
                            onClick={onToggle}
                            role="button"
                            aria-label="Close menu"
                        >
                            <img className="w-[12.62px] h-[12.62px]" src={cancelIcon} alt="Close" />
                        </div>
                    </div>
                    <img className="w-full h-[1px] object-cover mt-3" src={headLine} alt="Header line" />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Link
                            to="/PersonalPage"
                            className="flex flex-col items-center p-4 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                            onClick={onToggle}
                        >
                            <img src={user_black_icon} alt="Profile" className="h-5" />
                            <p className="mt-2">My Profile</p>
                        </Link>
                        <Link
                            to="/payment"
                            className="flex flex-col items-center p-4 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                            onClick={onToggle}
                        >
                            <img src={payment_icon} alt="Payment" className="h-5" />
                            <p className="mt-2">Payment</p>
                        </Link>
                        <Link
                            to="/professional"
                            className="flex flex-col items-center p-4 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                            onClick={onToggle}
                        >
                            <img src={plus_icon} alt="Professional" className="h-5" />
                            <p className="mt-2">Professional</p>
                        </Link>
                        <Link
                            to="/service"
                            className="flex flex-col items-center p-4 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                            onClick={onToggle}
                        >
                            <img src={service_black_icon} alt="Service" className="h-5" />
                            <p className="mt-2">Your Service</p>
                        </Link>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full gap-3 px-4 py-2 mt-4 text-sm text-white hover:bg-blue-500 focus:outline-none bg-[#3DB3FB] rounded-xl"
                    >
                        <i className="fa-solid fa-power-off fa-xl"></i>
                        <p className="font-medium">Logout</p>
                    </button>
                </div>
            </div>
        )
    );
};

export default MenuHeader;