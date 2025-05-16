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
      <div className="div px-4 sm:px-6 lg:px-8 mx-auto flex flex-col md:flex-row items-center gap-4">
        {/* Gọi component form */}
        <LoginForm />
        <div className="frame w-full md:w-1/2 mb-10 md:mb-0 mt-20 md:mt-0">
          <p className="we-always-welcome">
            We Always Welcome Experienced People To Work With Farmers.
          </p>
          <Link to="/register" className="text-wrapper">
            Join as an Expert!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
