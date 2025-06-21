import React, { useState, useEffect, useCallback } from "react";
import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
import { useParams } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import AccountDetail from "../../components/AccountManage/AccountDetail";
const AccountDetailPage = () => {
  const { accId } = useParams(); // lấy groupId từ URL
  const [account, setAccount] = useState(null);
  const [listPost, setListPost] = useState([]);
  const [listService, setListService] = useState([]);
  const fetchAccountCensor = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://localhost:7280/api/account/get-by-accId/${accId}`,
        {
          method: "GET",
          headers: {
            //Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log("no data jjksdhfksdfnskdnfksdnfjk");
      if (data !== null) {
        setAccount(data);
        console.log(data.fullName + "   account censor");
      } else {
        console.log("no data jjksdhfksdfnskdnfksdnfjk");
        setAccount(null);
      }
    } catch (err) {
      console.error("Error fetching account censor:", err.message || err);
    } finally {
    }
  };

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://localhost:7280/api/post/account/${accId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
  const fetchService = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://localhost:7280/api/service/all-by-account/${accId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data.success === true) {
        setListService(data.data);
      } else {
        setListService([]);
      }
    } catch (err) {
      console.error("Error fetching account service:", err.message || err);
    } finally {
    }
  };
  useEffect(() => {
    fetchAccountCensor();
    fetchPost();
    fetchService();
  }, [accId]);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <SidebarDashboard />

      <div className="flex-1 bg-[rgba(61,179,251,0.05)]">
        {account ? (
          <AccountDetail
            account={account}
            listPost={listPost}
            listService={listService}
          />
        ) : (
          <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
        )}
      </div>
    </div>
  );
};
export default AccountDetailPage;
