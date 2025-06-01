import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import serviceBg from "../../assets/images/service_thumb.png";
import filterIcon from "../../assets/images/filter_icon_svg.svg";
import lineService from "../../assets/images/Line 9.png";
import userAvatar from "../../assets/images/user1.png";
import cart from "../../assets/images/icon_shopping_cart.png";
import yellowStar from "../../assets/images/icon_yellow_star.png";
import grayStar from "../../assets/images/icon_gray_star.png";
import previous from "../../assets/images/previous.png";
import continous from "../../assets/images/continous.png";
import addFriend from "../../assets/images/weui_add-friends-filled.png";
import SuggestedExperts from "./SuggestedExperts";
import SuggestedGroups from "../Home/SuggestedGroups";
import FilterService from "../FilterService/FilterService";
import instance from "../../Axios/axiosConfig";

export default function ServicesList() {
    const [services, setServices] = useState([]);
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const handleToggleFilter = () => {
        setShowFilterPopup(!showFilterPopup);
    };

    // Lấy dữ liệu bằng cách gọi API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await instance.get("/api/service/all"); // Cập nhật đúng đường dẫn nếu cần
                if (res.data.success) {
                    console.log("DATA RETURNED FROM API:", res.data.data);
                    setServices(res.data.data);
                } else {
                    console.error("Lỗi khi gọi API:", res.data.message);
                }
            } catch (err) {
                console.error("Lỗi mạng:", err);
            }
        };

        fetchServices();
        }, []);

        // Dữ liệu dịch vụ hiện tại trên trang
        const indexOfLastService = currentPage * itemsPerPage;
        const indexOfFirstService = indexOfLastService - itemsPerPage;
        const currentServices = services.slice(indexOfFirstService, indexOfLastService);

        // Tổng số trang
        const totalPages = Math.ceil(services.length / itemsPerPage);
        return (
            <div className="service">
                <div className="div">
                    <div className="main-container w-full flex flex-row justify-center lg:mt-[9rem] mt-[5rem] gap-5 mx-auto">
                        <div className="flex flex-col w-full mx-3 container-service max-w-[710px] md:mx-0 md:w-5xl">
                            <div className="mt-2 service-header">
                                <div className="flex flex-row justify-between px-4 service-header-title">
                                    <div className="text-wrapper">Services</div>
                                    <div>
                                        {/* Icon Filter */}
                                        <div className="icon-filter cursor-pointer" onClick={handleToggleFilter}>
                                            <img src={filterIcon} alt="Filter" />
                                        </div>

                                        {/* Popup FilterService */}
                                        {showFilterPopup && (
                                            <div className="fixed left-[35%] top-[200px] h-fit w-fit inset-0 flex justify-center items-center z-50">
                                                <div className="relative">
                                                    <FilterService onClose={() => setShowFilterPopup(false)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <img className="mx-auto mt-2 line" src={lineService} />
                            </div>

                            <div className="service-container">
                                {/* Hiển thị list service */}
                                {currentServices.map((wrapper, index) => {
                                    const service = wrapper.service;
                                    return (
                                        <div key={index} className="service-box w-[42%] md:w-[44.55%]">
                                            <img className="service-background" src={serviceBg} alt="service background" />
                                            <div className="service-title w-[93%] min-h-[32px]">{service.serviceName}</div>
                                            <div className="body-service px-3">
                                                <div className="author-content">
                                                    <div className="avatar-content">
                                                        <img src={userAvatar} alt="avatar" />
                                                    </div>
                                                    <div className="author-info">
                                                        <div className="author-name">Dang Khoa</div>
                                                        <div className="author-role">Expert</div>
                                                    </div>
                                                </div>
                                                <div className="price-content">
                                                    <div className="icon-cart">
                                                        <img src={cart} alt="cart" />
                                                    </div>
                                                    <span className="price-num">{service.price}</span>
                                                    <span className="price-deno">VND</span>
                                                </div>
                                            </div>
                                            <div className="footer-service">
                                                <div className="rate-cotent">
                                                    <div className="flex flex-row star-rates">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <img
                                                                key={star}
                                                                className="star-icon"
                                                                src={star <= Math.round(service.averageRate || 0) ? yellowStar : grayStar}
                                                                alt="star"
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="rate-num">({service.rateCount || 0})</div>
                                                </div>
                                                <div className="status-expert-container">
                                                    <div className="status-icon"></div>
                                                    <div className="status-content">Active</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Phân trang */}
                            <div className="flex flex-row justify-center gap-2 mx-auto pageniation mt-9 mb-3">
                                {/* Nút Previous */}
                                <div
                                    className="flex items-center justify-center mask-wrapper cursor-pointer"
                                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                >
                                    <img className="mask" src={previous} />
                                </div>

                                {/* Số trang */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <div
                                    key={pageNum}
                                    className={`flex items-center justify-center ${
                                        pageNum === currentPage ? "overlap-4" : "overlap-3"
                                    } cursor-pointer`}
                                    onClick={() => setCurrentPage(pageNum)}
                                    >
                                    <div className="text-wrapper-2">{pageNum}</div>
                                    </div>
                                ))}

                                {/* Nút Next */}
                                <div
                                    className="flex items-center justify-center mask-group-wrapper cursor-pointer"
                                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                >
                                    <img className="mask" src={continous} />
                                </div>
                                </div>

                        </div>
                        <div className="suggest-expert hidden md:block md:w-[306px] max-w-[306px] space-y-6">
                            <SuggestedExperts />
                            <SuggestedGroups />
                        </div>
                    </div>
                </div>
            </div>
        );
    }