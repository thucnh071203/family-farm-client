
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import { useEffect } from "react";

const ListPayment = () => {

    useEffect(() => {
        $('#paymentTable').DataTable();
    }, []);

    const paymentData = [
        {
            serviceName: "CEuzsMlPzuwZy4qkR...",
            farmer: "Phuong Nam",
            expert: "Huu Thuc",
            status: "Not yet",
            price: 250.0,
            payAt: "",
        },
        {
            serviceName: "CEuzsMlPzuwZy4qkR...",
            farmer: "Phuong Nam",
            expert: "Huu Thuc",
            status: "Waiting",
            price: 250.0,
            payAt: "Aug, 21 2025",
        },
        {
            serviceName: "CEuzsMlPzuwZy4qkR...",
            farmer: "Phuong Nam",
            expert: "Huu Thuc",
            status: "Confirmed",
            price: 250.0,
            payAt: "Aug, 21 2025",
        },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case "Not yet":
                return "text-[#3E3F5E]/25";
            case "Waiting":
                return "text-[#EF3E36]";
            case "Confirmed":
                return "text-[#2BB673]";
            default:
                return "";
        }
    };

    return (
        <>
            <div className="w-full bg-[#3DB3FB]/5">
                {/* Data Table */}
                <div className="bg-white p-4 rounded shadow">
                    <table id="paymentTable" className="display w-full">
                        <thead>
                            <tr className="bg-[#3DB3FB]/25">
                                <th>Service name</th>
                                <th>Farmer</th>
                                <th>Expert</th>
                                <th>Status</th>
                                <th className="align-middle">Price</th>
                                <th>Pay At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((payment, index) => (
                                <tr key={index} className="py-0.5">
                                    <td className="text-left">{payment.serviceName}</td>
                                    <td className="text-left">{payment.farmer}</td>
                                    <td className="text-left">{payment.expert}</td>
                                    <td className={`font-bold text-left ${getStatusClass(payment.status)}`}>{payment.status}</td>
                                    <td className="text-right">{payment.price.toFixed(2)}</td>
                                    <td className="text-left">{payment.payAt}</td>
                                    <td className="text-left">
                                        {(payment.status === "Waiting" || payment.status === "Not yet") ? (
                                            <button className="bg-[#3DB3FB]/25 text-[#3DB3FB] text-sm px-2 py-0.5 rounded font-semibold">
                                                Confirm
                                            </button>
                                        ) : (
                                            <button className="invisible text-sm px-2 py-0.5">
                                                Confirm
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ListPayment;