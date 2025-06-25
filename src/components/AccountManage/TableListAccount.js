import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

const TableListAccount = ({ displayList, isCensor }) => {
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    //if (!displayList || displayList.length === 0) return;

    // Huỷ bảng cũ nếu có
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().clear().destroy();
    }

    // Tạo bảng mới
    const table = $(tableRef.current).DataTable({
      data: displayList || [],
      columns: [
        { data: null, title: "ID" },
        { data: "username", title: "Username" },
        { data: "fullName", title: "Fullname" },
        {
          data: "status",
          title: "Status",
          render: (data) => {
            if (isCensor === true) {
              if (data === 0) return "Pass";
              if (data === 1) return "Fail";
              if (data === 2) return "Not yet";
              return "Unknown";
            } else {
              if (data === 0) return "Active";
              if (data === 1) return "Deleted";
              if (data === 2) return "UnActive";
              return "Unknown";
            }
          },
        },
        {
          data: "createdAt",
          title: "Create At",
          render: (data) => new Date(data).toLocaleDateString("vi-VN"),
        },
        {
          data: "accId",
          title: "Action",
          render: (data) =>
            `<button class='btn-detail text-[#3DB3FB] hover:underline' data-id='${data}'>Detail</button>`,
        },
      ],
      columnDefs: [
        {
          targets: 0,
          render: (data, type, row, meta) => meta.row + 1,
          className: "text-left",
          width: "1.25rem",
        },
        {
          targets: "_all",
          className: "text-left",
        },
      ],
      destroy: true,
      searching: true,
    });
    $(tableRef.current).find("thead").addClass("bg-[rgba(61,179,251,0.25)]");

    // Xử lý click nút detail bằng navigate()
    $(tableRef.current).on("click", ".btn-detail", function () {
      const accId = $(this).data("id");
      if (isCensor === true) {
        navigate(`/Dashboard/CensorDetail/${accId}`);
      } else {
        navigate(`/Dashboard/AccountDetail/${accId}`);
      }
    });

    // Dọn dẹp
    return () => {
      $(tableRef.current).off("click", ".btn-detail");
    };
  }, [displayList, navigate]);

  return <table ref={tableRef} className="display w-full"></table>;
};

export default TableListAccount;
