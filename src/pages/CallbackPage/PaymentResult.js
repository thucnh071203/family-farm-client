// PaymentResult.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentResult = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const query = window.location.search;
        const response = await axios.get(`https://localhost:7280/api/payment/vnpay-return${query}`);

        if (response.data.success) {
          // navigate("/HomeProcessFarmer");
          // navigate("/PaymentSuccess");
          console.log("Payment checkID");
          console.log(response.data.bookingId);
          console.log(response.data.subProcessId);
          navigate("/PaymentSuccess", {
            state: {
              bookingId: response.data.bookingId,
              subProcessId: response.data.subProcessId // nếu có
            }
          });
        } else {
          navigate("/PaymentFailed");
        }
      } catch (error) {
        console.error("Lỗi khi xác minh thanh toán:", error);
        navigate("/PaymentFailed");
      }
    };

    fetchPaymentResult();
  }, [navigate]);

  return <p>Đang xác minh thanh toán...</p>;
};

export default PaymentResult;
