import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchSidebar = ({ setSection }) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const currentKeyword = state?.keyword || "";

    const handleSectionChange = (section) => {
        setSection(section);
        // Navigate với keyword hiện tại
        navigate("/Search", { 
            state: { 
                section: section, 
                keyword: currentKeyword, 
                categoryIds: state?.categoryIds || [] 
            } 
        });
    };

    return (
        <div className="w-[289px] bg-[#E5E4E9] font-roboto rounded-r-[10px] hidden md:block lg:mt-[120px] mt-[63px] fixed h-full">
            <div className="flex items-start pt-6 ml-8">
                <p className="text-lg font-bold ">GROUP PAGE</p>
            </div>
            <div className="mx-8 mt-11 w-[225px] h-[155px] flex flex-col gap-4">
                <button
                    onClick={() => handleSectionChange("search-post")}
                    className={`hover:bg-[#999999] flex w-full h-10 rounded-[10px] p-3 ${
                        state?.section === "search-post" ? "bg-[#999999]" : ""
                    }`}
                >
                    <div className="flex items-center mx-2">
                        <i className="fa-solid fa-file-invoice"></i>
                    </div>
                    <div className="flex items-center font-bold">Post</div>
                </button>

                <button
                    onClick={() => handleSectionChange("search-user")}
                    className={`hover:bg-[#999999] flex w-full h-10 rounded-[10px] p-3 ${
                        state?.section === "search-user" ? "bg-[#999999]" : ""
                    }`}
                >
                    <div className="flex items-center mx-2">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="flex items-center font-bold">User</div>
                </button>

                <button
                    onClick={() => handleSectionChange("search-group")}
                    className={`hover:bg-[#999999] flex w-full h-10 rounded-[10px] p-3 ${
                        state?.section === "search-group" ? "bg-[#999999]" : ""
                    }`}
                >
                    <div className="flex items-center mx-2">
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <div className="flex items-center font-bold">Group</div>
                </button>
            </div>
        </div>
    );
};

export default SearchSidebar;