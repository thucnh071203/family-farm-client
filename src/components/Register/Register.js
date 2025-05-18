import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";

import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    identify: "",
    username: "",
    password: "",
    passwordConfirm: "",
    city: "",
    country: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Kiểm tra form
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.city.trim()) newErrors.city = "city is required.";
    if (!formData.country.trim()) newErrors.country = "country is required.";
    if (!formData.identify.trim())
      newErrors.identify = "Identifier number is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.passwordConfirm !== formData.password)
      newErrors.passwordConfirm = "Password and Confirm Password must be same.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    //loại passwordConfirm
    const { passwordConfirm, ...dataToSend } = formData;

    try {
      const response = await axios.post(
        "https://localhost:7280/api/authen/register-farmer",
        dataToSend
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error) {
      // Ưu tiên lỗi message từ backend
      const backendMessage = error.response?.data?.messageError;
      const backendErrors = error.response?.data?.errors;

      if (backendMessage) {
        toast.error(`Lỗi: ${backendMessage}`);
      } else if (backendErrors) {
        // Nếu backend trả về nhiều lỗi dạng object
        const errorMessages = Object.values(backendErrors).flat().join(", ");
        toast.error(`Lỗi: ${errorMessages}`);
      } else {
        toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại.");
      }
    }
  };

  return (
    <div className="bg-gray-100">
      <Toaster position="top-right" richColors />
      <div className="w-full min-h-screen flex flex-col md:flex-row overflow-y-auto h-full">
        {/* <aside className=" lg:w-1/4 bg-white shadow p-4 overflow-y-auto h-full"> */}

        <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-2/3 lg:w-1/2">
          <div className="mb-6 flex">
            <img
              src="https://mcdn.coolmate.me/image/October2023/nhan-vat-doraemon-3012_329.jpg"
              alt="Logo"
              className="h-10 mr-2"
            />
            <h1 className="text-xl font-bold text-red-500">
              Create an Account for Free
            </h1>
          </div>

          <h2 className="text-left text-green-600 font-semibold mb-4">
            1 - Share a little about your Personal Information.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-left block text-sm font-medium">
                Full name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                )}

                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-left block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}

                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-left block text-sm font-medium">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}

                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-left block text-sm font-medium">
                Identifier number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="identify"
                  value={formData.identify}
                  onChange={handleChange}
                  placeholder="Enter your identify number"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.identify ? "border-red-500" : ""
                  }`}
                />
                {errors.identify && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.identify}
                  </p>
                )}
                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-left block text-sm font-medium">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.city ? "border-red-500" : ""
                  }`}
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                )}

                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-left block text-sm font-medium">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.country ? "border-red-500" : ""
                  }`}
                />
                {errors.country && (
                  <p className="text-xs text-red-500 mt-1">{errors.country}</p>
                )}
                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-left text-green-600 font-semibold mt-4 mb-4">
            2 - Write some security information.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-left block text-sm font-medium">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.username ? "border-red-500" : ""
                  }`}
                />
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1">{errors.username}</p>
                )}
                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-left block text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-left block text-sm font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${
                    errors.passwordConfirm ? "border-red-500" : ""
                  }`}
                />
                {errors.passwordConfirm && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.passwordConfirm}
                  </p>
                )}
                <span className="absolute left-3 top-2.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-left text-green-600 font-semibold mt-4 mb-4">
            3 - Upload some file for Expert.
          </h2>
          <label className="text-left block text-sm">
            Certificate File <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Upload
            </button>
            <p className="text-sm">
              Your file:{" "}
              <Link to="/CreateProgessStep" className="text-blue-400">
                My Resume.pdf
              </Link>
            </p>
          </div>

          <div className="flex justify-between">
            <button className="text-red-500 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back To Login
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Register
            </button>
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-end pr-5 pt-8 relative">
          <div className="text-center mb-4 flex justify-between w-full absolute top-20 right-0">
            <p className="text-blue-500 text-xl font-semibold ml-20">
              Your Expertise
            </p>
            <p className="text-green-600 text-xl font-semibold">Their Growth</p>
          </div>

          <img
            src="https://th.bing.com/th/id/R.aaa57c8f712b7e56ec96781e1ffd9818?rik=ikF2hqmSH1zLiQ&pid=ImgRaw&r=0"
            alt="Farm"
            className="w-96 h-96"
          />
        </div>
      </div>
    </div>
  );
};
export default Register;
