import React, { useEffect, useRef, useState } from "react";
import { toast, Bounce } from "react-toastify";

import * as signalR from "@microsoft/signalr";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const UserGrowthChart = () => {
  //   const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  //   const chartInstance = useRef(null);

  <Bar data={chartData} options={chartOptions} />;

  const fetchData = async () => {
    let url = "https://localhost:7280/api/statistic/user-growth";
    if (fromDate && toDate) {
      url += `?fromDate=${fromDate}&toDate=${toDate}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Không thể lấy dữ liệu");

      const result = await response.json();
      const data = result.data;

      if (!data || Object.keys(data).length === 0) {
        toast.info("Không có dữ liệu để hiển thị");

        return;
      }

      const labels = Object.keys(data);
      const values = Object.values(data);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of users",
            data: values,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
          },
        ],
      });

      setChartOptions({
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of users",
            },
          },
          x: {
            title: {
              display: true,
              text: "Day",
            },
          },
        },
      });
    } catch (error) {
      console.error("Lỗi khi load dữ liệu:", error);
      toast.error(
        "Lỗi khi tải dữ liệu. Kiểm tra console để biết thêm chi tiết."
      );
    }
  };

  useEffect(() => {
    fetchData();
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7280/topEngagedPostHub")
      .build();

    connection.on("UserRegistered", () => {
      console.log("Nhận sự kiện realtime");
      fetchData();
    });

    const startSignalR = async () => {
      try {
        await connection.start();
        console.log("SignalR kết nối thành công");
      } catch (err) {
        console.error("Kết nối SignalR thất bại:", err);
        setTimeout(startSignalR, 3000);
      }
    };

    startSignalR();
  }, []);

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold">User Growth</h1>

      <div className="w-full max-w-[700px] h-[300px]">
        {chartData && <Bar data={chartData} options={chartOptions} />}
      </div>

      <div className="flex flex-col md:flex-row items-center ml-24 gap-4">
        {/* //<div className="flex flex-col items-center gap-4 md:flex-row"> */}

        <div className="space-y-1">
          <label htmlFor="fromDate">From : </label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="toDate">To : </label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 mt-6 text-white transition rounded md:mt-0 hover:bg-lime-600 bg-lime-500"
          onClick={fetchData}
        >
          Load
        </button>
      </div>
    </div>
  );
};

export default UserGrowthChart;
