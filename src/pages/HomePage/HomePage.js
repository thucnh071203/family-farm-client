import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import NavbarHeader from "../../components/Header/NavbarHeader";

const HomePage = () => {
  return (
    <div className="HomePage">
      <Header/>
      <NavbarHeader/>
      {/* <Link to="/Register">Register</Link> */}

      <main className="homepage-main">
        {/* <MainContent /> */}
      </main>

    </div>
  );
};

export default HomePage;
