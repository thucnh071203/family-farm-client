import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableListAccount from "./TableListAccount";

const ListAccountSensor = () => {
  const [listSensor, setListSensor] = useState([]);
  const [listSensored, setListSensored] = useState([]);
  const [listUnSensor, setListUnSensor] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const fetchListCensor = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://localhost:7280/api/account/list-censor/68007b2a87b41211f0af1d57`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setListSensor(data);
        const censored = data.filter((item) => item.status !== 2);
        const unCensored = data.filter((item) => item.status === 2);
        setListSensored(censored);
        setListUnSensor(unCensored);
      } else {
        setListSensor([]);
        setListSensored([]);
        setListUnSensor([]);
      }
    } catch (err) {
      console.error("Error fetching list censor:", err.message || err);
    }
  };

  useEffect(() => {
    fetchListCensor();
  }, []);

  const currentList =
    activeTab === "all"
      ? listSensor
      : activeTab === "censored"
      ? listSensored
      : listUnSensor;

  return (
    <div className="ml-20 mt-3">
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
          <Link to="/Dashboard">HOME</Link>
        </div>
        <span className="font-semibold flex items-center gap-2 py-3 text-sm text-[rgba(62,63,94,0.25)]">
          / Account Censor
        </span>
      </div>

      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-5 mt-3">
        ACCOUNT SENSOR
      </h1>

      <div className="flex space-x-6 mt-2 text-sm font-bold text-center">
        {["all", "censored", "uncensored"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-[10%] ${
              activeTab === tab
                ? "text-[#3DB3FB] shadow-[0_2px_0_0_#3DB3FB]"
                : ""
            } hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB]`}
          >
            {tab === "all"
              ? "All"
              : tab === "censored"
              ? "Sensored"
              : "Uncensored"}
          </button>
        ))}
      </div>

      <div style={{ width: "90%" }}>
        <TableListAccount displayList={currentList} isCensor={true} />
      </div>
    </div>
  );
};

export default ListAccountSensor;
