import { useState } from "react";
import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
import ListExpertPayout from "../../components/PaymentManagement/ListExpertPayout";
import ListPayment from "../../components/PaymentManagement/ListPayment";

const PaymentManagementPage = () => {
    const [viewMode, setViewMode] = useState("PaymentRequest");

    const handleViewChange = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar bên trái */}
            <SidebarDashboard />
            <div className="p-8 w-full bg-[#3DB3FB]/5">
                <div className="text-left mb-5 font-semibold flex items-center gap-2 text-[#3E3F5E]/25">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.52734 13V8.5H9.52734V13H13.2773V7H15.5273L8.02734 0.25L0.527344 7H2.77734V13H6.52734Z" fill="rgba(62, 63, 94, 0.25)" />
                    </svg>
                    <span>HOME / Payment</span>
                </div>

                <div className="justify-between flex flex-row">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-500 mb-6 text-left">
                            PAYMENT MANAGEMENT
                        </h1>
                        <div className="flex border-b border-gray-300 mb-6">
                            {viewMode === "PaymentRequest" ? (
                                <>
                                    <button className="mr-6 pb-2 border-b-2 border-blue-400 text-blue-500 font-semibold px-5">All</button>
                                    <button className="mr-6 pb-2 text-gray-400">Deposit</button>
                                    <button className="mr-6 pb-2 text-gray-400">Remaining payment</button>
                                </>
                            ) : (
                                <>
                                    <button className="mr-6 pb-2 border-b-2 border-blue-400 text-blue-500 font-semibold px-5">All</button>
                                    <button className="mr-6 pb-2 text-gray-400">Paid</button>
                                    <button className="mr-6 pb-2 text-gray-400">Repayment</button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 justify-end text-left gap-2 w-72">
                        <button
                            onClick={() => handleViewChange("PaymentRequest")}
                            className={`font-semibold p-3 ${viewMode === "PaymentRequest" ? "text-[#3DB3FB] bg-white" : "text-[#3E3F5E]/25"}`}
                        >
                            Payment request
                        </button>
                        <button
                            onClick={() => handleViewChange("ExpertPayout")}
                            className={`font-semibold p-3 ${viewMode === "ExpertPayout" ? "text-[#3DB3FB] bg-white" : "text-[#3E3F5E]/25"}`}
                        >
                            Expert Payout
                        </button>
                    </div>
                </div>

                {/* Conditional Rendering based on viewMode */}
                {viewMode === "PaymentRequest" ? <ListPayment /> : <ListExpertPayout />}
            </div>
        </div>
    );
};

export default PaymentManagementPage;