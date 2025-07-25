import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

        navigate("/PostCatePage");

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
      <div className="flex">
        <div className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.52734 13V8.5H9.52734V13H13.2773V7H15.5273L8.02734 0.25L0.527344 7H2.77734V13H6.52734Z"
              fill="rgba(62,63,94,0.25)"
            />
          </svg>
          <Link to="/Dashboard">HOME</Link>
        </div>
        <span className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          <Link to="/CatePost">/Category post</Link>
        </span>
      </div>
      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-5 mt-3">
        CATEGORY POST
      </h1>
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
          onClick={() => navigate("/PostCatePage")}
          type="button"
          className="text-red-500 font-semibold mr-6"
        >
          Back
        </button>

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
