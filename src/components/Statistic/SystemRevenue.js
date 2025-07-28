import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SystemRevenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalCommission: 0,
    totalBookings: 0,
  });

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchRevenue = async () => {
    try {
      let url = "https://localhost:7280/api/statistic/system";

      const params = [];
      if (fromDate) params.push(`from=${fromDate}`);
      if (toDate) params.push(`to=${toDate}`);
      if (params.length > 0) url += `?${params.join("&")}`;

      const res = await axios.get(url);
      const data = res.data;

      const chartData = Object.keys(data.revenueByMonth).map((month) => ({
        month,
        Revenue: data.revenueByMonth[month],
      }));

      setRevenueData(chartData);
      setSummary({
        totalRevenue: data.totalRevenue,
        totalCommission: data.totalCommission,
        totalBookings: data.totalBookings,
      });
    } catch (err) {
      console.error("Error fetching system revenue:", err);
    }
  };

  useEffect(() => {
    fetchRevenue(); // load lần đầu
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        System Revenue Overview
      </h2>

      <div className="flex justify-center flex-col md:flex-row gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            From
          </label>
          <input
            type="date"
            className="border rounded p-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">To</label>
          <input
            type="date"
            className="border rounded p-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          onClick={fetchRevenue}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h3 className="text-lg font-bold text-blue-700">
            {summary.totalRevenue.toLocaleString()}₫
          </h3>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Profit</p>
          <h3 className="text-lg font-bold text-green-700">
            {summary.totalCommission.toLocaleString()}₫
          </h3>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h3 className="text-lg font-bold text-purple-700">
            {summary.totalBookings}
          </h3>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={revenueData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SystemRevenue;
