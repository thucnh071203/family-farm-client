import React from "react";
import { Link } from "react-router-dom";

// Dữ liệu mẫu từ API
const processData = {
    expertId: "expert123",
    farmerId: "farmer456",
    serviceId: "service789",
    bookingServiceId: "booking101",
    processTittle: "SUPPORT REACTJS TUTORIALS",
    description: "Hướng dẫn cơ bản về ReactJS cho người mới bắt đầu",
    numberOfSteps: 3,
    continueStep: 2,
    processStatus: "IN_PROGRESS",
    isCompletedByExpert: false,
    isCompletedByFarmer: true,
    steps: [
        {
            stepNumber: 1,
            title: "How to download environment",
            isCompleted: true,
        },
        {
            stepNumber: 2,
            title: "Introduction",
            isCompleted: true,
        },
        {
            stepNumber: 3,
            title: "What is variables?",
            isCompleted: false,
        },
    ],
};

const ProcessSteps = () => {
    return (
        <div className="w-full">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNl6ByXPYWepPI7KOWpK9sW6RGfz8eH-DCJeGi3R1vhhO9_kzslj3e2rCxEbh52glj6GM&usqp=CAU"
                alt=""
                className="object-cover w-full h-44 rounded-xl"
            />
            <h2 className="py-4 mb-4 text-xl font-bold">{processData.processTittle}</h2>
            <h2 className="mb-4 text-lg font-semibold">Progress Steps:</h2>
            <div className="space-y-4">
                {processData.steps.map((step) => (
                    <Link key={step.stepNumber} to="">
                        <button
                            className={`flex items-center w-full px-4 py-4 text-left transition ${step.isCompleted
                                ? "bg-[#3DB3FB]/25 hover:bg-blue-200 border-l-2 border-[#3DB3FB]"
                                : "hover:bg-blue-200"
                                }`} >
                            <i
                                className={`w-6 ${step.isCompleted ? "fa-solid fa-circle-check text-[#3DB3FB]" : ""
                                    }`}
                            ></i>
                            <span className="text-sm">
                                Step {step.stepNumber}: {step.title}
                            </span>
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProcessSteps;