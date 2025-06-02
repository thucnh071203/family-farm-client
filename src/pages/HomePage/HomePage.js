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
      <Link to="/UserGrowthChart">MapChart</Link>
      <br></br>
      <Link to="/GroupPage">GroupMemberPage</Link>
      <br></br>
      <Link to="/JoinRequestsListPage">JoinRequestsListPage</Link>
      <br></br>
      <Link to="/PermissionGroupPage">PermissionGroupPage</Link>
      <Header />
      <NavbarHeader />
      {/* <Link to="/Register">Register</Link> */}

      <main className="homepage-main">{/* <MainContent /> */}</main>
    </div>
  );
};

export default HomePage;
