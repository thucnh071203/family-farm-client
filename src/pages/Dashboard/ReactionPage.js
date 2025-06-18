import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReactionPage = () => {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReactions = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        "https://localhost:7280/api/category-reaction/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReactions(res.data.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReactions();
  }, []);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="text-sm text-gray-400">HOME / Category post</div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-sky-500">REACTION MANAGEMENT</h1>
        <Link to="/CreateReactionPage">
          <button className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 text-sm">
            New Reaction
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b text-sm mb-2">
        <div className="px-4 py-2 border-b-2 border-sky-500 font-medium text-sky-500">
          All
        </div>
        <div className="px-4 py-2 text-gray-400 cursor-not-allowed">
          Analytics
        </div>
        <div className="ml-auto px-4 py-2">
          <input
            type="text"
            placeholder="Search question..."
            className="px-2 py-1 border rounded text-sm"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-sky-100 text-left text-gray-700">
              <tr>
                <th className=" px-4 py-2">ID</th>
                <th className="px-4 py-2">Reaction Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {reactions.map((reaction) => (
                <tr
                  key={reaction.categoryReactionId}
                  className="border-t hover:bg-blue-50"
                >
                  <td className="px-4 py-2 text-left truncate max-w-[150px]">
                    {reaction.categoryReactionId}
                  </td>
                  <td className="px-4 py-2 text-left truncate max-w-[150px]">
                    {reaction.reactionName}
                  </td>
                  <td className="px-4 py-2 text-left">
                    <img
                      src={reaction.iconUrl}
                      alt="reaction icon"
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-left space-x-2">
                    <button className="text-red-500 hover:text-red-700 text-lg">
                      🗑️
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 text-lg">
                      ✏️
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-lg">
                      👁️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReactionPage;
