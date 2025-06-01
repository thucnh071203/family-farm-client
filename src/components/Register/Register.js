import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import instance from "../../Axios/axiosConfig";
import { toast, Bounce } from "react-toastify";
import registerPoster from "../../assets/images/register_poster.png"
import logo from '../../assets/images/logo.png';
import user_icon from "../../assets/icons/user_icon.svg";
import user_plus_icon from "../../assets/icons/user_plus_icon.svg";
import mail_icon from "../../assets/icons/mail_icon.svg";
import phone_icon from "../../assets/icons/user_icon.svg";
import identify_icon from "../../assets/icons/identify_icon.svg";
import address_icon from "../../assets/icons/address_icon.svg";
import password_icon from "../../assets/icons/password_icon.svg";
import back_icon from "../../assets/icons/back_icon.svg";

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
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
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
      const response = await instance.post(
        "/api/authen/register-farmer",
        dataToSend
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Đăng ký thành công!");

        navigate("/Login");
      }
    } catch (error) {
      const backendMessage = error.response?.data?.messageError;
      const backendErrors = error.response?.data?.errors;

      if (backendMessage) {
        toast.error(`Lỗi: ${backendMessage}`);
      } else if (backendErrors) {
        const errorMessages = Object.values(backendErrors).flat().join(", ");
        toast.error(`Lỗi: ${errorMessages}`);
      } else {
        toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại.");
      }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* <ToastContainer position="top-right" richColors /> */}
      <div className="flex items-center gap-3 py-6 mx-auto max-w-7xl ">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <h3 className="text-xl font-bold name-page">Family Farm</h3>
      </div>
      <div className="flex flex-col w-full h-full gap-10 mx-auto md:flex-row max-w-7xl">
        {/* <aside className="h-full p-4 overflow-y-auto bg-white shadow lg:w-1/4"> */}
        <div className="z-10 w-full p-8 text-left bg-white border border-gray-400 border-solid rounded-lg shadow-lg lg:w-2/3">

          <div className="flex items-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="h-10 mr-2"
            />
            <h1 className="text-xl font-bold text-red-500">
              Create an Account for Free
            </h1>
          </div>

          <h2 className="mb-4 font-semibold text-left text-green-600">
            1 - Share a little about your Personal Information.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-left">
                Full name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.fullName ? "border-red-500" : ""
                    }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}

                <span className="absolute left-3 top-2.5 text-blue-400">
                  <img src={user_icon} alt=""></img>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-left">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.email ? "border-red-500" : ""
                    }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}

                <span className="absolute left-3 top-2.5 text-blue-400">
                  <img src={mail_icon} alt=""></img>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-left">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.phone ? "border-red-500" : ""
                    }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}

                <span className="absolute left-3 top-2.5 text-blue-400">
                  <img src={phone_icon} alt=""></img>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-left">
                Identifier number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="identify"
                  value={formData.identify}
                  onChange={handleChange}
                  placeholder="Enter your identify number"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.identify ? "border-red-500" : ""
                    }`}
                />
                {errors.identify && (
                  <p className="mt-1 text-xs text-red-500">{errors.identify}</p>
                )}
                <span className="absolute left-3 top-2.5 text-blue-400">
                  <img src={identify_icon} alt=""></img>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-left">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.city ? "border-red-500" : ""
                    }`}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                )}

                <span className="absolute left-3 top-2.5 text-blue-400">
                  <img src={address_icon} alt=""></img>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-left">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.country ? "border-red-500" : ""
                    }`}
                />
                {errors.country && (
                  <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                )}
                <span className="absolute left-3 top-2.5 text-blue-400">
                  <img src={address_icon} alt=""></img>
                </span>
              </div>
            </div>
          </div>
          <h2 className="mt-4 mb-4 font-semibold text-left text-green-600">
            2 - Write some security information.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-left">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.username ? "border-red-500" : ""
                    }`}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                )}
                <span className="absolute left-3 top-2.5 text-blue-400">
                  <img src={user_icon} alt=""></img>
                </span>
              </div>
            </div>
            <div></div>
            <div>
              <label className="block text-sm font-medium text-left">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.password ? "border-red-500" : ""
                    }`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
                <span className="absolute text-blue-400 left-3 top-2">
                  <img src={password_icon} alt=""></img>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-left">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full border rounded px-4 py-2 pl-10 text-sm ${errors.passwordConfirm ? "border-red-500" : ""
                    }`}
                />
                {errors.passwordConfirm && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.passwordConfirm}
                  </p>
                )}
                <span className="absolute text-blue-400 left-3 top-2">
                  <img src={password_icon} alt=""></img>
                </span>
              </div>
            </div>
          </div>

          <h2 className="mt-4 mb-4 font-semibold text-left text-green-600">
            3 - Upload some file for Expert.
          </h2>
          <label className="block text-sm text-left">
            Certificate File <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Upload
            </button>
            <p className="text-sm">
              Your file:{" "}
              <Link to="/CreateProgessStep" className="text-blue-400">
                My Resume.pdf
              </Link>
            </p>
          </div>

          <div className="flex justify-end gap-10">
            <button className="flex items-center gap-1 text-red-500">
              <img src={back_icon} alt=""></img>
              <Link to="/Login">
                Back To Login
              </Link>
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              <img src={user_plus_icon} alt=""></img>
              Register
            </button>
          </div>
        </div>
        <div className="relative flex-col hidden w-1/3 pt-8 lg:flex">
          <div className="absolute -right-[850px] -top-[600px] border-t-green-500 border-l-transparent rotate-45 bg-emerald-500 h-[1000px] w-[1000px]"></div>
          <div className="right-0 z-10 flex justify-around w-full mb-4 text-center top-20">
            <p className="text-xl font-semibold text-blue-500">
              Your Expertise
            </p>
            <p className="text-xl font-semibold text-white">Their Growth</p>
          </div>
          <img
            src={registerPoster}
            alt="Farm"
            className="z-10"
          />
        </div>
      </div>
    </div>
  );
};
export default Register;
