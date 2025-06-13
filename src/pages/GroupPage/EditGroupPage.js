import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import YourGroupDetailListItem from "../../components/Group/YourGroupDetailListItem";
import EditGroupForm from "../../components/Group/EditGroupForm";
import PopularService from "../../components/Services/PopularService";

export default function EditGroupPage() {
    const [yourGroupsData, setGroupData] = useState([]);

    const fetchYourGroupsData = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No access token found.");
                return;
            }

            const res = await fetch(
                `https://localhost:7280/api/group/all-group-user`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            // Kiểm tra dữ liệu và cập nhật state
            if (Array.isArray(data)) {
                setGroupData(data);
                console.log(data[0]);
            } else {
                console.warn("Unexpected response format:", data);
                setGroupData([]);
            }
        } catch (err) {
            console.error("Error fetching groups:", err.message || err);
        } finally {
        }
    };

    useEffect(() => {
        fetchYourGroupsData();
    }, []);

    return (
        <div>
            <Header />
            <NavbarHeader />
            <div className="flex pt-36 ml-[120px] gap-6">
                <div className="w-[342px] flex flex-col gap-6">
                    <YourGroupDetailListItem YourGroupList={yourGroupsData} />
                    <PopularService />
                </div>
                <EditGroupForm />
            </div>
        </div >
    );
}