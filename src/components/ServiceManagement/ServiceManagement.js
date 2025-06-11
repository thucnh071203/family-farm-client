import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProcessNav from "../ProcessNav/ProcessNav";
import Header from "../Header/Header";
import PopupDeleteService from "../Services/PopupDeleteService";
import PopupToggleService from "../Services/PopupToggleService";
import instance from "../../Axios/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

export const ServiceManagement = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeletePopup, setDeleteShowPopup] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [showTogglePopup, setShowTogglePopup] = useState(false);
  const [toggleServiceId, setToggleServiceId] = useState(null);
  const [isDisabling, setIsDisabling] = useState(true);
  const navigate = useNavigate();

  const handleSelectAll = (e) => {
    setIsAllChecked(e.target.checked);
  };

  // Lọc service theo trạng thái
  const filteredServices = services.filter((service) => {
    if (filterStatus === "available") return service.status === 1;
    if (filterStatus === "unavailable") return service.status !== 1;
    return true; // all
  });


  useEffect(() => {
    const fetchServicesAndCategories = async () => {
      try {
        // Gọi API lấy tất cả dịch vụ theo provider
        const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
        // console.log("📌 Token:", token);
        const serviceRes = await instance.get("/api/service/all-by-provider", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const serviceWrappers = serviceRes.data.data || [];
        const servicesOnly = serviceWrappers.map((item) => item.service);

        // console.log("✅ Danh sách dịch vụ gốc:", servicesOnly);

        // Gọi API từng category name theo categoryServiceId
        const servicesWithCategory = await Promise.all(
          servicesOnly.map(async (s) => {
            try {
              const res = await instance.get(`/api/category-service/get-by-id/${s.categoryServiceId}`);
              // console.log("📦 CategoryService Response:", res.data);
              return {
                ...s,
                categoryName: res.data.data?.[0]?.categoryService?.categoryName || "Unknown",
              };
            } catch {
              return { ...s, categoryName: "Unknown" };
            }
          })
        );

        // console.log("🔄 Dữ liệu sau khi merge với category name:", servicesWithCategory);

        setServices(servicesWithCategory);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesAndCategories();
  }, []);

  const handleDeleteClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    setDeleteShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await instance.delete(`/api/service/delete/${selectedServiceId}`);
      
      // ❗ Cập nhật danh sách sau khi xóa
      setServices(prev => prev.filter(service => service.serviceId !== selectedServiceId));

      toast.success("Delete service successful");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed!");
    } finally {
      setDeleteShowPopup(false);
      setSelectedServiceId(null);
    }
  };

  const handleToggleStatusClick = (serviceId, currentStatus) => {
    setToggleServiceId(serviceId);
    setIsDisabling(currentStatus === 1); // Nếu đang là available thì sắp disable
    setShowTogglePopup(true);
  };


  const handleConfirmToggleStatus = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

      const res = await instance.put(
        `/api/service/change-status/${toggleServiceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setServices((prev) =>
          prev.map((s) =>
            s.serviceId === toggleServiceId
              ? { ...s, status: s.status === 1 ? 0 : 1 }
              : s
          )
        );
        toast.success("Status updated successfully!");
      } else {
        toast.error("Failed to update service status!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setShowTogglePopup(false);
      setToggleServiceId(null);
    }
  };


  return (
    <div className="text-gray-800 bg-white">
      <Header />
      <div className="pt-16 mx-auto progress-management max-w-7xl">
        <ProcessNav />
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-xl font-semibold">Your Services</h2>
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            <Link to="/CreateService">+ New Service</Link>
          </button>
        </div>
        <div className="flex items-center mt-4 space-x-6 lg:gap-40">
          {/* <div className="flex gap-4 lg:gap-8">
            <div className="font-semibold text-blue-600 border-b-2 border-blue-600 cursor-pointer">
              All
            </div>
            <div className="text-gray-400 cursor-pointer">Available</div>
            <div className="text-gray-400 cursor-pointer">Unavailable</div>
          </div> */}
          <div className="flex gap-4 lg:gap-8">
            <div
              className={`cursor-pointer ${filterStatus === "all" ? "font-semibold text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </div>
            <div
              className={`cursor-pointer ${filterStatus === "available" ? "font-semibold text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}
              onClick={() => setFilterStatus("available")}
            >
              Available
            </div>
            <div
              className={`cursor-pointer ${filterStatus === "unavailable" ? "font-semibold text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}
              onClick={() => setFilterStatus("unavailable")}
            >
              Unavailable
            </div>
          </div>

          <button className="flex items-center gap-2 ml-auto text-red-600">
            <i className="fa-solid fa-trash"></i>
            Delete choose
          </button>
        </div>
        <div className="relative mt-4 overflow-x-visible">
          <table className="min-w-full mt-3 text-left border rounded-lg">
            <thead className="bg-gray-100">
              <tr className="font-bold text-left text-gray-600">
                <th className="p-3"></th>
                <th className="p-3">
                  <input className="w-4 h-4"
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleSelectAll}
                  />
                </th>
                {/* <th className="p-3">Service Id</th> */}
                <th className="p-3">Service name</th>
                <th className="hidden p-3 md:table-cell">Price</th>
                <th className="hidden p-3 md:table-cell">Status</th>
                <th className="hidden p-3 md:table-cell">Category name</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-3 text-center">Loading services...</td></tr>
              ) : filteredServices.length === 0 ? (
                <tr><td colSpan={7} className="p-3 text-center">No services found for this expert.</td></tr>
              ) : (
                filteredServices.map((service, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3"></td>
                    <td className="p-3">
                      <input type="checkbox" className="w-4 h-4"
                        checked={isAllChecked}
                        onChange={() => setIsAllChecked(!isAllChecked)} />
                    </td>
                    <td className="p-3">{service.serviceName}</td>
                    <td className="hidden p-3 md:table-cell">{service.price.toLocaleString()} <span>VND</span></td>
                    <td className="hidden p-3 md:table-cell">
                      <span className={`px-2 py-1 text-sm text-white rounded ${service.status === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                        {service.status === 1 ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="hidden p-3 md:table-cell">{service.categoryName}</td>
                    <td className="p-3 space-x-3">
                      <button className="text-sm text-red-500" onClick={() => handleDeleteClick(service.serviceId)}><i className="fa-solid fa-trash"></i> Delete</button>
                      <button className="text-sm text-blue-600" onClick={() => navigate(`/EditService/${service.serviceId}`)}><i className="fa-solid fa-pen"></i> Edit</button>
                      {service.status === 1 ? (
                        <button
                          className="text-sm text-yellow-600"
                          onClick={() => handleToggleStatusClick(service.serviceId, service.status)}
                        >
                          <i className="fa-solid fa-ban"></i> Disable
                        </button>
                      ) : (
                        <button
                          className="text-sm text-green-700"
                          onClick={() => handleToggleStatusClick(service.serviceId, service.status)}
                        >
                          <i className="fa-solid fa-rotate-right"></i> Enable
                        </button>
                      )}

                    </td>
                  </tr>
                ))
              )}
              {showDeletePopup && (
                <PopupDeleteService
                  onClose={() => setDeleteShowPopup(false)}
                  onConfirm={handleConfirmDelete}
                />
              )}
              {showTogglePopup && (
                <PopupToggleService
                  isDisabling={isDisabling}
                  onClose={() => setShowTogglePopup(false)}
                  onConfirm={handleConfirmToggleStatus}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ServiceManagement;