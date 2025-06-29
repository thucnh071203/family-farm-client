import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetailPostCate = () => {
  const { id } = useParams(); // lấy categoryId từ URL
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7280/api/category-post/get-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setCategory(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-600">Đang tải dữ liệu...</p>;
  if (!category)
    return <p className="p-6 text-red-500">Không tìm thấy danh mục.</p>;

  return (
    <main className="flex-1 bg-blue-50 p-10 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-400 mb-6 text-left">
        POST CATEGORY DETAIL
      </h1>

      <div className="bg-white rounded-xl shadow p-12 w-full md:max-w ml-8">
        <div className="space-y-4 text-left">
          <div>
            <span className="font-medium text-gray-600">Category ID: </span>
            {category.categoryId}
          </div>
          <div>
            <span className="font-medium text-gray-600">Account ID: </span>
            {category.accId}
          </div>
          <div>
            <span className="font-medium text-gray-600">Category Name: </span>
            {category.categoryName}
          </div>
          <div>
            <span className="font-medium text-gray-600">Description: </span>
            {category.categoryDescription}
          </div>
          <div>
            <span className="font-medium text-gray-600">Created At: </span>
            {new Date(category.createAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium text-gray-600">Updated At: </span>
            {category.updateAt
              ? new Date(category.updateAt).toLocaleString()
              : "Chưa cập nhật"}
          </div>
          <div>
            <span className="font-medium text-gray-600">Is Deleted: </span>
            {category.isDeleted ? "✅ Yes" : "❌ No"}
          </div>
        </div>

        <div className="mt-6">
          <button

            onClick={() => navigate("/PostCatePage")}
            type="button"
            className="text-red-500 font-semibold"

          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default DetailPostCate;
