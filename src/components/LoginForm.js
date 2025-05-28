import React from "react";
import logo from ".././assets/images/logo_img.png";
import mdiUser from ".././assets/images/mdi_user.png";
import mdiClock from ".././assets/images/mdi_clock.png";
import iconEye from ".././assets/images/mdi_eye (1).png";
import googleIcon from ".././assets/images/devicon_google.png";
import fbIcon from ".././assets/images/devicon-plain_facebook.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import instance from "../Axios/axiosConfig";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      // Gọi API đăng nhập
      const loginResponse = await instance.post('/api/authen/login', {

        Identifier: username,
        Password: password,
      });

      const loginData = loginResponse.data;
      if (loginResponse.status === 200) {
        // Lưu thông tin đăng nhập vào sessionStorage
        sessionStorage.setItem("accessToken", loginData.accessToken);
        sessionStorage.setItem("refreshToken", loginData.refreshToken);
        sessionStorage.setItem("username", loginData.username);
        sessionStorage.setItem("tokenExpiryIn", loginData.tokenExpiryIn);

        // Gọi API để lấy thông tin profile
        const profileResponse = await instance.get('/api/account/own-profile');
        const profileData = profileResponse.data;
        
        // Lưu fullName và avatarUrl vào sessionStorage
        sessionStorage.setItem("fullName", profileData.data.fullName || loginData.username);
        sessionStorage.setItem("avatarUrl", profileData.data.avatar || "");

        toast.success("LOGIN SUCCESSFULLY!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        navigate("/");
      } else {
        toast.error("Login failed! Please check your username or password!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại! Vui lòng kiểm tra thông tin.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="overlap w-full md:w-1/2 mt-6 md:mt-0 md:ml-[5%] bg-gray-200 bg-opacity-25">
      <div className="form-container w-full max-w-[466px] flex flex-col gap-7 mx-auto">
        <div className="flex items-center justify-center mx-auto logo gap-x-4">
          <img className="image" src={logo} alt="Logo" />
          <div className="family-farm">Family Farm</div>
        </div>

        <div className="frame-4">
          <p className="p">Welcome back, start your journey!</p>
          <div className="text-wrapper-5">Login to Family Farm</div>
        </div>

        <div className="group">
          <div className="frame-5">
            <div className="text-wrapper-6">Enter your Username</div>
            <div className="text-wrapper-7">*</div>
          </div>
          <div className="w-full mt-4 overlap-group-wrapper">
            <div className="flex w-full overlap-group">
              <img className="mdi-user" src={mdiUser} alt="User Icon" />
              <input
                className="input-text"
                type="text"
                placeholder="Enter your username, email or phone"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="text-wrapper-9">Your username is required.</div>
        </div>

        <div className="group-2">
          <div className="frame-5">
            <div className="text-wrapper-6">Enter your Password</div>
            <div className="text-wrapper-7">*</div>
          </div>
          <div className="w-full mt-4 overlap-group-wrapper">
            <div className="flex w-full overlap-group">
              <img className="mdi-clock" src={mdiClock} alt="Clock Icon" />
              <input
                className="input-text"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img className="mdi-eye" src={iconEye} alt="Eye Icon" />
            </div>
          </div>
          <div className="text-wrapper-9">Your password is required.</div>
        </div>

        <div className="login-options">
          <label className="remember-me">
            <input type="checkbox" />
            <span className="text-wrapper-10">Remember me!</span>
          </label>
          <Link to="/forgot-password" className="text-wrapper-11" href="#">
            Forgot password?
          </Link>
        </div>

        <div className="w-full frame-2">
          <div className="div-wrapper">
            <button
              type="button"
              className="text-wrapper-2"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="frame-3">
            <div className="text-wrapper-3">Don’t have an account?</div>
            <Link to="/Register" className="text-wrapper-4">
              Register now
            </Link>
          </div>
        </div>

        <div className="frame-8">
          <div className="text-wrapper-12">Login With</div>
          <div className="flex flex-col items-center justify-center frame-9 lg:flex-row">
            <div className="frame-10 w-full lg:w-[223px]">
              <img className="img" src={googleIcon} alt="Google Icon" />
              <div className="text-wrapper-13">Continue with Google</div>
            </div>
            <div className="frame-11 w-full lg:w-[223px]">
              <img className="img" src={fbIcon} alt="Facebook Icon" />
              <div className="text-wrapper-14">Continue with Facebook</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;