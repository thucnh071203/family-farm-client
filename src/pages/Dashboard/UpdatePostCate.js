import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdatePostCate = () => {
  const { id } = useParams(); // lấy categoryId từ URL
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch dữ liệu từ BE
  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `https://localhost:7280/api/category-post/get-by-id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategory(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy category:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        "https://localhost:7280/api/category-post/update",
        {
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          categoryDescription: category.categoryDescription,
          updateAt: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        navigate("/Dashboard/PostCatePage");
      }, 1000);
    } catch (err) {
      console.error("Cập nhật thất bại:", err);
      alert("Cập nhật thất bại!");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!category) return <p>Không tìm thấy category.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-sky-400 mb-4 text-left">
        Edit Category
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="space-y-4 max-w bg-white p-6 rounded shadow ml-8"
      >
        <div>
          <label className="block font-medium mb-2 text-left">
            Category Name
          </label>
          <input
            type="text"
            value={category.categoryName}
            onChange={(e) =>
              setCategory({ ...category, categoryName: e.target.value })
            }
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2 text-left">
            Description
          </label>
          <textarea
            value={category.categoryDescription}
            onChange={(e) =>
              setCategory({ ...category, categoryDescription: e.target.value })
            }
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white px-10 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePostCate;
