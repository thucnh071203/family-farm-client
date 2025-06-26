import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import formatTime from "../../utils/formatTime";

const ListReport = ({ filter }) => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch reports from the API
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const response = await instance.get("/api/report/all");
                const reports = response.data.data; // Access the Data field from ListReportResponseDTO

                // Transform API data to match the table structure
                const transformedData = reports.map((report) => ({
                    reportId: report.report?.reportId || "N/A",
                    reason: report.report?.reason || "No content available",
                    owner: report.reporter?.fullName || "Unknown",
                    status: report.report?.status ? report.report.status.charAt(0).toUpperCase() + report.report.status.slice(1) : "Pending",
                    createdAt: formatTime(report.report?.createdAt) || "N/A",
                }));

                setReportData(transformedData);
                setLoading(false);
            } catch (err) {
                console.error("API Error:", err.response?.status, err.response?.data, err.message);
                setError("Failed to fetch reports. Please try again later.");
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    // Initialize DataTable after data is fetched
    useEffect(() => {
        if (!loading && reportData.length > 0) {
            const table = $("#reportTable").DataTable();
            return () => {
                table.destroy();
            };
        }
    }, [loading, reportData]);

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
            return reportData.filter((report) => report.status === "Pending");
        } else if (filter === "Accepted") {
            return reportData.filter((report) => report.status === "Accepted");
        } else if (filter === "Rejected") {
            return reportData.filter((report) => report.status === "Rejected");
        }
        return reportData;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white p-4 rounded shadow">
            <table id="reportTable" className="display w-full">
                <thead>
                    <tr className="bg-[#3DB3FB]/25">
                        <th>Reason</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports().map((report, index) => (
                        <tr key={index} className="py-0.5">
                            <td className="text-left">{report.reason}</td>
                            <td className="text-left">{report.owner}</td>
                            <td className={`font-bold text-left ${getStatusClass(report.status)}`}>
                                {report.status}
                            </td>
                            <td className="text-left">{report.createdAt}</td>
                            <td className="text-left">
                                {report.status === "Pending" &&
                                    (<Link
                                        to={`/ReportDetail/${report.reportId}`} // Assuming you want to pass reportId to the detail page
                                        className="text-[#3DB3FB] px-2 py-0.5 rounded font-semibold underline"
                                    >
                                        Detail
                                    </Link>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListReport;