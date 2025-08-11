import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useLocation } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { toast, Bounce } from "react-toastify";
import SuggestionGroupCard from "../Group/SuggestionGroupCard";

const SearchGroup = () => {
    const { state } = useLocation();
    const initialKeyword = state?.keyword || "";
    const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
    const [groupsData, setGroupsData] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const popupRef = useRef(null);
    const lastFetchedKeyword = useRef("");

    const fetchGroups = async (keywordToSearch = searchKeyword) => {
        const trimmedKeyword = keywordToSearch?.trim();
        if (!trimmedKeyword || trimmedKeyword === lastFetchedKeyword.current) {
            setIsLoading(false);
            return;
        }
        lastFetchedKeyword.current = trimmedKeyword;

        try {
            setIsLoading(true);
            setError(null);

            const token = localStorage.getItem("accessToken");
            if (!token) {
                throw new Error("No access token found");
            }

            const res = await instance.get(`/api/group/search`, {
                params: { q: trimmedKeyword }, // Updated to use 'q' as the query parameter
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success && res.data.count > 0) {
                // Map the response data to match the expected format for SuggestionGroupCard
                const formattedGroups = res.data.data.map((item) => ({
                    groupId: item.group.groupId,
                    groupName: item.group.groupName,
                    groupAvatar: item.group.groupAvatar,
                    groupBackground: item.group.groupBackground,
                    memberCount: item.numberInGroup, // Map numberInGroup to memberCount
                }));
                setGroupsData(formattedGroups);
                setCount(res.data.count);
            } else {
                setGroupsData([]);
                setCount(0);
            }
        } catch (err) {
            console.error("Error fetching groups:", err);
            setError(err.message || "Failed to fetch groups");
            setGroupsData([]);
            setCount(0);
            toast.error("Failed to fetch groups.", {
                transition: Bounce,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (initialKeyword && initialKeyword !== searchKeyword) {
            setSearchKeyword(initialKeyword);
        }
    }, [initialKeyword]);

    useEffect(() => {
        if (searchKeyword) {
            fetchGroups(searchKeyword);
        }
    }, [searchKeyword]);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7280/groupHub")
            .withAutomaticReconnect()
            .build();

        connection
            .start()
            .then(() => {
                console.log("✅ SignalR connected for SearchGroup");
                connection.on("GroupUpdate", () => {
                    console.log("✅ GroupUpdate event received in SearchGroup");
                    if (searchKeyword && searchKeyword.trim() !== "") {
                        fetchGroups();
                    }
                });
            })
            .catch((err) => console.error("SignalR connection error:", err));

        return () => {
            connection.stop();
        };
    }, [searchKeyword]);

    return (
        <div className="w-full flex flex-col items-center pt-12 lg:mt-[120px] mt-[63px]">
            <div className="w-full max-w-6xl flex flex-col gap-4 px-4">
                <div className="flex justify-between items-center">
                    <div className="text-left">
                        <span className="font-bold">KEYWORD: </span>
                        <span>{searchKeyword || "None"}</span>
                    </div>
                </div>

                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : groupsData.length > 0 ? (
                    <div>
                        <div className="flex gap-6 items-center mt-6 mb-10">
                            <div className="flex gap-1">
                                <p className="font-bold">{count}</p>
                                <p className="text-[#999999] font-bold">GROUPS FOUND</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center min-w-0">
                            {groupsData.map((group) => (
                                <SuggestionGroupCard
                                    key={group.groupId}
                                    group={group}
                                    member={group.memberCount}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>No groups found for "{searchKeyword}"</div>
                )}
            </div>
        </div>
    );
};

export default SearchGroup;