// RePaymentResult.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RePaymentResult = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentResult = async () => {
      console.log("Chay repayment call back");
      try {
        const query = window.location.search;
        // console.log("Query");
        // console.log(query);
        const response = await axios.get(`https://localhost:7280/api/payment/vnpay-return-repayment${query}`);

        if (response.data.success) {
          // ✅ Lưu trạng thái để PaymentManagementPage mở đúng tab
          localStorage.setItem("viewMode", "ExpertPayout");

          // ✅ Điều hướng về trang quản lý thanh toán
          navigate("/PaymentManagement");
        } else {
          navigate("/RePaymentFailed");
        }
      } catch (error) {
        console.error("Lỗi khi xác minh thanh toán:", error);
        console.log("Server response:", error.response?.data);
        navigate("/RePaymentFailed");
      }
    };

    fetchPaymentResult();
  }, [navigate]);

  return <p>Đang xác minh thanh toán...</p>;
};

export default RePaymentResult;
