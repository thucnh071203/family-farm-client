import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import NavbarHeader from "../../components/Header/NavbarHeader";
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
      <br></br>
      <Link to="/GroupPage">GroupPage</Link>
      <Header />
      <NavbarHeader />
      {/* <Link to="/Register">Register</Link> */}

      <main className="homepage-main">{/* <MainContent /> */}</main>
    </div>
  );
};

export default HomePage;
