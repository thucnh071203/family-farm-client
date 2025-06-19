import React, { useEffect } from "react";
import axios from "axios";
import logo from "../../assets/images/logo_img.png";
import mdiUser from "../../assets/images/mdi_user.png";
import mdiClock from "../../assets/images/mdi_clock.png";
import iconEye from "../../assets/images/mdi_eye (1).png";
import googleIcon from "../../assets/images/devicon_google.png";
import fbIcon from "../../assets/images/devicon-plain_facebook.png";
import { getOwnProfile } from "../../services/accountService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const { initiateGoogleLogin, loading, error } = useGoogleAuth();

  const handleGoogleLogin = () => {
    initiateGoogleLogin(rememberMe, navigate);
  };

  useEffect(() => {
    // Tải SDK Facebook nếu chưa có
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        window.FB.init({
          appId: "681934764486226",
          cookie: true,
          xfbml: true,
          version: "v17.0", // Dùng version ổn định
        });
      };
      document.body.appendChild(script);
    } else {
      // Nếu SDK đã sẵn sàng, chỉ cần init
      window.FB.init({
        appId: "681934764486226",
        cookie: true,
        xfbml: true,
        version: "v17.0",
      });
    }
  }, []);

  // Đăng nhập bằng facebook
  const handleFacebookLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;

          // Gọi Facebook API để lấy thông tin người dùng
          window.FB.api(
            "/me",
            { fields: "id,name,email,picture", access_token: accessToken },
            async function (userInfo) {
              console.log("Facebook user info:", userInfo);

              const payload = {
                facebookId: userInfo.id,
                email: userInfo.email,
                name: userInfo.name,
                avatar: userInfo.picture?.data?.url || null,
              };

              try {
                // const loginResponse = await axios.post(
                //   "https://localhost:7280/api/authen/login-facebook",
                //   payload
                // );
                const loginResponse = await instance.post("api/authen/login-facebook", payload);

                const loginData = loginResponse.data;

                if (loginResponse.status === 200) {
                  const rememberMe = true; // Tùy bạn có lưu nhớ không
                  const storage = rememberMe ? localStorage : sessionStorage;

                  // Lưu accessToken, refreshToken, username
                  storage.setItem("accessToken", loginData.accessToken);
                  storage.setItem("refreshToken", loginData.refreshToken);
                  storage.setItem("username", loginData.username);
                  storage.setItem("accId", loginData.accId);
                  
                  // Hạn token
                  const expiryTime = Date.now() + loginData.tokenExpiryIn * 1000;
                  storage.setItem("tokenExpiry", expiryTime);

                  // Lấy thông tin profile (nếu cần thiết)
                  const profileResponse = await axios.get(
                    "https://localhost:7280/api/account/own-profile",
                    {
                      headers: {
                        Authorization: `Bearer ${loginData.accessToken}`,
                      },
                    }
                  );
                  // const profileResponse = await getOwnProfile();

                  const profileData = profileResponse.data;

                  storage.setItem("profileData", JSON.stringify(profileData.data || {}));

                  console.log("🔥 Dữ liệu profile:", JSON.stringify(profileData, null, 2));

                  storage.setItem(
                    "fullName",
                    profileData.data.fullName || loginData.username
                  );
                  storage.setItem("avatarUrl", profileData.data.avatar || "");

                  toast.success("LOGIN SUCCESSFULLY!");
                  navigate("/");
                } else {
                  toast.error("Login failed!");
                }
              } catch (error) {
                if (error.response && error.response.status === 401) {
                  toast.error("Login failed! Please check your Facebook info!");
                } else {
                  toast.error("Server not responding");
                }
              }
            }
          );
        } else {
          console.log("Người dùng từ chối đăng nhập Facebook.");
        }
      },
      { scope: "public_profile,email" }
    );
  };


  const handleLogin = async () => {

    try {
      const loginResponse = await instance.post('/api/authen/login', {

        Identifier: username,
        Password: password,
      });

      const loginData = loginResponse.data;
      if (loginResponse.status === 200) {
        const storage = rememberMe ? localStorage : sessionStorage;

        // Lưu accessToken, refreshToken, username
        storage.setItem("accessToken", loginData.accessToken);
        storage.setItem("refreshToken", loginData.refreshToken);
        storage.setItem("username", loginData.username);
        storage.setItem("accId", loginData.accId);

        // Tính thời điểm hết hạn (current time + tokenExpiryIn giây)
        const expiryTime = Date.now() + loginData.tokenExpiryIn * 1000;
        storage.setItem("tokenExpiry", expiryTime);

        // const profileResponse = await instance.get('/api/account/own-profile');
        const profileData = await getOwnProfile();

        storage.setItem("fullName", profileData.data.fullName || loginData.username);
        storage.setItem("avatarUrl", profileData.data.avatar || "");
        storage.setItem("profileData", JSON.stringify(profileData.data || {}));

        toast.success("LOGIN SUCCESSFULLY!");
        navigate("/");
      } else {
        toast.error("Login failed! Please check your username or password!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Login failed! Please check your username or password!");
      } else {
        toast.error("Server not responding");
      }
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
          {errors.username && (
            <span className="text-sm italic text-red-600">{errors.username}</span>
          )}
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
          {errors.password && (
            <span className="text-sm italic text-red-600">{errors.password}</span>
          )}
        </div>

        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              value="check"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-wrapper-10">Remember me!</span>
          </label>
          <Link to="/forgot-password" className="text-wrapper-11" href="#">
            Forgot password?
          </Link>
        </div>

        <div className="w-full frame-2">
          <div className="div-wrapper" onClick={handleLogin}>
            <button type="button"
              className="text-wrapper-2">
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
              {/* <img className="img" src={googleIcon} alt="Google Icon" /> */}
              {/* <div className="text-wrapper-13">Continue with Google</div> */}
              <div
                className={`frame-10 w-full lg:w-[223px] cursor-pointer flex items-center justify-center border border-gray-300 rounded-md py-2 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={handleGoogleLogin}
              >
                <img className="img w-6 h-6 mr-2" src={googleIcon} alt="Google Icon" />
                <div className="text-wrapper-13">
                  {loading ? 'Logging in...' : 'Continue with Google'}
                </div>
              </div>
            </div>
            <div className="frame-11 w-full lg:w-[223px]" onClick={handleFacebookLogin}>
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