import React, { useEffect, useState } from "react";
import axios from "axios";
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

export default function ServicesList() {
    const [services, setServices] = useState([]);

    // Lấy dữ liệu bằng cách gọi API
    useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://localhost:7280/api/service/all"); // Cập nhật đúng đường dẫn nếu cần
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

  return (
    <div className="service">
        <div className="div">
            <div className="main-container w-full flex flex-row justify-center lg:mt-[9rem] mt-[5rem] gap-5 mx-auto">
                <div className="flex flex-col w-full max-w-5xl mx-3 container-service max-w-[710px] md:mx-0 md:w-5xl">
                    <div className="mt-2 service-header">
                        <div className="flex flex-row justify-between px-4 service-header-title">
                            <div className="text-wrapper">Services</div>
                            <div className="icon-filter">
                                <img src={filterIcon} alt="image"/>
                            </div>
                        </div>
                        <img className="mx-auto mt-2 line" src={lineService} />
                    </div>

                    <div className="service-container">
                        {/* Hiển thị list service */}
                        {services.map((wrapper, index) => {
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
                        {/* {services.map((wrapper, index) => {
                        const service = wrapper.service;
                        return (
                        <div className="service-box w-[42%] md:w-[44.55%]">
                            <img className="service-background" src={serviceBg} alt="image here"/>
                            <div className="service-title w-[93%]">
                                {service.ServiceName}
                            </div>
                            <div className="body-service">
                                <div className="author-content">
                                    <div className="avatar-content">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div className="author-info">
                                        <div className="author-name">Dang Khoa</div>
                                        <div className="author-role">Expert</div>
                                    </div>
                                </div>
                                <div className="price-content">
                                    <div className="icon-cart">
                                        <img src={cart} alt=""/>
                                    </div>
                                    <span className="price-num">{service.Price}</span>
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
                                            src={star <= Math.round(service.AverageRate || 0) ? yellowStar : grayStar}
                                            alt="star"
                                        />
                                        ))}
                                    </div>
                                    <div className="rate-num">({service.RateCount || 0})</div>
                                </div>
                                <div className="status-expert-container">
                                    <div className="status-icon"></div>
                                    <div className="status-content">Active</div>
                                </div>
                            </div>
                        </div>
                        );
                        })} */}
                        {/* <div className="service-box w-[42%] md:w-[44.55%]">
                            <img className="service-background" src={serviceBg} alt="image here"/>
                            <div className="service-title w-[93%]">
                                Treatment of yellow leaves in rice plants and improvement of performance...
                            </div>
                            <div className="body-service">
                                <div className="author-content">
                                    <div className="avatar-content">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div className="author-info">
                                        <div className="author-name">Dang Khoa</div>
                                        <div className="author-role">Expert</div>
                                    </div>
                                </div>
                                <div className="price-content">
                                    <div className="icon-cart">
                                        <img src={cart} alt=""/>
                                    </div>
                                    <span className="price-num">1.000.000</span>
                                    <span className="price-deno">VND</span>
                                </div>
                            </div>
                            <div className="footer-service">
                                <div className="rate-cotent">
                                    <div className="flex flex-row star-rates">
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={grayStar} alt=""/>
                                        <img className="star-icon" src={grayStar} alt=""/>
                                    </div>
                                    <div className="rate-num">(50)</div>
                                </div>
                                <div className="status-expert-container">
                                    <div className="status-icon"></div>
                                    <div className="status-content">Active</div>
                                </div>
                            </div>
                        </div>
                        <div className="service-box w-[42%] md:w-[44.55%]">
                            <img className="service-background" src={serviceBg} alt="image here"/>
                            <div className="service-title w-[93%]">
                                Treatment of yellow leaves in rice plants and improvement of performance...
                            </div>
                            <div className="body-service">
                                <div className="author-content">
                                    <div className="avatar-content">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div className="author-info">
                                        <div className="author-name">Dang Khoa</div>
                                        <div className="author-role">Expert</div>
                                    </div>
                                </div>
                                <div className="price-content">
                                    <div className="icon-cart">
                                        <img src={cart} alt=""/>
                                    </div>
                                    <span className="price-num">1.000.000</span>
                                    <span className="price-deno">VND</span>
                                </div>
                            </div>
                            <div className="footer-service">
                                <div className="rate-cotent">
                                    <div className="flex flex-row star-rates">
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={grayStar} alt=""/>
                                        <img className="star-icon" src={grayStar} alt=""/>
                                    </div>
                                    <div className="rate-num">(50)</div>
                                </div>
                                <div className="status-expert-container">
                                    <div className="status-icon"></div>
                                    <div className="status-content">Active</div>
                                </div>
                            </div>
                        </div>
                        <div className="service-box w-[42%] md:w-[44.55%]">
                            <img className="service-background" src={serviceBg} alt="image here"/>
                            <div className="service-title w-[93%]">
                                Treatment of yellow leaves in rice plants and improvement of performance...
                            </div>
                            <div className="body-service">
                                <div className="author-content">
                                    <div className="avatar-content">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div className="author-info">
                                        <div className="author-name">Dang Khoa</div>
                                        <div className="author-role">Expert</div>
                                    </div>
                                </div>
                                <div className="price-content">
                                    <div className="icon-cart">
                                        <img src={cart} alt=""/>
                                    </div>
                                    <span className="price-num">1.000.000</span>
                                    <span className="price-deno">VND</span>
                                </div>
                            </div>
                            <div className="footer-service">
                                <div className="rate-cotent">
                                    <div className="flex flex-row star-rates">
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={yellowStar} alt=""/>
                                        <img className="star-icon" src={grayStar} alt=""/>
                                        <img className="star-icon" src={grayStar} alt=""/>
                                    </div>
                                    <div className="rate-num">(50)</div>
                                </div>
                                <div className="status-expert-container">
                                    <div className="status-icon"></div>
                                    <div className="status-content">Active</div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <div className="flex flex-row gap-2 mx-auto pageniation mt-9">
                        <div className="flex items-center justify-center mask-wrapper"><img className="mask" src={previous} /></div>
                        <div className="flex items-center justify-center overlap-4">
                            <div className="text-wrapper-2">1</div>
                        </div>
                        <div className="flex items-center justify-center overlap-3">
                            <div className="text-wrapper-2">2</div>
                        </div>
                        <div className="flex items-center justify-center div-wrapper">
                            <div className="text-wrapper-2">3</div>
                        </div>
                        <div className="flex items-center justify-center text-wrapper-3">....</div>
                        <div className="flex items-center justify-center overlap-2">
                            <div className="text-wrapper-2">8</div>
                        </div>
                        <div className="flex items-center justify-center mask-group-wrapper"><img className="mask" src={continous} /></div>
                    </div>
                </div>
                <div className="suggest-expert hidden md:block md:w-[306px] max-w-[306px]">
                    <SuggestedExperts/>
                </div>

            </div>
        </div>
    </div>
  );
}