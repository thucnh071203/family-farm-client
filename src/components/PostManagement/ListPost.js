import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import { Link } from "react-router-dom";
import TablePostManagement from "./TablePostManagement";

const ListPost = () => {
  const [listPost, setListPost] = useState([]);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://localhost:7280/api/post/list-post-for-admin`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === true) {
        setListPost(data.data);
      } else {
        setListPost([]);
      }
    } catch (err) {
      console.error("Error fetching list post:", err.message || err);
    } finally {
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    const table = $("#postTable").DataTable();
    return () => {
      table.destroy();
    };
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
          <Link to="/PostManagement">/Post Management</Link>
        </span>
      </div>
      <h1 className="text-[#3DB3FB] text-2xl font-bold text-left mb-5 mt-3">
        POST MANAGEMENT
      </h1>

      <div style={{ width: "90%" }}>
        <TablePostManagement listPost={listPost} />
      </div>
    </div>
  );
};
export default ListPost;
