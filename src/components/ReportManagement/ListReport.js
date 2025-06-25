import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ListReport = ({ filter }) => {
    const reportData = [
        {
            reportId: "RPT001",
            postContent: "Cần tư vấn trồng lúa",
            owner: "Nguyen Van A",
            status: "Pending",
            createdAt: "Aug 20, 2025 10:00",
        },
        {
            reportId: "RPT002",
            postContent: "Hỏi về bệnh cây cà chua",
            owner: "Tran Thi B",
            status: "Accepted",
            createdAt: "Aug 21, 2025 14:30",
        },
        {
            reportId: "RPT003",
            postContent: "Kỹ thuật nuôi cá",
            owner: "Le Van C",
            status: "Rejected",
            createdAt: "Aug 22, 2025 09:15",
        },
    ];

    useEffect(() => {
        const table = $('#reportTable').DataTable();
        return () => {
            table.destroy();
        };
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "text-[#EF3E36]";
            case "Accepted":
                return "text-[#2BB673]";
            case "Rejected":
                return "text-[#3E3F5E]/25";
            default:
                return "";
        }
    };

    const filteredReports = () => {
        if (filter === "Pending") {
            return reportData.filter(report => report.status === "Pending");
        } else if (filter === "Accepted") {
            return reportData.filter(report => report.status === "Accepted");
        } else if (filter === "Rejected") {
            return reportData.filter(report => report.status === "Rejected");
        }
        return reportData;
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <table id="reportTable" className="display w-full">
                <thead>
                    <tr className="bg-[#3DB3FB]/25">
                        <th>Post Content</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports().map((report, index) => (
                        <tr key={index} className="py-0.5">
                            <td className="text-left">{report.postContent}</td>
                            <td className="text-left">{report.owner}</td>
                            <td className={`font-bold text-left ${getStatusClass(report.status)}`}>
                                {report.status}
                            </td>
                            <td className="text-left">{report.createdAt}</td>
                            <td className="text-left">
                                <Link to="/ReportDetail" className="text-[#3DB3FB] px-2 py-0.5 rounded font-semibold underline">
                                    Detail
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListReport;