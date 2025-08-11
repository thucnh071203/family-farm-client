import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useLocation } from "react-router-dom";
import YourFriendCard from "../../components/Friend/YourFriendCard";
import instance from "../../Axios/axiosConfig";

const SearchUser = () => {
    const { state } = useLocation();
    const initialKeyword = state?.keyword || "";
    const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
    const [usersData, setUsersData] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const popupRef = useRef(null);
    const lastFetchedKeyword = useRef("");

    const fetchUsers = async (keywordToSearch = searchKeyword) => {
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

            const res = await instance.get(`/api/friend/search-users`, {
                params: { keyword: trimmedKeyword },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.isSuccess && res.data.count > 0) {
                setUsersData(res.data.data);
                setCount(res.data.count);
            } else {
                setUsersData([]);
                setCount(0);
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            setError(err.message || "Failed to fetch users");
            setUsersData([]);
            setCount(0);
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
            fetchUsers(searchKeyword);
        }
    }, [searchKeyword]);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7280/friendHub")
            .withAutomaticReconnect()
            .build();

        connection
            .start()
            .then(() => {
                console.log("✅ SignalR connected for SearchUser");
                connection.on("FriendUpdate", () => {
                    console.log("✅ FriendUpdate event received in SearchUser");
                    if (searchKeyword && searchKeyword.trim() !== "") {
                        fetchUsers();
                    }
                });
            })
            .catch((err) => console.error("SignalR connection error:", err));

        return () => {
            connection.stop();
        };
    }, [searchKeyword]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsFilterPopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = () => {
        fetchUsers();
        setIsFilterPopupOpen(false);
    };

    const toggleFilterPopup = () => {
        setIsFilterPopupOpen(!isFilterPopupOpen);
    };

    return (
        <div className="w-full flex flex-col items-center pt-12 lg:mt-[120px] mt-[63px]">
            <div className="w-full max-w-6xl flex flex-col gap-4 px-4">
                <div className="flex justify-between items-center">
                    <div className="text-left">
                        <span className="font-bold">KEYWORD: </span>
                        <span>{searchKeyword || "None"}</span>
                    </div>
                    <button onClick={toggleFilterPopup}>
                        <i className="fas fa-sliders-h text-sky-400 text-xl"></i>
                    </button>
                </div>

                {isFilterPopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div
                            ref={popupRef}
                            className="bg-white p-4 rounded-lg max-h-[80vh] overflow-y-auto w-11/12 max-w-md"
                        >
                            <h3 className="font-bold mb-2">Filter Users</h3>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter new keyword..."
                                    className="search-input p-2 border rounded w-full"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    className="px-3 py-2 bg-blue-500 text-white flex-1"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                                <button
                                    className="px-3 py-1 bg-gray-200 text-gray-800 flex-1"
                                    onClick={toggleFilterPopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : usersData.length > 0 ? (
                    <div>
                        <div className="flex gap-6 items-center mt-6 mb-10">
                            <div className="flex gap-1">
                                <p className="font-bold">{count}</p>
                                <p className="text-[#999999] font-bold">USERS FOUND</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center min-w-0">
                            {usersData.map((user) => (
                                <YourFriendCard key={user.accId} friend={user} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>No users found for "{searchKeyword}"</div>
                )}
            </div>
        </div>
    );
};

export default SearchUser;