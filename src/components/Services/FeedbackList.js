import React from 'react';

const feedbacks = [
    {
        name: 'Phuong Nam',
        city: "An Giang",
        content: 'Rất hữu ích! Tôi đã học được rất nhiều từ khoá học này.',
        rateAt: "Aug, 27 2025",
        stars: 5
    },
    {
        name: 'Phuong Nam',
        city: "An Giang",
        content: 'Khoá học khá cơ bản, nhưng phù hợp với người mới bắt đầu.',
        rateAt: "Aug, 27 2025",
        stars: 4
    },
    {
        name: 'Phuong Nam',
        city: "An Giang",
        content: 'Giảng viên giảng dễ hiểu, có nhiều ví dụ thực tế.',
        rateAt: "Aug, 27 2025",
        stars: 4
    }
];

const FeedbackList = () => {
    return (
        <div className="p-6 mt-5 bg-white rounded shadow-md">
            <h3 className="mb-4 text-lg font-semibold">FEEDBACK: {feedbacks.length}</h3>
            {feedbacks.map((fb) => (
                <div className="flex gap-3 mt-5">
                    <div className="flex items-start">
                        <img src="https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png" className="h-auto rounded-full w-14" alt="User" />
                    </div>
                    <div className="flex flex-col w-full p-4 bg-gray-100 border rounded-lg mt-2l">
                        <div className="flex items-start justify-between pb-2">
                            <div>
                                <p className="font-semibold">{fb.name}</p>
                                <p className="text-sm text-blue-500">{fb.city}</p>
                                <p className="text-sm text-blue-500">Rate at <span className='text-gray-500'> {fb.rateAt} </span></p>
                            </div>

                            <div>
                                {[...Array(fb.stars)].map((_, i) => <span key={i} className="text-xl text-yellow-500">★</span>)}
                                {[...Array(5 - fb.stars)].map((_, i) => <span key={i} className="text-xl text-gray-300">★</span>)}
                            </div>
                        </div>
                        <p className="py-3 mt-1 text-gray-900">{fb.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedbackList;
