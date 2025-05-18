import React from "react";
import logo from ".././assets/images/logo_img.png";
import mdiUser from ".././assets/images/mdi_user.png";
import mdiClock from ".././assets/images/mdi_clock.png";
import iconEye from ".././assets/images/mdi_eye (1).png";
import googleIcon from ".././assets/images/devicon_google.png";
import fbIcon from ".././assets/images/devicon-plain_facebook.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const LoginForm = () => {
  //Dùng để lấy và set giá trị cho 2 input là username và password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Xử lý logic đăng nhập
  const handleLogin = async () => {
    axios
      .post("https://localhost:7280/api/authen/login", {
        Identifier: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;

        if (response.status === 200) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("username", data.username);
          localStorage.setItem("tokenExpiryIn", data.tokenExpiryIn);

          toast.success("Đăng nhập thành công!");
          navigate("/");
        } else {
          toast.error("Đăng nhập thất bại!");
        }
      })
      .catch((error) => {
        toast.error("Đăng nhập thất bại!");
      });
  };

  return (
    <div className="overlap w-full md:w-1/2 mt-6 md:mt-0 md:ml-[5%]">
      <div className="form-container w-full max-w-[466px] flex flex-col gap-7 mx-auto">
        <div className="logo flex justify-center items-center gap-x-4 mx-auto">
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
          <div className="overlap-group-wrapper mt-4 w-full">
            <div className="overlap-group w-full flex">
              <img className="mdi-user" src={mdiUser} alt="User Icon" />

              {/* INPUT USERNAME  */}
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
          <div className="overlap-group-wrapper mt-4 w-full">
            <div className="overlap-group w-full flex">
              <img className="mdi-clock" src={mdiClock} alt="Clock Icon" />

              {/* INPUT CHO PASSWORD  */}
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

        <div className="frame-2 w-full">
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
          <div className="frame-9 flex flex-col justify-center items-center lg:flex-row">
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
