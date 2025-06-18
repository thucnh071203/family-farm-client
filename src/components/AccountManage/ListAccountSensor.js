import React from "react";

const ListAccountSensor = () => {
  return (
    <div className="ml-7 mt-8">
      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-8">ACCOUNT SENSOR</h1>
      <div className="flex space-x-6 mt-2 text-sm text-black-500 font-bold text-center ">
        <button className="w-[10%] hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB]">
          All
        </button>
        <button className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%]">
          Sensored
        </button>
        <button className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%] ">
          Uncensored
        </button>
      </div>
    </div>
  );
};

export default ListAccountSensor;
