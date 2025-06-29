import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import { Link } from "react-router-dom";
import TableListAccount from "../AccountManage/TableListAccount";
import TableListCateService from "./TableListCateService";
const ListCateService = () => {
  const [allList, setAllList] = useState([]);
  const [farmerList, setFarmerList] = useState([]);
  const [expertList, setExpertList] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const fetchAllService = async () => {
    try {
      const res = await fetch(
        "https://localhost:7280/api/category-service/all"
      );
      const data = await res.json();
      if (Array.isArray(data.data)) {
        setAllList(data.data);
      }
    } catch (err) {
      console.error("Error fetching all:", err);
    }
  };

  const fetchFarmerAccounts = async () => {
    try {
      const res = await fetch(
        "https://localhost:7280/api/account/list-censor/68007b0387b41211f0af1d56"
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setFarmerList(data);
      }
    } catch (err) {
      console.error("Error fetching farmer:", err);
    }
  };

  const fetchExpertAccounts = async () => {
    try {
      const res = await fetch(
        "https://localhost:7280/api/account/list-censor/68007b2a87b41211f0af1d57"
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setExpertList(data);
      }
    } catch (err) {
      console.error("Error fetching expert:", err);
    }
  };

  useEffect(() => {
    fetchAllService();
  }, []);

  return (
    <div className="ml-20 mt-3 ">
      <div className="flex">
        <div className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.52734 13V8.5H9.52734V13H13.2773V7H15.5273L8.02734 0.25L0.527344 7H2.77734V13H6.52734Z"
              fill="rgba(62,63,94,0.25)"
            />
          </svg>
          <Link to={"/Dashboard"}>HOME</Link>
        </div>
        <span className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          <Link to="/CateService">/Category service</Link>
        </span>
      </div>
      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-5 mt-3">
        CATEGORY SERVICE
      </h1>
      <div className="text-left mb-3">
        <Link to="/CateService/Create">
          <button className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 text-sm">
            New Service Category
          </button>
        </Link>
      </div>

      <div className="flex space-x-6 mt-2 text-sm text-black-500 font-bold text-center ">
        <button
          onClick={() => {
            setActiveTab("all");
            fetchAllService();
          }}
          className="w-[10%] hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB]"
        >
          All
        </button>
        <button
          onClick={() => {
            setActiveTab("farmer");
            fetchFarmerAccounts();
          }}
          className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%]"
        >
          Analystics
        </button>
      </div>
      <div style={{ width: "90%" }}>
        <TableListCateService
          displayList={
            activeTab === "all"
              ? allList
              : activeTab === "farmer"
              ? farmerList
              : expertList
          }
          // onDeleted={
          //   activeTab === "all"
          //     ? fetchAllService
          //     : activeTab === "farmer"
          //     ? fetchFarmerAccounts
          //     : fetchExpertAccounts
          // }
          onDeleted={fetchAllService}
        />
      </div>
    </div>
  );
};

export default ListCateService;
