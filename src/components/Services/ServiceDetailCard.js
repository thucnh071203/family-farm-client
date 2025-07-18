import React from "react";
import FriendActionButton from "../Friend/FriendActionButton";
import serviceBg from "../../assets/images/service_thumb.png";

const expert = {
    name: "Phuong Nam",
    status: null,
    roleId: "expert"
};

const ServiceDetailCard = ({ data, summary }) => {
    const {
        serviceName,
        serviceDescription,
        price,
        imageUrl,
        averageRate,
        rateCount,
        createAt,
        updateAt,
        fullName,
        avatar,
        categoryName
    } = data || {};

    // Xử lý dữ liệu tóm tắt đánh giá
    const defaultSummary = {
        averageRating: 0,
        ratingCounts: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
    };
    const { averageRating = 0, ratingCounts = defaultSummary.ratingCounts } = summary || defaultSummary;
    const totalRatings = Object.values(ratingCounts).reduce((acc, count) => acc + count, 0);

    // ✅ giữ lại 0 nếu có, tránh fallback sang 5.0
    const ratingValue = averageRating ?? averageRate ?? 0;

    // ⭐ Render sao
    const renderStars = (rating) => {
        const filled = Math.floor(rating || 0);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span
                    key={`star-${i}`}
                    className={`text-xl ${i < filled && rating > 0 ? "text-yellow-400" : "text-gray-400"}`}
                >
                    ★
                </span>
            );
        }
        return stars;
    };


    return (
        <div className="p-6 bg-white rounded shadow-md border border-solid border-gray-300">
            <div className="grid items-start gap-5 md:grid-cols-[3fr_2fr]">
                <div className="order-2 w-full md:order-1">
                    <div className="flex items-center space-x-1">
                        {renderStars(ratingValue)}
                        <span className="px-4 text-sm text-white bg-yellow-400 rounded-sm">
                            {ratingValue.toFixed(1)} ({totalRatings} feedbacks)
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <h2 className="text-2xl font-bold">{serviceName || "Không có tên dịch vụ"}</h2>
                        <div>
                            <span className="text-2xl font-bold text-[#3DB3FB]">
                                {price?.toLocaleString() || "N/A"} VND
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between py-8">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <img
                                src={avatar || "https://i.pravatar.cc/30"}
                                className="w-12 h-12 rounded-full"
                                alt="Instructor"
                            />
                            <div>
                                <p className="text-lg font-bold">{fullName || "Unknown Expert"}</p>
                                <p>
                                    Lasted Update: {new Date(updateAt ?? createAt).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div>
                            <FriendActionButton status={expert.status} roleId={expert.roleId} />
                        </div>
                    </div>

                    <div>
                        <div className="font-bold">
                            Description:
                            <p className="py-3 font-normal">{serviceDescription || "No description"}</p>
                        </div>
                    </div>

                    <div className="pt-6">
                        <p className="font-bold">Categories:</p>
                        <div className="flex flex-wrap gap-3 pt-3">
                            <span className="px-4 py-2 text-sm bg-[#3DB3FB]/25 rounded font-bold">
                                {categoryName || "No categories"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="order-1 w-full space-y-3 text-center md:order-2">
                    <img
                        src={imageUrl && imageUrl.trim() !== "" ? imageUrl : serviceBg}
                        className="w-full mx-auto rounded-lg h-[200px] object-cover"
                        alt="Service"
                    />
                    <button className="p-3 px-8 text-white bg-[#3DB3FB] rounded-full">Đặt dịch vụ</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailCard;