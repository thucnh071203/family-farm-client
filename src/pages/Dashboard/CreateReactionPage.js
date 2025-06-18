import React, { useState } from "react";
import axios from "axios";

const CreateReactionPage = () => {
  const [reactionName, setReactionName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const formData = new FormData();
  

  const generateObjectId = () => {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      "xxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
    );
  };

  const handleImageUpload = (e) => {
    
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setIconUrl(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!reactionName || !iconUrl) {
      setMessage("Vui lòng điền đầy đủ tên và chọn ảnh.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("Bạn chưa đăng nhập.");
      return;
    }
 const fileInput = document.getElementById("iconFile");
  const file = fileInput?.files[0];
  if (!file) {
    setMessage("Vui lòng chọn ảnh hợp lệ.");
    return;
  }

  const formData = new FormData();
  formData.append("CategoryReactionId", generateObjectId());
  formData.append("ReactionName", reactionName);
  formData.append("IconUrl", file); 
  //  AccId từ token


    try {
      const response = await axios.post(
        "https://localhost:7280/api/category-reaction/create",
      
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage("🎉 Tạo reaction thành công!");
        setReactionName("");
        setIconUrl("");
        setImagePreview("");
      } else {
        setMessage(`⚠️ ${response.data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi khi tạo reaction.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#007bff" }}>
        Tạo Reaction mới
      </h2>

      {message && (
        <div
          style={{
            margin: "1rem 0",
            color: message.includes("thành công") ? "green" : "red",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Tên Reaction *</label>
          <input
            type="text"
            value={reactionName}
            onChange={(e) => setReactionName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            placeholder="Nhập tên reaction..."
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Ảnh Reaction *</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && (
            <div style={{ marginTop: "1rem" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxHeight: "100px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{ color: "red", background: "none", border: "none" }}
          >
            ← Quay lại
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#00aaff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReactionPage;
