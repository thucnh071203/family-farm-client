import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuProgressFarmer from "../MenuProgressFarmer/MenuProgress";
import "./progressListFarmerstyle.css";
import searchIcon from "../../assets/images/material-symbols_search.svg";
import instance from "../../Axios/axiosConfig";
import { toast } from "react-toastify";
import { useSignalR } from "../../context/SignalRContext";
import { useNotification } from "../../context/NotificationContext";


const ListRequestBookingFarmer = () => {
    const { hubConnection } = useNotification();
    const { connection } = useSignalR();
    const [listBooking, setListBooking] = useState([]);
    const [accessToken, setAccessToken] = useState("");

    //lấy thông tin người dùng từ storage
    useEffect(() => {
        const storedAccId = localStorage.getItem("accId") || sessionStorage.getItem("accId");
        const storedAccesstoken = localStorage.getItem("accessToken");
        if (storedAccId) {
            setAccessToken(storedAccesstoken);
        }
    }, []);

    useEffect(() => {
        if (!accessToken) return;

        const fetchListBooking = async () => {
            try {
                const response = await instance.get("/api/booking-service/farmer-all-booking",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                console.log(response.data.data)
                if (response.status === 200) {
                    setListBooking(response.data.data)
                }
            } catch (error) {
                console.log("cannot get list booking " + error)
            }
        }

        fetchListBooking();
    }, [accessToken])

    const handleCancelBooking = async (bookingId) => {
        if (!accessToken) {
            toast.error("Token is missing, cannot cancel");
            return;
        }

        try {
            const response = await instance.put(`/api/booking-service/cancel-booking/${bookingId}`,
                {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (response.status === 200) {
                toast.success("Cancel booking service successfully")
            }
        } catch (error) {
            console.log(error)
            console.log(error.response)
            toast.error("Cannot cancel booking service")
        }
    }

    useEffect(() => {
        if (!hubConnection) return;
        const handleBookingCancelled = (bookingId, status) => {

            setListBooking(
                prevList => {
                    const updatedList = prevList.map(b =>
                        b.booking?.bookingServiceId === bookingId
                            ? {
                                ...b,
                                booking: {
                                    ...b.booking,
                                    bookingServiceStatus: status
                                }
                            }
                            : b
                    );

                    console.log("📋 updatedList sau khi cập nhật:", updatedList);

                    return updatedList;
                });

            // toast.info(`Booking ${bookingId} was ${status}`);
        };

        hubConnection.on("ReceiveBookingStatusChanged", handleBookingCancelled);
        console.log("✅ Registered SignalR handler for ReceiveBookingStatusChanged");

        return () => {
            hubConnection.off("ReceiveBookingStatusChanged", handleBookingCancelled);
        };
    }, [hubConnection]);

    return (
        <div className="ListRequestBookingFarmer">
            <div class="progress-managment pt-36">
                <div class="progress-managment-container flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[23px] px-2">
                    <MenuProgressFarmer inPage="booking" />
                    <div class="list-progress-section w-full xl:w-[831px] max-w-[831px]">
                        {/* FILTER */}
                        <div class="status-nav-container w-full">
                            <div class="status-progress-nav w-full">
                                <div class="status-all w-[12.15%]">
                                    <div class="text-2">All</div>
                                </div>
                                <div class="status-uncompleted w-[21.5%]">
                                    <div class="text-2">Pending</div>
                                </div>
                                <div class="status-completed w-[17.8%]">
                                    <div class="text-2">Accept</div>
                                </div>
                                <div class="status-need-info w-[17.8%]">
                                    <div class="text-2">Reject</div>
                                </div>
                            </div>
                        </div>

                        {/* SEARCH  */}
                        <div class="search-progress-container mt-[13px] h-10">
                            <div class="search-bar w-full h-full">
                                <div class="search-bar relative w-full h-full flex items-center">
                                    <img class="material-symbols-2 pl-4" src={searchIcon} alt="search icon" />
                                    <input type="text" class="search-input w-[38.5%]" placeholder="Search based on service name, expert name, or booking ID" />
                                </div>
                            </div>
                        </div>

                        <div class="progress-list-container mt-[26px] flex flex-col gap-10">
                            {Array.isArray(listBooking) && listBooking.length > 0 ? (
                                listBooking.map((booking, index) => (
                                    <div key={booking.booking.bookingServiceId || index} class="progress-card w-full">
                                        <div class="header-progress-section flex flex-col sm:flex-row justify-between">
                                            <div class="infor-progress-section">
                                                <div class="info-1">
                                                    <div class="text-progress-info-1">ID Booking:</div>
                                                    <div class="text-progress-id">{booking.booking.bookingServiceId}</div>
                                                </div>
                                                <div class="info-1">
                                                    <div class="text-progress-info-1">Expert: </div>
                                                    <div class="text-progress-p-1">{booking.account.fullName}</div>
                                                </div>
                                                <div class="date-info">
                                                    <div class="text-progress-info-1">Booking at:</div>
                                                    <div class="text-progress-p-1">{booking.booking.bookingServiceAt}</div>
                                                </div>
                                                <div class="info-1">
                                                    <div class="text-progress-info-1">Service name:</div>
                                                    <div class="text-progress-p-1">{booking.service.serviceName}</div>
                                                </div>
                                            </div>
                                            {booking.booking.bookingServiceStatus === "Pending" && (
                                                <div class="status-info-uncompleted max-h-[30px] mt-4 sm:mt-0">
                                                    <div class="text-uncompleted-a-need">Pending</div>
                                                </div>
                                            )}

                                            {booking.booking.bookingServiceStatus === "Accepted" && (
                                                <div className="status-info-completed max-h-[30px] mt-4 sm:mt-0">
                                                    <div className="text-completed">Accepted</div>
                                                </div>
                                            )}

                                            {booking.booking.bookingServiceStatus === "Paid" && (
                                                <div className="status-info-completed max-h-[30px] mt-4 sm:mt-0">
                                                    <div className="text-completed">Paid</div>
                                                </div>
                                            )}

                                            {booking.booking.bookingServiceStatus === "Rejected" && (
                                                <div className="status-info-uncompleted max-h-[30px] mt-4 sm:mt-0">
                                                    <div className="text-uncompleted-a-need">Rejected</div>
                                                </div>
                                            )}

                                            {booking.booking.bookingServiceStatus === "Cancel" && (
                                                <div className="status-info-uncompleted max-h-[30px] mt-4 sm:mt-0">
                                                    <div className="text-uncompleted-a-need">Cancelled</div>
                                                </div>
                                            )}
                                        </div>

                                        <div class="footer-booking-card">
                                            <div className="footer-wrapper">

                                                {booking.booking.bookingServiceStatus === "Pending" && (
                                                    <div class="footer-booking-button" onClick={() => handleCancelBooking(booking.booking.bookingServiceId)}>
                                                        <div class="progress-button-text">Cancel</div>
                                                    </div>
                                                )}

                                                {booking.booking.bookingServiceStatus === "Accepted" && (
                                                    <div class="footer-booking-button">
                                                        <div class="progress-button-text">Payment</div>
                                                    </div>
                                                )}

                                                <div class="footer-booking-price">
                                                    <div class="total-price">
                                                        TOTAL: <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(booking.booking.price)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 mt-4">No bookings found.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default ListRequestBookingFarmer;