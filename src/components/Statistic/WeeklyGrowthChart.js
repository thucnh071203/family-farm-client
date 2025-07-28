import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const WeeklyGrowthChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWeeklyGrowth = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7280/api/statistic/weekly-growth"
        );
        const formattedData = Object.entries(response.data).map(
          ([week, count]) => ({
            week,
            count,
          })
        );
        setData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tăng trưởng lịch:", error);
      }
    };

    fetchWeeklyGrowth();
  }, []);

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-lg font-semibold text-blue-700 mb-2">
        📈 Tăng trưởng lịch hẹn theo tuần
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="week" angle={-30} textAnchor="end" height={60} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" barSize={30} fill="#4F46E5" name="Số lịch hẹn" />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 5 }}
            name="Tăng trưởng"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyGrowthChart;
