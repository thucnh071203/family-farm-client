import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import { Link } from "react-router-dom";
const ListAccountSensor = () => {
  const tableRef = useRef(null);
  const [listSensor, setListSensor] = useState([]);

  const fetchListCensor = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `https://localhost:7280/api/account/list-censor/68007b2a87b41211f0af1d57`,
        {
          method: "GET",
          headers: {
            //Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setListSensor(data);
        console.log(data[1].fullName + "abbccncnsjf");
      } else {
        console.log("no data jjksdhfksdfnskdnfksdnfjk");
        setListSensor([]);
      }
    } catch (err) {
      console.error("Error fetching list censor:", err.message || err);
    } finally {
    }
  };

  useEffect(() => {
    fetchListCensor();
  }, []);

  useEffect(() => {
    if (listSensor.length > 0) {
      // Hủy DataTable cũ nếu có
      const oldTable = $(tableRef.current).DataTable();
      if (oldTable) {
        oldTable.destroy();
      }

      // Dùng setTimeout để đảm bảo bảng đã được render xong
      setTimeout(() => {
        $(tableRef.current).DataTable();
      }, 0);
    }
  }, [listSensor]);
  return (
    <div className="ml-20 mt-8">
      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-8">
        ACCOUNT SENSOR
      </h1>
      <div className="flex space-x-6 mt-2 text-sm text-black-500 font-bold text-center ">
        <button className="w-[10%] hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB]">
          All
        </button>
        <button className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%]">
          Sensored
        </button>
        <button className="hover:shadow-[0_2px_0_0_#3DB3FB] hover:text-[#3DB3FB] w-[10%] ">
          Uncensored
        </button>
      </div>
      <div style={{ width: "90%" }}>
        <table ref={tableRef} className="display " style={{ width: "100%" }}>
          <thead className="bg-[rgba(61,179,251,0.25)]">
            <tr>
              <th className="w-5">ID</th>
              <th className="">Username</th>
              <th>Fullname</th>
              <th>Status</th>
              <th>Create At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {listSensor.map((account, index) => (
              <tr key={account.accId || index}>
                <td>{index + 1}</td>
                <td>{account.username}</td>
                <td>{account.fullName}</td>
                <td>
                  {account.status === 2
                    ? "Not yet"
                    : account.status === 0
                    ? "Pass"
                    : account.status === 1
                    ? "Fail"
                    : "Unknown"}
                </td>
                <td>
                  {" "}
                  {new Date(account.createdAt).toLocaleDateString("vi-VN")}{" "}
                  &nbsp;&nbsp;{" "}
                </td>
                <td>
                  <Link
                    to={`/Dashboard/CensorDetail/${account.accId}`}
                    className=" hover:text-[#3DB3FB]"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAccountSensor;
