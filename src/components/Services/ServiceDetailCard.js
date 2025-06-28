import React from 'react';
import FriendActionButton from '../Friend/FriendActionButton';
import serviceBg from "../../assets/images/service_thumb.png";
import { root } from 'postcss';
const expert = {
    name: "Phuong Nam",
    status: null,
    roleId: "expert"
};

const ServiceDetailCard = ({ data }) => {
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
    } = data;

    console.log('')

    const renderStars = (rating) => {
        const filled = Math.floor(rating || 0);
        const stars = [];
        for (let i = 0; i < filled; i++) stars.push(<span key={`filled-${i}`} className="text-xl">★</span>);
        for (let i = filled; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-xl text-gray-400">★</span>);
        return stars;
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <div className="grid items-start gap-5 md:grid-cols-[3fr_2fr]">
                <div className="order-2 w-full md:order-1">
                    <div className="flex items-center space-x-1 text-yellow-400">
                        {/* {[...Array(4)].map((_, i) => <span key={i} className='text-xl'>★</span>)}
                        <span className="text-xl text-gray-400">★</span> */}
                        {renderStars(averageRate)}
                        <span className='px-4 text-sm text-white bg-yellow-400 rounded-sm'>{averageRate?.toFixed(1) || 0}</span>
                    </div>
                    <div className='flex flex-col md:flex-row md:justify-between'>
                        <h2 className="text-2xl font-bold">{serviceName}</h2>
                        <div className=''>
                            <span className="text-2xl font-bold text-[#3DB3FB]">{price?.toLocaleString()} VND </span>
                            {/* <span className="text-sm text-gray-400 line-through"> 300.000 VND</span> */}
                        </div>
                    </div>

                    <div className='flex justify-between py-8'>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            {/* <img src="https://i.pravatar.cc/30" className="w-12 h-12 rounded-full" alt="Instructor" /> */}
                            <img 
                                src={fullName ? avatar || "https://i.pravatar.cc/30" : "https://i.pravatar.cc/30"} 
                                className="w-12 h-12 rounded-full" 
                                alt="Instructor" 
                            />
                            <div>
                                <p className='text-lg font-bold'>{fullName}</p>
                                <p>Last Update: {new Date(updateAt ?? createAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div>
                            <FriendActionButton status={expert.status} roleId={expert.roleId} />
                        </div>
                    </div>

                    <div>
                        <div className="font-bold"> Description:
                            <p className='py-3 font-normal'>
                                {serviceDescription}
                            </p>
                        </div>
                    </div>

                    <div className='pt-6'>
                        <p className='font-bold'>Categories: </p>
                        <div className='flex flex-wrap gap-3 pt-3'>
                            <span className="px-4 py-2 text-sm bg-[#3DB3FB]/25 rounded font-bold">{categoryName}</span>
                            {/* <span className="px-4 py-2 text-sm bg-[#3DB3FB]/25 rounded font-bold">Web</span>
                            <span className="px-4 py-2 text-sm bg-[#3DB3FB]/25 rounded font-bold">Backend Developer</span>
                            <span className="px-4 py-2 text-sm bg-[#3DB3FB]/25 rounded font-bold">Applications</span> */}
                        </div>
                    </div>
                </div>
                <div className="order-1 w-full space-y-3 text-center md:order-2">
                    <img 
                        src={imageUrl && imageUrl.trim() !== "" ? imageUrl : serviceBg} 
                        className="w-full mx-auto rounded-lg h-[200px] object-cover" 
                        alt="Service" 
                    />
                    <button className="p-3 px-8 text-white bg-[#3DB3FB] rounded-full">Click to Booking</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailCard;
