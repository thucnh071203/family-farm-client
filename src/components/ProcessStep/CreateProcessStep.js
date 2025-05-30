import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuProcessStep from "./MenuProcessStep";
import "./createProcessStepstyle.css";
import ProcessNav from "../ProcessNav/ProcessNav";
import Header from "../Header/Header";
import avaiProcess from "../../assets/images/fluent_person-available-20-filled.png";
import unpaidOrder from "../../assets/images/material-symbols_warning.png";
import waitingOrder from "../../assets/images/medical-icon_waiting-area.png";
import attentionIcon from "../../assets/images/icon-park-solid_attention.png";
import addStepIcon from "../../assets/images/ic_baseline-plus.svg";

const CreateProcessStep = () => {
  return (
    <div className="pt-16 progress-management">
      <div className="px-2 mx-auto div max-w-7xl">
        <ProcessNav />
        <div className="flex flex-col w-full gap-6 mt-6 progress-container lg:mt-14 lg:flex-row lg:justify-center">
          <div className="progress-left w-full lg:w-[32%] xl:w-[344px] lg:max-w-[344px]">
            <div className="w-full overlap-wrapper">
              <div className="flex flex-col w-full overlap-3">
                <div className="text-wrapper-7 mt-[16px] ml-[16px]">Menu</div>
                <div className="status-progress-container mt-[13px] flex flex-col justify-center items-center gap-6">
                  <div className="frame-3 w-[91.3%]">
                    <img className="img-2" src={avaiProcess} />
                    <div className="text-wrapper-8">List of available processes</div>
                  </div>
                  <div className="frame-4 w-[91.3%]">
                    <img className="img-2" src={unpaidOrder} />
                    <div className="text-wrapper-8">List of unpaid orders</div>
                  </div>
                  <div className="frame-5 w-[91.3%]">
                    <img className="img-2" src={waitingOrder} />
                    <div className="text-wrapper-8">List of orders waiting</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 attention-container">
              <div className="flex flex-row items-center gap-2 frame-18">
                <div className="img"><img className="mask-group" src={attentionIcon} /></div>
                <div className="text-wrapper-16">ATTENTION</div>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-center gap-1 mt-4 frame-17">
                <div className="text-wrapper-19">You have</div>
                <div className="text-wrapper-20">3 progress</div>
                <div className="text-wrapper-19">need confirmation of completion</div>
              </div>
            </div>
          </div>
          <div className="progress-right w-full lg:w-[66.5%] xl:w-[830px] lg:max-w-[830px]">
            <div className="create-progress-container flex-1 p-6">
              <h1 className="mb-4 text-2xl font-bold create-container-title text-start">Create New Process</h1>

              <div className="header-section mb-6">
                <div className="flex flex-col md:flex-row items-center gap-7  mb-2">
                  <div className="first-header flex items-center gap-4">
                    <span className="font-semibold">Customer - </span>
                    <div className="user-container w-[147px] p-[10px] flex flex-row items-center gap-2 rounded-xl">
                      <img
                        src="https://mcdn.coolmate.me/image/October2023/nhan-vat-doraemon-3012_329.jpg"
                        alt="Customer Avatar"
                        className="w-[32px] h-[32px] rounded-full"
                      />
                      <span className="user-name">Phuong Nam</span>
                    </div>
                  </div>
                  <div className="second-header flex gap-2">
                    <span className="font-semibold">For booking service - </span>
                    <span className="ml-auto text-blue-600 cursor-pointer hover:underline">
                      Support Coursera online of FPT
                    </span>
                  </div>
                </div>
              </div>

              <div className="basic-info-section flex flex-col items-start rounded-[10px] gap-6 w-full p-4">
                <div className="basic-title">Basic Information for proces</div>
                <input className="text-title-basic w-full px-4 py-6 rounded-[10px] border outline-none" type="text" placeholder="Write title for this process" />
                <textarea
                  className="text-description-basic w-full p-4 rounded-[10px] border outline-none" rows={5}
                  placeholder="Write short description for this process"
                ></textarea>
              </div>

              <div className="progress-list-section space-y-6 mt-7">
                <div className="progress-step-container flex flex-row gap-[50px]">
                  <div className="step-num-section">
                    <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full">
                      1
                    </div>
                  </div>
                  <div className="step-form-section flex flex-col gap-6 p-4 w-full bg-white rounded shadow">
                    <input className="text-title-basic w-full px-4 py-6 rounded-[10px] border outline-none" type="text" placeholder="Write title for process step" />
                    <textarea
                      className="text-description-basic w-full p-4 rounded-[10px] border outline-none" rows={5}
                      placeholder="Write descriptio detail for process step"
                    ></textarea>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center justify-center w-24 h-24 text-gray-400 border-2 border-dashed rounded cursor-pointer">
                        Drop file here to upload
                      </div>
                    </div>
                  </div>
                </div>

                <div className="progress-step-container flex flex-row gap-[50px]">
                  <div className="step-num-section">
                    <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full">
                      2
                    </div>
                  </div>
                  <div className="step-form-section p-4 flex flex-col gap-6 w-full bg-white rounded shadow">
                    <input className="text-title-basic w-full px-4 py-6 rounded-[10px] border outline-none" type="text" placeholder="Write title for process step" />
                    <textarea
                      className="text-description-basic w-full p-4 rounded-[10px] border outline-none" rows={5}
                      placeholder="Write descriptio detail for process step"
                    ></textarea>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center justify-center w-24 h-24 text-gray-400 border-2 border-dashed rounded cursor-pointer">
                        Drop file here to upload
                      </div>
                    </div>
                    <button className="px-4 py-2 mt-4 text-red-700 bg-red-100 rounded hover:bg-red-200 max-w-[108px]">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="add-new-step flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full mt-5 cursor-pointer">
                <img
                  src={addStepIcon}
                  alt="Customer Avatar"
                  className="w-[32px] h-[32px] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateProcessStep;
