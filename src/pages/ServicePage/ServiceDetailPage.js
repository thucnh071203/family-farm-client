import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import NavbarHeader from "../../components/Header/NavbarHeader";
import ServiceDetailCard from "../../components/Services/ServiceDetailCard";
import FeedbackSummary from "../../components/Services/FeedbackSummary";
import FeedbackList from "../../components/Services/FeedbackList";
import PopularService from "../../components/Services/PopularService";

const ServiceDetailPage = () => {
    return (
        <div className="ServicePage">
            <Header />
            <NavbarHeader />

            <div className="mx-auto max-w-7xl lg:pt-[140px] pt-[65px] text-left">
                <ServiceDetailCard />
                <div className="grid lg:grid-cols-[3fr_2fr] gap-5">
                    <div className="gap-5">
                        <FeedbackSummary />
                        <FeedbackList />
                    </div>
                    <div className="hidden pt-6 lg:block">
                        <PopularService />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;