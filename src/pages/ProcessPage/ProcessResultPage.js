import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import ProcessSteps from "../../components/ProcessResult/ProcessSteps";
import ProcessIntroduction from "../../components/ProcessResult/ProcessIntroduction";
import ProcessResultInput from "../../components/ProcessResult/ProcessResultInput";
import ProcessResultHistory from "../../components/ProcessResult/ProcessResultHistory";

const ProcessResultPage = () => {
  const location = useLocation();

  //2 BIẾN NÀY LÀ DỮ LIỆU SUBPROCESS VÀ STEP CỦA NÓ ĐƯỢC TRUYỀN TỪ LIST PROCESS
  const { SubprocessData, ProcessStepsData } = location.state || {};

  return (
    <div>
      <Header />
      <NavbarHeader />
      <div className="flex flex-col gap-5 p-6 mx-auto md:flex-row max-w-7xl pt-[130px] text-left">
        {/* Left Section: Process Steps */}
        <div className="md:w-1/3">
          <ProcessSteps ProcessStepsData={ProcessStepsData}/>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5 md:w-2/3">
          <ProcessIntroduction SubprocessData={SubprocessData}/>
          <ProcessResultInput />
          <ProcessResultHistory />
        </div>
      </div>
    </div>
  );
};

export default ProcessResultPage;