import React from "react";
import LoginForm from "../../components/LoginForm";
import "../../styles/globals.css";
import "../../styles/styleguilde.css";
import "./loginstyle.css";
import backgroundImg from '../../assets/images/469337637_593611579790872_3160416761111677688_n.jpg';
import { Link } from "react-router-dom";


const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="img-background">
        <img
          src={backgroundImg}
          alt="Background"
        />
      </div>
      <div className="div">
        <div className="frame">
          <p className="we-always-welcome">
            We Always Welcome Experienced People To Work With Farmers.
          </p>
          <Link to="/register" className="text-wrapper">
            Join as an Expert!
          </Link>
        </div>

        {/* Gọi component form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
