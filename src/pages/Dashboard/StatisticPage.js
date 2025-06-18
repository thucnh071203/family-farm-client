import React from "react";
// import Sidebar from "../../components/DashboardCom/Sidebar";
import Sidebar from "../../components/Statistic/MostUser";
import MostUser from "../../components/Statistic/MostUser";
import UserGrowthChart from "../../components/Statistic/UserGrowthChart";
import MapChart from "../../components/Statistic/MapChart";

const StatisticPage = () => {
  return (
    <div className="flex">
      {/* Nội dung bên phải */}
      <div className=" bg-blue-50 p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 h-28 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="text-xl font-bold text-blue-700">1,234</h2>
            </div>
            <div className="text-3xl text-blue-500">👤</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 h-28 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Booking</p>
              <h2 className="text-xl font-bold text-blue-700">567</h2>
            </div>
            <div className="text-3xl text-green-500">📅</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 h-28 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Posts</p>
              <h2 className="text-xl font-bold text-blue-700">890</h2>
            </div>
            <div className="text-3xl text-purple-500">📝</div>
          </div>
        </div>

        {/* Chart + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* <div className="bg-white rounded-xl shadow p-4 h-[300px] lg:col-span-2">
            <div className="text-gray-400 italic text-center mt-24">
              MapChart Placeholder
            </div>
          </div> */}
          <div className="bg-white rounded-xl shadow p-2 h-max w-max">
            <UserGrowthChart />
          </div>
          <div className="bg-white rounded-xl shadow p-4 h-[250px]">
            <MostUser />
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="bg-white rounded-xl shadow p-4 h-[400px] w">
            <div className="text-gray-400 italic text-center">
              <MapChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
