import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import ProcessSteps from "../../components/ProcessResult/ProcessSteps";
import ProcessIntroduction from "../../components/ProcessResult/ProcessIntroduction";
import ProcessResultInput from "../../components/ProcessResult/ProcessResultInput";
import ProcessResultHistory from "../../components/ProcessResult/ProcessResultHistory";

const ProcessResultPage = () => {
  return (
    <div>
      <Header />
      <NavbarHeader />
      <div className="flex flex-col gap-5 p-6 mx-auto lg:flex-row max-w-7xl pt-[130px] text-left">
        {/* Left Section: Process Steps */}
        <div className="lg:w-1/3">
          <ProcessSteps />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5 lg:w-2/3">
          <ProcessIntroduction />
          <ProcessResultInput />
          <ProcessResultHistory />
        </div>
      </div>
    </div>
  );
};

export default ProcessResultPage;