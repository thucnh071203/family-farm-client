import React from "react";
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

export default function ServicesList() {
  return (
    // <div className="service">
    //   <div className="div">
    //     <div className="main-container w-full flex flex-row justify-center mt-[27px] gap-5 mx-auto">
    //       <div className="container-service flex flex-col mx-3 md:mx-0 w-full md:w-[710px] max-w-[710px]">
    //         <div className="service-header mt-2">
    //           <div className="service-header-title flex flex-row justify-between px-4">
    //             <div className="text-wrapper">Services</div>
    //             <div className="icon-filter">
    //               <img src="./src/images/filter_icon_svg.svg" alt="filter" />
    //             </div>
    //           </div>
    //           <img className="line mx-auto mt-2" src="./src/images/Line 9.png" alt="line" />
    //         </div>

    //         <div className="service-container">
    //           {[1, 2, 3, 4].map((_, index) => (
    //             <div key={index} className="service-box w-[42%] md:w-[44.55%]">
    //               <img className="service-background" src="./src/images/service_thumb.png" alt="service" />
    //               <div className="service-title w-[93%]">
    //                 Treatment of yellow leaves in rice plants and improvement...
    //               </div>
    //               <div className="body-service">
    //                 <div className="author-content">
    //                   <div className="avatar-content">
    //                     <img src="./src/images/user1.png" alt="avatar" />
    //                   </div>
    //                   <div className="author-info">
    //                     <div className="author-name">Dang Khoa</div>
    //                     <div className="author-role">Expert</div>
    //                   </div>
    //                 </div>
    //                 <div className="price-content">
    //                   <div className="icon-cart">
    //                     <img src="./src/images/icon_shopping_cart.png" alt="cart" />
    //                   </div>
    //                   <span className="price-num">1.000.000</span>
    //                   <span className="price-deno">VND</span>
    //                 </div>
    //               </div>
    //               <div className="footer-service">
    //                 <div className="rate-cotent">
    //                   <div className="star-rates flex flex-row">
    //                     {[...Array(3)].map((_, i) => (
    //                       <img key={i} className="star-icon" src="./src/images/icon_yellow_star.png" alt="star" />
    //                     ))}
    //                     {[...Array(2)].map((_, i) => (
    //                       <img key={i} className="star-icon" src="./src/images/icon_gray_star.png" alt="gray star" />
    //                     ))}
    //                   </div>
    //                   <div className="rate-num">(50)</div>
    //                 </div>
    //                 <div className="status-expert-container">
    //                   <div className="status-icon"></div>
    //                   <div className="status-content">Active</div>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>

    //         <div className="pageniation flex flex-row gap-2 mx-auto mt-9">
    //           {[
    //             <img className="mask" src="./src/images/previous.png" alt="prev" />,
    //             "1", "2", "3", "....", "8",
    //             <img className="mask" src="./src/images/continous.png" alt="next" />,
    //           ].map((item, i) => (
    //             <div key={i} className="flex justify-center items-center">
    //               {typeof item === "string" ? <div className="text-wrapper-2">{item}</div> : item}
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       <div className="suggest-expert hidden md:block md:w-[306px] max-w-[306px]">
    //         <div className="suggest-box">
    //           <div className="suggest-title">Suggested Experts</div>
    //           <div className="suggest-list">
    //             {[
    //               { name: "Dang Khoa", location: "Can Tho" },
    //               { name: "Huu Thuc", location: "Can Tho" },
    //               { name: "Minh Uyen", location: "Kien Giang" },
    //               { name: "Mai Xuan", location: "Kien Giang" },
    //             ].map((expert, i) => (
    //               <div key={i} className="suggest-item">
    //                 <div className="expert-info">
    //                   <img
    //                     className="expert-avatar"
    //                     src="https://placehold.co/36x36"
    //                     alt={expert.name}
    //                   />
    //                   <div className="expert-text">
    //                     <div className="expert-name">{expert.name}</div>
    //                     <div className="expert-location">{expert.location}</div>
    //                   </div>
    //                 </div>
    //                 <div className="follow-button">
    //                   <div className="follow-icon">
    //                     <img src="./src/images/weui_add-friends-filled.png" alt="follow" />
    //                   </div>
    //                   <div className="follow-text">Follow</div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="service">
        <div class="div">
            <div class="main-container w-full flex flex-row justify-center mt-[27px] gap-5 mx-auto">
                <div class="container-service flex flex-col mx-3 md:mx-0 w-full md:w-[710px] max-w-[710px]">
                    <div class="service-header mt-2">
                        <div class="service-header-title flex flex-row justify-between px-4">
                            <div class="text-wrapper">Services</div>
                            <div class="icon-filter">
                                <img src={filterIcon} alt="image"/>
                            </div>
                        </div>
                        <img class="line mx-auto mt-2" src={lineService} />
                    </div>

                    <div class="service-container">
                        <div class="service-box w-[42%] md:w-[44.55%]">
                            <img class="service-background" src={serviceBg} alt="image here"/>
                            <div class="service-title w-[93%]">
                                Treatment of yellow leaves in rice plants and improvement ce dădddaaaaaaaaaaaaaaa...
                            </div>
                            <div class="body-service">
                                <div class="author-content">
                                    <div class="avatar-content">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div class="author-info">
                                        <div class="author-name">Dang Khoa</div>
                                        <div class="author-role">Expert</div>
                                    </div>
                                </div>
                                <div class="price-content">
                                    <div class="icon-cart">
                                        <img src={cart} alt=""/>
                                    </div>
                                    <span class="price-num">1.000.000</span>
                                    <span class="price-deno">VND</span>
                                </div>
                            </div>
                            <div class="footer-service">
                                <div class="rate-cotent">
                                    <div class="star-rates flex flex-row">
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={yellowStar}alt=""/>
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={grayStar} alt=""/>
                                        <img class="star-icon" src={grayStar} alt=""/>
                                    </div>
                                    <div class="rate-num">(50)</div>
                                </div>
                                <div class="status-expert-container">
                                    <div class="status-icon"></div>
                                    <div class="status-content">Active</div>
                                </div>
                            </div>
                        </div>
                        <div class="service-box w-[42%] md:w-[44.55%]">
                            <img class="service-background" src={serviceBg} alt="image here"/>
                            <div class="service-title w-[93%]">
                                Treatment of yellow leaves in rice plants and improvement of performance...
                            </div>
                            <div class="body-service">
                                <div class="author-content">
                                    <div class="avatar-content">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div class="author-info">
                                        <div class="author-name">Dang Khoa</div>
                                        <div class="author-role">Expert</div>
                                    </div>
                                </div>
                                <div class="price-content">
                                    <div class="icon-cart">
                                        <img src={cart} alt=""/>
                                    </div>
                                    <span class="price-num">1.000.000</span>
                                    <span class="price-deno">VND</span>
                                </div>
                            </div>
                            <div class="footer-service">
                                <div class="rate-cotent">
                                    <div class="star-rates flex flex-row">
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={grayStar} alt=""/>
                                        <img class="star-icon" src={grayStar} alt=""/>
                                    </div>
                                    <div class="rate-num">(50)</div>
                                </div>
                                <div class="status-expert-container">
                                    <div class="status-icon"></div>
                                    <div class="status-content">Active</div>
                                </div>
                            </div>
                        </div>
                        <div class="service-box w-[42%] md:w-[44.55%]">
                            <img class="service-background" src={serviceBg} alt="image here"/>
                            <div class="service-title w-[93%]">
                                Treatment of yellow leaves in rice plants and improvement of performance...
                            </div>
                            <div class="body-service">
                                <div class="author-content">
                                    <div class="avatar-content">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div class="author-info">
                                        <div class="author-name">Dang Khoa</div>
                                        <div class="author-role">Expert</div>
                                    </div>
                                </div>
                                <div class="price-content">
                                    <div class="icon-cart">
                                        <img src={cart} alt=""/>
                                    </div>
                                    <span class="price-num">1.000.000</span>
                                    <span class="price-deno">VND</span>
                                </div>
                            </div>
                            <div class="footer-service">
                                <div class="rate-cotent">
                                    <div class="star-rates flex flex-row">
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={grayStar} alt=""/>
                                        <img class="star-icon" src={grayStar} alt=""/>
                                    </div>
                                    <div class="rate-num">(50)</div>
                                </div>
                                <div class="status-expert-container">
                                    <div class="status-icon"></div>
                                    <div class="status-content">Active</div>
                                </div>
                            </div>
                        </div>
                        <div class="service-box w-[42%] md:w-[44.55%]">
                            <img class="service-background" src={serviceBg} alt="image here"/>
                            <div class="service-title w-[93%]">
                                Treatment of yellow leaves in rice plants and improvement of performance...
                            </div>
                            <div class="body-service">
                                <div class="author-content">
                                    <div class="avatar-content">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div class="author-info">
                                        <div class="author-name">Dang Khoa</div>
                                        <div class="author-role">Expert</div>
                                    </div>
                                </div>
                                <div class="price-content">
                                    <div class="icon-cart">
                                        <img src={cart} alt=""/>
                                    </div>
                                    <span class="price-num">1.000.000</span>
                                    <span class="price-deno">VND</span>
                                </div>
                            </div>
                            <div class="footer-service">
                                <div class="rate-cotent">
                                    <div class="star-rates flex flex-row">
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={yellowStar} alt=""/>
                                        <img class="star-icon" src={grayStar} alt=""/>
                                        <img class="star-icon" src={grayStar} alt=""/>
                                    </div>
                                    <div class="rate-num">(50)</div>
                                </div>
                                <div class="status-expert-container">
                                    <div class="status-icon"></div>
                                    <div class="status-content">Active</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pageniation flex flex-row gap-2 mx-auto mt-9">
                        <div class="mask-wrapper flex justify-center items-center"><img class="mask" src={previous} /></div>
                        <div class="overlap-4 flex justify-center items-center">
                            <div class="text-wrapper-2">1</div>
                        </div>
                        <div class="overlap-3 flex justify-center items-center">
                            <div class="text-wrapper-2">2</div>
                        </div>
                        <div class="div-wrapper flex justify-center items-center">
                            <div class="text-wrapper-2">3</div>
                        </div>
                        <div class="text-wrapper-3 flex justify-center items-center">....</div>
                        <div class="overlap-2 flex justify-center items-center">
                            <div class="text-wrapper-2">8</div>
                        </div>
                        <div class="mask-group-wrapper flex justify-center items-center"><img class="mask" src={continous} /></div>
                    </div>
                </div>
                <div class="suggest-expert hidden md:block md:w-[306px] max-w-[306px]">
                    <div class="suggest-box">
                        <div class="suggest-title">Suggested Experts</div>
                        <div class="suggest-list">
                            <div class="suggest-item">
                                <div class="expert-info">
                                    <img class="expert-avatar" src="https://placehold.co/36x36" alt="Dang Khoa" />
                                    <div class="expert-text">
                                        <div class="expert-name">Dang Khoa</div>
                                        <div class="expert-location">Can Tho</div>
                                    </div>
                                </div>
                                <div class="follow-button">
                                    <div class="follow-icon">
                                        <img src={addFriend} alt=""/>
                                    </div>
                                    <div class="follow-text">Follow</div>
                                </div>
                            </div>

                            <div class="suggest-item">
                                <div class="expert-info">
                                    <img class="expert-avatar" src="https://placehold.co/36x36" alt="Huu Thuc" />
                                    <div class="expert-text">
                                        <div class="expert-name">Huu Thuc</div>
                                        <div class="expert-location">Can Tho</div>
                                    </div>
                                </div>
                                <div class="follow-button">
                                    <div class="follow-icon">
                                        <img src={addFriend} alt=""/>
                                    </div>
                                    <div class="follow-text">Follow</div>
                                </div>
                            </div>

                            <div class="suggest-item">
                                <div class="expert-info">
                                    <img class="expert-avatar" src="https://placehold.co/36x36" alt="Minh Uyen" />
                                    <div class="expert-text">
                                        <div class="expert-name">Minh Uyen</div>
                                        <div class="expert-location">Kien Giang</div>
                                    </div>
                                </div>
                                <div class="follow-button">
                                    <div class="follow-icon">
                                        <img src={addFriend} alt=""/>
                                    </div>
                                    <div class="follow-text">Follow</div>
                                </div>
                            </div>

                            <div class="suggest-item">
                                <div class="expert-info">
                                    <img class="expert-avatar" src="https://placehold.co/36x36" alt="Mai Xuan" />
                                    <div class="expert-text">
                                        <div class="expert-name">Mai Xuan</div>
                                        <div class="expert-location">Kien Giang</div>
                                    </div>
                                </div>
                                <div class="follow-button">
                                    <div class="follow-icon">
                                        <img src={addFriend} alt=""/>
                                    </div>
                                    <div class="follow-text">Follow</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}