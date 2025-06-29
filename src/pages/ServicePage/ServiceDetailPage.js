import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import NavbarHeader from "../../components/Header/NavbarHeader";
import ServiceDetailCard from "../../components/Services/ServiceDetailCard";
import FeedbackSummary from "../../components/Services/FeedbackSummary";
import FeedbackList from "../../components/Services/FeedbackList";
import PopularService from "../../components/Services/PopularService";

const ServiceDetailPage = () => {
    const { id } = useParams();
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await instance.get(`/api/service/get-detail-by-id/${id}`);
                console.log("API Response:", res); // Kiểm tra phản hồi API
                if (res.data?.success && res.data.data) {
                    const serviceOnly = res.data.data;
                    if (serviceOnly) {
                        setServiceData(serviceOnly);
                        console.log("✔ Service:", serviceOnly);
                    } else {
                        console.error("❌ Không tìm thấy service trong kết quả");
                    }
                } else {
                    console.error("❌ Không có data hoặc sai định dạng");
                }
            } catch (error) {
                console.error("❌ Lỗi gọi API:", error);
            } finally {
                setLoading(false); // ✅ ĐẢM BẢO loading được tắt dù có lỗi hay không
            }
        };

        fetchService();
    }, [id]);

    useEffect(() => {
        if (serviceData) {
            console.log("Updated serviceData:", serviceData);
        }
    }, [serviceData]);

    if (loading) return <p className="pt-24 text-center">Đang tải dịch vụ...</p>;
    if (!serviceData) return <p className="pt-24 text-center">Không tìm thấy dịch vụ</p>;

    return (
        <div className="ServicePage">
            <Header />
            <NavbarHeader />

            <div className="mx-auto max-w-7xl lg:pt-[140px] pt-[65px] text-left">
                <ServiceDetailCard data={serviceData} />
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