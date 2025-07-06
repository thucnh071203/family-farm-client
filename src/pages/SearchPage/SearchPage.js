import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import PostInGroupRight from "../../components/Group/PostInGroupRight";
import SearchSidebar from "../../components/Search/SearchSidebar";
import SearchPost from "../../components/Search/SearchPost";

const SearchPage = () => {
  const location = useLocation();
  const [section, setSection] = useState("search-post");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state?.section) {
      setSection(location.state.section);
    }
    if (location.state?.keyword) {
      setKeyword(location.state.keyword);
    } else {
      setKeyword("");
    }
  }, [location]);

  return (
    <div>
      <Header />
      <NavbarHeader />
      <div className="flex h-screen">
        <SearchSidebar setSection={setSection} />
        {section === "search-post" && <SearchPost keyword={keyword} />}
        {section === "search-user" && <PostInGroupRight />}
        {section === "search-group" && <PostInGroupRight />}
        {section === "search-service" && <PostInGroupRight />}
      </div>
    </div>
  );
};

export default SearchPage;