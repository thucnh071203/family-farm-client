import React, { useState, useEffect, useCallback } from "react";
import AccountSencorDetail from "../../components/AccountManage/AccountSencorDetail";
import SidebarDashboard from "../../components/Dashboard/SidebarDashboard";
import { useParams } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
const CensorDetailPage = () => {
  const { accId } = useParams(); // lấy groupId từ URL
  const [account, setAccount] = useState(null);
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
  useEffect(() => {
    fetchAccountCensor();
  }, []);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <SidebarDashboard />

      <div className="flex-1 bg-[rgba(61,179,251,0.05)]">
        {account ? (
          <AccountSencorDetail account={account} />
        ) : (
          <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
        )}
      </div>
    </div>
  );
};

export default CensorDetailPage;
