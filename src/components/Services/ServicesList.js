import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    const [filteredServices, setFilteredServices] = useState([]);
    const [filter, setFilter] = useState({
        name: "",
        star: "",
        priceMin: null,
        priceMax: null,
        createdAt: "",
    });

    // Bấm hiện filter
    const handleToggleFilter = () => {
        setShowFilterPopup(!showFilterPopup);
    };

    const handleApplyFilter = (filterData) => {
        console.log("Filter nhận được từ FilterService:", filterData);
        setFilter(filterData);
        setCurrentPage(1); // reset về trang đầu
        setShowFilterPopup(!showFilterPopup);
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // const res = await axios.get("https://localhost:7280/api/service/all");
                const res = await instance.get("api/service/all");
                if (res.data.success) {
                    const mappedServices = res.data.data
                        .filter(item => item.service)
                        .map(item => item.service);

                    const enrichedServices = await Promise.all(
                        mappedServices.map(async (service) => {
                            try {
                                // const providerRes = await axios.get(`https://localhost:7280/api/account/profile-another/${service.providerId}`);
                                const providerRes = await instance.get(`api/account/profile-another/${service.providerId}`);
                                const provider = providerRes.data?.data;

                                return {
                                    ...service,
                                    country: provider?.country || '',
                                    city: provider?.city || '',
                                };
                            } catch (err) {
                                console.error("❌ Không thể lấy thông tin provider:", service.providerId, err);
                                return {
                                    ...service,
                                    country: '',
                                    city: '',
                                };
                            }
                        })
                    );

                    //setServices(mappedServices);    
                    setServices(enrichedServices);
                    console.log("✅ Services đã chuẩn hóa:", enrichedServices);
                } else {
                    console.error("❌ Lỗi khi gọi API:", res.data.message);
                }
            } catch (err) {
                console.error("❌ Lỗi mạng:", err);
            }
        };

        fetchServices();
    }, []);

    const indexOfLastService = currentPage * itemsPerPage;
    const indexOfFirstService = indexOfLastService - itemsPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);


    useEffect(() => {
        const now = new Date();

        const filtered = services.filter((service, index) => {
            const matchName = filter.name
                ? service.serviceName?.toLowerCase().includes(filter.name.toLowerCase())
                : true;

            const matchStar = filter.star
                ? Math.floor(service.averageRate || 0) === parseInt(filter.star)
                : true;

            const price = Number(service.price); // ← Ép kiểu tại đây
            const matchPrice =
                (filter.priceMin === null || price >= filter.priceMin) &&
                (filter.priceMax === null || price <= filter.priceMax);

            const matchCountry = filter.country
                ? service.country?.toLowerCase() === filter.country.toLowerCase()
                : true;

            const matchCity = filter.city
                ? service.city?.toLowerCase() === filter.city.toLowerCase()
                : true;

            let matchDate = true;
            if (filter.createdAt && service.createAt) {
                const createdAt = new Date(service.createAt);

                switch (filter.createdAt) {
                    case "today": {
                        const createdDateString = createdAt.toISOString().split("T")[0];
                        const nowDateString = now.toISOString().split("T")[0];
                        matchDate = createdDateString === nowDateString;
                        break;
                    }
                    case "week": {
                        const startOfDayUTC = date => {
                            return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
                        };
                        const created = startOfDayUTC(createdAt);
                        const start = startOfDayUTC(new Date(now));
                        start.setUTCDate(start.getUTCDate() - start.getUTCDay()); // Chủ nhật
                        const end = new Date(start);
                        end.setUTCDate(start.getUTCDate() + 6); // Thứ bảy

                        matchDate = created >= start && created <= end;

                        break;
                    }
                    case "month":
                        matchDate =
                            createdAt.getMonth() === now.getMonth() &&
                            createdAt.getFullYear() === now.getFullYear();
                        break;
                    case "year":
                        matchDate = createdAt.getFullYear() === now.getFullYear();
                        break;
                    default:
                        matchDate = true;
                }
            }

            return matchName && matchStar && matchPrice && matchDate && matchCountry && matchCity;
        });

        // console.log("🌍 Đã lọc theo vị trí:", filter.country, filter.city);
        // console.log("📌 Dịch vụ sau khi lọc:", filtered);

        setFilteredServices(filtered);
    }, [services, filter]);

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
                                                <FilterService onClose={() => setShowFilterPopup(false)} onApplyFilter={handleApplyFilter} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <img className="mx-auto mt-2 line" src={lineService} />
                        </div>

                        {/* <div className="container-list">

                            </div> */}
                        <div className="service-container w-[91.8%] lg:w-[650px] mx-auto">
                            {/* Hiển thị list service */}
                            {currentServices.map((service, index) => {
                                // const service = wrapper.service;
                                return (
                                    <div key={index} className="service-box w-[42%] md:w-[44.55%] lg:w-[315px]">
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
                                    className={`flex items-center justify-center ${pageNum === currentPage ? "overlap-4" : "overlap-3"
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