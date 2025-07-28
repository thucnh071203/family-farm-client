import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/DashboardCom/Sidebar";
import axios from "axios";
import Sidebar from "../../components/Statistic/MostUser";
import MostUser from "../../components/Statistic/MostUser";
import UserGrowthChart from "../../components/Statistic/UserGrowthChart";
import MapChart from "../../components/Statistic/MapChart";

const StatisticPage = () => {
  const [counts, setCounts] = useState({
    Farmer: 0,
    Expert: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoleCounts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7280/api/statistic/count-by-role"
        );

        const roleData = response.data.data;

        setCounts({
          Farmer: roleData.FARMER || 0,
          Expert: roleData.EXPERT || 0,
        });
      } catch (err) {
        console.error("Failed to fetch role counts:", err);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchRoleCounts();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading data...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex">
      {/* Nội dung bên phải */}
      <div className=" bg-blue-50 p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 h-28 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Farmer</p>
              <h2 className="text-xl font-bold text-blue-700">
                {" "}
                {counts.Farmer.toLocaleString()}
              </h2>
            </div>
            <div className="text-3xl text-blue-500">👤</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 h-28 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Expert</p>
              <h2 className="text-xl font-bold text-blue-700">
                {" "}
                {counts.Expert.toLocaleString()}
              </h2>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Cột bên trái */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow p-2 h-max w-max">
              <UserGrowthChart />
            </div>
            <div className="bg-white rounded-xl shadow p-4 h-[400px]">
              <MostUser />
            </div>
          </div>

          {/* Cột bên phải */}
          <div className="bg-white rounded-xl shadow p-4 h-[800px]">
            <MapChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
