import React from 'react';

const FeedbackSummary = () => {
    // Giả lập phần trăm đánh giá
    const ratings = [
        { star: 5, percent: 50 },
        { star: 4, percent: 20 },
        { star: 3, percent: 15 },
        { star: 2, percent: 10 },
        { star: 1, percent: 5 },
    ];

    // Tính tổng điểm trung bình: nhân mỗi số sao với phần trăm người đánh giá sao đó
    const totalScore = ratings.reduce((acc, r) => acc + r.star * r.percent, 0);
    // Tính tổng phần trăm
    const totalPercent = ratings.reduce((acc, r) => acc + r.percent, 0);
    // Tính điểm trung bình
    const average = (totalScore / totalPercent).toFixed(1);

    return (
        <div className="p-6 mt-6 bg-white rounded shadow-md">
            <div className='flex items-center justify-between mb-5'>
                <h3 className="text-lg font-semibold">FEEDBACK SUMMARY</h3>
                <p className="text-center text-gray-700">
                    Average: <span className="font-semibold text-blue-600">{average}/5</span>
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="w-full space-y-2">
                    {ratings.map((rating, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <div className="w-full h-3 bg-gray-200 rounded">
                                <div className="h-3 bg-red-500 rounded-sm"
                                    style={{ width: `${rating.percent}%` }}></div>
                            </div>
                            <span className="font-mono text-yellow-500">
                                {[...Array(5)].map((_, index) =>
                                    index < rating.star ? (
                                        <span key={index} className="text-xl">★</span>
                                    ) : (
                                        <span key={index} className="text-xl text-gray-300">★</span>
                                    )
                                )}
                            </span>
                            <span className="w-10 text-sm text-left text-gray-500">
                                {rating.percent}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedbackSummary;
