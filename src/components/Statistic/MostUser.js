import React, { useState } from "react";
import axios from "axios";

const StatisticPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const formatDateForAPI = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleFetch = async () => {
    if (!startDate || !endDate) {
      setError("Vui lòng nhập cả hai ngày");
      return;
    }

    const formattedStart = formatDateForAPI(startDate);
    const formattedEnd = formatDateForAPI(endDate);

    try {
      const res = await axios.get(
        "https://localhost:7280/api/statistic/most-active-members",
        {
          params: {
            startDate: formattedStart,
            endDate: formattedEnd,
          },
          withCredentials: true,
        }
      );
      setData(res.data);
      setError("");
    } catch (err) {
      console.error("❌ Lỗi gọi API:", err);
      setError(
        "Không thể lấy dữ liệu. Vui lòng kiểm tra API hoặc định dạng ngày."
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        📊 Thống kê thành viên hoạt động
      </h2>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1">Ngày bắt đầu:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Ngày kết thúc:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleFetch}
          className="bg-blue-500 text-white px-4 py-2 rounded h-fit mt-6"
        >
          Lấy dữ liệu
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {data.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.accId}>
                <td className="border p-2">{item.accountName}</td>
                <td className="border p-2">{item.roleName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StatisticPage;
