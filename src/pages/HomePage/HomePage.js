import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="HomePage">
      <Header />
      <Link to="/Register">Register</Link>
    </div>
  );
};

export default HomePage;
