import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import ReviewServiceFrom from "../../components/ProcessList/ReviewServiceForm";

const ReviewServicePage = () => {
  return (
    <div className="ProgressListPageFarmer">
      <Header/>
      <NavbarHeader/>
      <ReviewServiceFrom/>
    </div>
  );
};

export default ReviewServicePage;