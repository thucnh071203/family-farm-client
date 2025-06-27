import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import eye from "../../assets/icons/eye.svg";
import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
const PostCatePage = () => {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // lọc dữ liệu dựa trên search
  const filteredReactions = reactions.filter((reaction) =>
    reaction.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `https://localhost:7280/api/category-post/delete/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Xóa thành công!");
      fetchReactions(); // refresh lại danh sách
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Xóa thất bại!");
    }
  };

  const fetchReactions = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        "https://localhost:7280/api/category-post/list",
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
    <div className="flex min-h-screen">
      <SidebarDashboard />
      <div className="flex-1">
        <div className="p-6 bg-blue-50 min-h-screen">
          <div className="text-sm text-gray-400">HOME / Category post</div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-sky-500">CATEGORY POST</h1>
            <Link to="/CreatePostCate">
              <button className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 text-sm">
                New Post Category
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
                placeholder="Search category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full text-sm">
                <thead className="bg-sky-100 text-left font-bold text-gray-700">
                  <tr>
                    <th className=" px-4 py-2">ID</th>
                    <th className="px-4 py-2">Category Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Create At</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReactions.map((reaction) => (
                    <tr key={reaction.categoryId}>
                      <td className="px-4 py-2 text-left truncate max-w-[150px]">
                        {reaction.categoryId}
                      </td>
                      <td className="px-4 py-2 text-left truncate max-w-[150px]">
                        {reaction.categoryName}
                      </td>
                      <td className="px-4 py-2 text-left truncate max-w-[150px]">
                        {reaction.categoryDescription}
                      </td>
                      <td className="px-4 py-2 text-left truncate max-w-[150px]">
                        {reaction.createAt}
                      </td>
                      <td className="px-4 py-2 text-left space-x-2">
                        <button
                          onClick={() => handleDelete(reaction.categoryId)}
                          className="text-red-500 hover:text-red-700 text-lg"
                        >
                          <img src={trash} alt="" />
                        </button>

                        {/* <<<<<<< uyenvm/FE2
                    <Link
                      to={`/UpdatePostCate/${reaction.categoryId}`}
                    >
                      <button className="text-blue-500 hover:text-blue-700 text-lg">
                        <img src={edit} alt="" />
                      </button>
                    </Link>

                    <Link
                      to={`/DetailPostCate/${reaction.categoryId}`}
                    >
                      <button className="text-blue-400 hover:text-blue-700 text-lg">
                        <img src={eye} alt="" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
======= */}
                        <Link to={`/UpdatePostCate/${reaction.categoryId}`}>
                          <button className="text-blue-500 hover:text-blue-700 text-lg">
                            <img src={edit} alt="" />
                          </button>
                        </Link>

                        <Link to={`/DetailPostCate/${reaction.categoryId}`}>
                          <button className="text-blue-400 hover:text-blue-700 text-lg">
                            <img src={eye} alt="" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* >>>>>>> main */}
        </div>
      </div>
    </div>
  );
};

export default PostCatePage;
