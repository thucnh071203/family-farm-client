import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateCateService = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", description: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    let valid = true;
    const newErrors = { name: "", description: "" };

    if (!categoryName.trim()) {
      newErrors.name = "Category short name is required.";
      valid = false;
    }

    if (!categoryDescription.trim()) {
      newErrors.description = "Description is required.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    const payload = {
      categoryServiceId: "", // để server tự sinh
      accId: "", // nếu có accId, hãy lấy từ localStorage hoặc context
      categoryName,
      categoryDescription,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      isDeleted: false,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://localhost:7280/api/category-service/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setMessage("✅ Category created successfully.");
        setCategoryName("");
        setCategoryDescription("");
        setErrors({ name: "", description: "" });
        navigate(`/CateService`);
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("API error:", error);
      setMessage("❌ Failed to connect to the server.");
    }
  };

  return (
    <main className="flex-1 bg-blue-50 p-10 min-h-screen">
      <div className="text-sm text-gray-400 mb-4 text-left">
        🏠 HOME / Category service
      </div>
      <h1 className="text-2xl font-bold text-blue-400 mb-6 text-left">
        CATEGORY SERVICE
      </h1>

      <div className="bg-white rounded-xl shadow p-6 max-w">
        <h2 className="text-red-600 font-semibold mb-8 text-left">
          Create new Category Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input: Category Name */}
          <div>
            <label className="block font-medium text-left mb-2">
              Category short name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className={`w-full border rounded px-4 py-4 mt-1 focus:outline-blue-400 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.name}
              </p>
            )}
          </div>

          {/* Input: Description */}
          <div>
            <label className="block font-medium text-left mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className={`w-full border rounded px-4 py-4 mt-1 focus:outline-blue-400 ${
                errors.description ? "border-red-500" : ""
              }`}
              rows={3}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.description}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
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

          {/* Message */}
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

export default CreateCateService;
