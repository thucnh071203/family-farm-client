import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="HomePage">
      <Header />
      <Link to="/Register">Register</Link>
      <br></br>
      <Link to="/Statistic1">Statistic</Link>
      <br></br>
      <Link to="/UserGrowthChart">User Growth</Link>
      <br></br>
      <Link to="/MapChart">MapChart</Link>
    </div>
  );
};

export default HomePage;
