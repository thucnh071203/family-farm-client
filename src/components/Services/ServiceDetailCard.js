import React from 'react';
import FriendActionButton from '../Friend/FriendActionButton';
import { root } from 'postcss';
const expert = {
    name: "Phuong Nam",
    status: null,
    roleId: "expert"
};

const ServiceDetailCard = () => {
    return (
        <div className="p-6 bg-white rounded shadow-md">
            <div className="grid items-start gap-5 md:grid-cols-[3fr_2fr]">
                <div className="order-2 w-full md:order-1">
                    <div className="flex items-center space-x-1 text-yellow-400">
                        {[...Array(4)].map((_, i) => <span key={i} className='text-xl'>★</span>)}
                        <span className="text-xl text-gray-400">★</span>
                        <span className='px-4 text-sm text-white bg-yellow-400 rounded-sm'>4</span>
                    </div>
                    <div className='flex flex-col md:flex-row md:justify-between'>
                        <h2 className="text-2xl font-bold">LEARN BASIC JAVA SCRIPTS</h2>
                        <div className=''>
                            <span className="text-2xl font-bold text-blue-600">250.000 VND </span>
                            <span className="text-sm text-gray-400 line-through"> 300.000 VND</span>
                        </div>
                    </div>

                    <div className='flex justify-between py-8'>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <img src="https://i.pravatar.cc/30" className="w-12 h-12 rounded-full" alt="Instructor" />
                            <div>
                                <p className='text-lg font-bold'>{expert.name}</p>
                                <p>Last Update: 25/12/2024</p>
                            </div>
                        </div>
                        <div>
                            <FriendActionButton status={expert.status} roleId={expert.roleId} />
                        </div>
                    </div>

                    <div>
                        <p className="font-bold"> Description:
                            <p className='py-3 font-normal'>
                                Đây là mô tả khóa học. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Đây là mô tả khóa học. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Đây là mô tả khóa học. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Đây là mô tả khóa học. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </p>
                    </div>

                    <div className='pt-6'>
                        <p className='font-bold'>Categories: </p>
                        <div className='flex flex-wrap gap-3 pt-3'>
                            <span className="px-4 py-2 text-sm bg-gray-100 rounded">Web</span>
                            <span className="px-4 py-2 text-sm bg-gray-100 rounded">Backend Developer</span>
                            <span className="px-4 py-2 text-sm bg-gray-100 rounded">Applications</span>
                        </div>
                    </div>
                </div>
                <div className="order-1 w-full space-y-3 text-center md:order-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNl6ByXPYWepPI7KOWpK9sW6RGfz8eH-DCJeGi3R1vhhO9_kzslj3e2rCxEbh52glj6GM&usqp=CAU" className="w-full mx-auto rounded-lg h-[200px] object-cover" alt="React Logo" />
                    <button className="p-3 px-8 text-white bg-blue-500 rounded-full">Click to Booking</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailCard;
