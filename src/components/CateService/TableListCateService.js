import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import React, { useEffect, useRef } from "react";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import eye from "../../assets/icons/eye.svg";
const TableListCateService = ({ displayList, onDeleted }) => {
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const handleDelete = (cateId, onDeleted) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // <-- Sửa ở đây
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("accessToken");

          const res = await fetch(
            `https://localhost:7280/api/category-service/delete/${cateId}/`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.json();
          if (data.success === true) {
            Swal.fire(
              "Deleted!",
              "The category service has been deleted.",
              "success"
            );
            onDeleted?.();
          }
        } catch (err) {
          console.error("Error fetching account censor:", err.message || err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };
  const handleDetail = async (cateId, status) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `https://localhost:7280/api/category-service/get-by-id/${cateId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data === true) {
        Swal.fire("Deleted!", "The account has been deleted.", "success");
        onDeleted?.(); // gọi callback nếu có
      }
    } catch (err) {
      console.error("Error fetching account censor:", err.message || err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const handleEdit = async (cateId, status) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `https://localhost:7280/api/account/update-censor/${cateId}/1`,
        {
          method: "PUT",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data.success === true) {
        Swal.fire(
          "Deleted!",
          "The category service has been deleted.",
          "success"
        );
        onDeleted?.(); // gọi callback nếu có
      }
    } catch (err) {
      console.error("Error fetching account censor:", err.message || err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  useEffect(() => {
    let dtInstance; //Khai báo ở đây
    const timeout = setTimeout(() => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().clear().destroy();
      }
      $(tableRef.current).DataTable({
        data: displayList,
        columns: [
          { data: null, title: "ID" },
          {
            title: "Category Name",
            render: (data, type, row) =>
              row.categoryService?.categoryName || "No content",
          },
          {
            title: "Description",
            render: (data, type, row) =>
              row.categoryService?.categoryDescription || "Unknown",
          },
          {
            title: "Status",
            render: (data, type, row) =>
              row.categoryService?.isDeleted ? "Deleted" : "Not deleted",
          },
          {
            title: "Created At",
            render: (data, type, row) =>
              row.categoryService?.createAt
                ? new Date(row.categoryService.createAt).toLocaleDateString(
                    "vi-VN"
                  )
                : "N/A",
          },
          {
            title: "Action",
            render: (data, type, row) =>
              `
               <button class='btn-edit hover:underline' data-id='${row.categoryService?.categoryServiceId}'>
                  <img src='${edit}' alt="" />
               </button>
               <button class='btn-delete hover:underline' data-id='${row.categoryService?.categoryServiceId}'>
                  <img src='${trash}' alt="" />
               </button>`,
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

      // Gắn click cho nút Detail
      $(tableRef.current).on("click", ".btn-detail", function () {
        const accId = $(this).data("id");

        navigate(`/CateServiceDetail/${accId}`);
      });

      // Gắn click cho nút Delete
      $(tableRef.current).on("click", ".btn-delete", function () {
        const cateId = $(this).data("id");
        handleDelete(cateId);
      });
    }, 100);
    // Cleanup
    return () => {
      $(tableRef.current).off("click", ".btn-detail");
      $(tableRef.current).off("click", ".btn-edit");
      $(tableRef.current).off("click", ".btn-delete");
    };
    if (dtInstance) {
      dtInstance.destroy(true); // Dọn sạch DataTables DOM
    }
  }, [displayList, navigate]);

  return <table id="table" ref={tableRef} className="display w-full"></table>;
};

export default TableListCateService;
