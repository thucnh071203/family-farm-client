import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePostCate = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7280/api/category-post/create",
        {
          categoryId: "", // truyền chuỗi rỗng
          categoryName,
          categoryDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("✅ Created successfully!");
      setCategoryName("");
      setCategoryDescription("");
      setTimeout(() => {
        navigate("/Dashboard/PostCatePage");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create category.");
    }
  };

  return (
    <main className="flex-1 bg-blue-50 p-10 min-h-screen">
      <div className="text-sm text-gray-400 mb-4 text-left">
        🏠 HOME / Category post
      </div>
      <h1 className="text-2xl font-bold text-blue-400 mb-6 text-left">
        CATEGORY POST
      </h1>

      <div className="bg-white rounded-xl shadow p-6 max-w">
        <h2 className="text-red-600 font-semibold mb-8 text-left">
          Create new Category Post
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-left mb-4">
              Category short name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border rounded px-4 py-4 mt-1 focus:outline-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-left mb-4">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="w-full border rounded px-4 py-10 mt-1 focus:outline-blue-400"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" className="text-red-500 font-semibold">
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-400 text-white px-14 py-2 rounded hover:bg-blue-500"
            >
              Create
            </button>
          </div>

          {message && (
            <div className="mt-4 text-left font-medium text-sm text-blue-600">
              {message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default CreatePostCate;
