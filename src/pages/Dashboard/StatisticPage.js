import React, { useEffect, useState } from "react";
import axios from "axios";
import MostUser from "../../components/Statistic/MostUser";
import UserGrowthChart from "../../components/Statistic/UserGrowthChart";
import MapChart from "../../components/Statistic/MapChart";
import SystemRevenue from "../../components/Statistic/SystemRevenue";
import TopEngagedPosts from "../../components/Statistic/TopEngagedPosts";
import WeeklyGrowthChart from "../../components/Statistic/WeeklyGrowthChart";
import * as signalR from "@microsoft/signalr";
import CountUp from "react-countup";

const StatisticPage = () => {
  const [counts, setCounts] = useState({
    Farmer: 0,
    Expert: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPosts, setPostCount] = useState(0);

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

        const postResponse = await axios.get(
          "https://localhost:7280/api/statistic/totalPost"
        );
        const totalPosts = postResponse.data.totalPosts;

        setPostCount(totalPosts || 0);
      } catch (err) {
        console.error("Failed to fetch role counts:", err);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchRoleCounts();
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7280/topEngagedPostHub")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        console.log("✅ SignalR connected");

        connection.on("UpdateFarmerCount", (newFarmerCount) => {
          console.log(" Farmer count update:", newFarmerCount);
          setCounts((prev) => ({
            ...prev,
            Farmer: newFarmerCount,
          }));
        });

        connection.on("ExpertCountUpdate", (newExpertCount) => {
          console.log(" Expert count update:", newExpertCount);
          setCounts((prev) => ({
            ...prev,
            Expert: newExpertCount,
          }));
        });

        connection.on("NewPost", (newTotalPosts) => {
          console.log(" NewTotalPosts count update:", newTotalPosts);
          setPostCount(newTotalPosts);
        });
      })
      .catch((err) => {
        console.error(" SignalR connection failed:", err);
      });

    return () => {
      connection.stop();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-blue-500 mb-6 text-left">
        Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6 h-28 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Farmer</p>

            <h2 className="text-xl font-bold text-blue-700">
              <CountUp end={counts.Farmer} duration={1} separator="," />
            </h2>
          </div>
          <div className="text-3xl text-blue-500">👤</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 h-28 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Expert</p>

            <h2 className="text-xl font-bold text-blue-700">
              <CountUp end={counts.Expert} duration={1} separator="," />
            </h2>
          </div>
          <div className="text-3xl text-green-500">📅</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 h-28 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Posts</p>

            <h2 className="text-xl font-bold text-blue-700">
              <CountUp end={totalPosts} duration={1} separator="," />
            </h2>
          </div>
          <div className="text-3xl text-purple-500">📝</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow p-2 h-[400px]">
            <UserGrowthChart />
          </div>
          <div className="bg-white rounded-xl shadow p-4 h-[400px]">
            <MostUser />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 h-[800px]">
          <MapChart />
        </div>
        <div className="bg-white rounded-xl shadow p-4 h-[500px]">
          <TopEngagedPosts />
        </div>
        <div className="bg-white rounded-xl shadow p-4 h-[400px]">
          <WeeklyGrowthChart />
        </div>
      </div>
      <SystemRevenue />
    </div>
  );
};

export default StatisticPage;
