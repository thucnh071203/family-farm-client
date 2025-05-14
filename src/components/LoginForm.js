import React from "react";
import logo from '.././assets/images/logo_img.png';
import mdiUser from '.././assets/images/mdi_user.png';
import mdiClock from '.././assets/images/mdi_clock.png';
import iconEye from '.././assets/images/mdi_eye (1).png';
import googleIcon from '.././assets/images/devicon_google.png';
import fbIcon from '.././assets/images/devicon-plain_facebook.png';

const LoginForm = () => {
  return (
    <div className="overlap">
      <div className="frame-2">
        <div className="div-wrapper">
          <div className="text-wrapper-2">Login</div>
        </div>
        <div className="frame-3">
          <div className="text-wrapper-3">Don’t have an account?</div>
          <a href="#" className="text-wrapper-4">Register now</a>
        </div>
      </div>

      <div className="logo">
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
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <img className="mdi-user" src={mdiUser} alt="User Icon" />
            <input
              className="input-text"
              type="text"
              placeholder="Enter your username, email or phone"
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
        <div className="text-wrapper-9">Your password is required.</div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <img className="mdi-clock" src={mdiClock} alt="Clock Icon" />
            <input
              className="input-text"
              type="password"
              placeholder="Enter your password"
            />
            <img className="mdi-eye" src={iconEye} alt="Eye Icon" />
          </div>
        </div>
      </div>

      <div className="login-options">
        <label className="remember-me">
          <input type="checkbox" />
          <span className="text-wrapper-10">Remember me!</span>
        </label>
        <a className="text-wrapper-11" href="#">Forgot password?</a>
      </div>

      <div className="frame-8">
        <div className="text-wrapper-12">Login With</div>
        <div className="frame-9">
          <div className="frame-10">
            <img className="img" src={googleIcon} alt="Google Icon" />
            <div className="text-wrapper-13">Continue with Google</div>
          </div>
          <div className="frame-11">
            <img className="img" src={fbIcon} alt="Facebook Icon" />
            <div className="text-wrapper-14">Continue with Facebook</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
