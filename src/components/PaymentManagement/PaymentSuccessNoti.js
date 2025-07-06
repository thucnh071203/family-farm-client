import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PaymentSuccessNoti() {
    const navigate = useNavigate();
    
    return (
        <div className="payment-successfully pt-[184px]">
            <div className="successful-container mx-auto w-full h-auto max-w-[957px]">
                <div className="heade-container">
                    <div className="title-container flex flex-row items-center justify-center gap-6">
                        <div className="success-icon w-[80px] h-[80px] bg-[#3DB3FB] flex justify-center items-center rounded-full">
                            <i className="fa-solid fa-check text-[32px] text-white" />
                        </div>
                        <div className="success-title font-roboto font-bold text-[#3db3fb] text-[40px] tracking-[1.68px] leading-none whitespace-nowrap">
                            PAYMENT SUCCESSFULLY
                        </div>
                    </div>

                    <div className="subtitle-container mt-8">
                        <p className="font-roboto font-bold text-[#3e3f5e] text-[24px] tracking-[0.96px] leading-none text-center">
                            Thank You! Your payment has been received.
                        </p>
                    </div>

                    <div className="detail-title-container mt-8">
                        <p className="font-roboto font-normal text-[#3e3f5e] text-[24px] tracking-[0.96px] leading-none whitespace-nowrap text-center">
                            Payment Details
                        </p>
                    </div>
                </div>

                <div className="body-container mt-4 p-8 flex flex-row justify-between rounded-md shadow-lg">
                    <div className="payment-detail-container">
                        <div className="left-container space-y-6">
                            <div className="bookingId-container">
                                <span className="font-roboto font-bold text-[#3e3f5e] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                    Booking ID:
                                </span>{' '}
                                <span className="font-roboto font-normal text-[#3e3f5e] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                    685e40209e0142f48130a07b
                                </span>
                            </div>

                            <div className="total-container text-start">
                                <span className="font-roboto font-bold text-[#3e3f5e] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                    Total:
                                </span>{' '}
                                <span>
                                    <span className="font-roboto font-normal text-[#3e3f5e] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                        200.000
                                    </span>{' '}
                                    <span className="font-roboto font-bold text-[#ef3e36] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                        VND
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="right-container space-y-6">
                        <div className="paymentId-container">
                            <span className="font-roboto font-bold text-[#3e3f5e] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                Payment ID:
                            </span>{' '}
                            <span className="font-roboto font-normal text-[#3e3f5e] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                685e40209e0142f48130a07b
                            </span>
                        </div>

                        <div className="price-of-service text-start">
                            <span className="font-roboto font-bold text-[#3e3f5e] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                Price of Service:
                            </span>{' '}
                            <span>
                                <span className="font-roboto font-normal text-[#3e3f5e] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                    200.000
                                </span>{' '}
                                <span className="font-roboto font-bold text-[#ef3e36] text-[18px] tracking-[0.72px] leading-none whitespace-nowrap">
                                    VND
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="footer-container flex flex-row justify-center mt-6">
                    <Link to="/" href="#" className="back-home py-[14px] px-[40px] font-roboto font-normal text-[#3DB3FB] text-[18px] tracking-[0.72px] leading-normal whitespace-nowrap hover:bg-slate-200 cursor-pointer">
                        Back to Home Page
                    </Link>
                    <Link to="/HomeProcessFarmer" href="#" className="continue bg-[#3DB3FB] py-[14px] px-[73px] font-roboto font-normal text-white text-[18px] tracking-[0.72px] leading-normal whitespace-nowrap hover:bg-[#199FEF] cursor-pointer">
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    )
}