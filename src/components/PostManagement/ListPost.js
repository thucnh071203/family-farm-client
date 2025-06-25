import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import { useEffect } from "react";

const ListPost = ({ filter }) => {
    const postData = [
        {
            postId: "POST123",
            title: "Cần tư vấn trồng lúa",
            owner: "Nguyen Van A",
            createdAt: "Aug 20, 2025",
            isDeleted: false,
        },
        {
            postId: "POST124",
            title: "Hỏi về bệnh cây cà chua",
            owner: "Tran Thi B",
            createdAt: "Aug 21, 2025",
            isDeleted: true,
        },
        {
            postId: "POST125",
            title: "Kỹ thuật nuôi cá",
            owner: "Le Van C",
            createdAt: "Aug 22, 2025",
            isDeleted: false,
        },
    ];

    useEffect(() => {
        const table = $('#postTable').DataTable();
        return () => {
            table.destroy();
        };
    }, []);

    const getStatusClass = (isDeleted) => {
        return isDeleted ? "text-[#EF3E36]" : "text-[#2BB673]";
    };

    const filteredPosts = () => {
        if (filter === "Availability") {
            return postData.filter(post => !post.isDeleted);
        } else if (filter === "Deleted") {
            return postData.filter(post => post.isDeleted);
        }
        return postData;
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <table id="postTable" className="display w-full">
                <thead>
                    <tr className="bg-[#3DB3FB]/25">
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts().map((post, index) => (
                        <tr key={index} className="py-0.5">
                            <td className="text-left">{post.title}</td>
                            <td className="text-left">{post.owner}</td>
                            <td className="text-left">{post.createdAt}</td>
                            <td className={`font-bold text-left ${getStatusClass(post.isDeleted)}`}>
                                {post.isDeleted ? "Deleted" : "Active"}
                            </td>
                            <td className="text-left">
                                {post.isDeleted ? (
                                    <button className="bg-[#3DB3FB]/25 text-[#3DB3FB] text-sm px-2 py-0.5 rounded font-semibold">
                                        Restore
                                    </button>
                                ) : (
                                    <button className="bg-[#EF3E36]/25 text-[#EF3E36] text-sm px-2 py-0.5 rounded font-semibold">
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPost;