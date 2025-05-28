import React from "react";

const YourGroupCard = () => {
  return (
    <div className="w-[953px]">
      <div className="w-[28%] h-[24rem] shadow-md relative rounded-md">
        
        <div className="h-[58%] w-full ">
        <img
            className=" w-full h-full object-fill rounded-ss-md rounded-se-md"
            src={
              "https://i.pinimg.com/originals/d0/28/68/d0286806706a508645e8763c6b3f8cea.jpg"
            }
            alt="avatar"
          />
        </div>
        <div className="absolute top-[50%] left-4">
        <img
            className="rounded-full w-[60px] h-[60px] object-fill "
            src={
              
              "https://i.pinimg.com/originals/d0/28/68/d0286806706a508645e8763c6b3f8cea.jpg"
            }
            alt="avatar"
          />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#5596E6] flex justify-end pt-2 pr-3">Members: 100</p>
          <p className="font-bold text-base text-[#393A4F] text-left pl-3 pt-3">The Family Farm for agriculture around the world</p>
          <div className="mt-7 flex gap-5 justify-center">
            <button>Leave</button>
            <button>View Group</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourGroupCard;
