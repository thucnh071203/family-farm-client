import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import YourGroupDetailListItem from "../../components/Group/YourGroupDetailListItem";
import GroupDetailHeader from "../../components/Group/GroupDetailHeader";
import RequestGroupCard from "../../components/Group/RequestGroupCard";
import MemberPermission from "../../components/Group/MemberPermission";
import MemberCard from "../../components/Group/MemberCard";
import PopularService from "../../components/Services/PopularService";
import { useParams } from "react-router-dom";
const GroupDetailPage = () => {
  const { id } = useParams(); // lấy groupId từ URL
  const [groupDetail, setGroupDetail] = useState(null);
  const [listMemberOfgroup, setListmember] = useState([]);

  // get list request join group
  const [listRequestToJoin, setListRequestToJoin] = useState([]);

  // select home, member,...
  const [selectedTab, setSelectedTab] = useState("members");

  //List your group đã join
  const [yourGroupsData, setGroupData] = useState([]);

  // get your group
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

  const fetchGroupDetailData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }

      const res = await fetch(
        `https://localhost:7280/api/group/get-by-id/${id}`,
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

      setGroupDetail(data);
    } catch (err) {
      console.error("Error fetching groups:", err.message || err);
    } finally {
    }
  };
  // get list member
  const fetchListMemberData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }

      const res = await fetch(
        `https://localhost:7280/api/group-member/users/in-group/${id}`,
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
      console.log("List member from API:", data);

      if (Array.isArray(data)) {
        setListmember(data);
      } else {
        console.warn("Unexpected response format:", data);
        setListmember([]);
      }
    } catch (err) {
      console.error("Error fetching groups:", err.message || err);
    } finally {
    }
  };

  useEffect(() => {
    fetchGroupDetailData();
    fetchListMemberData();
  }, [id]); // Chạy lại khi id trong URL thay đổi

  useEffect(() => {
    fetchYourGroupsData();
  }, []); // chỉ muốn lấy danh sách group một lần

  return (
    <div>
      <Header />
      <NavbarHeader />
      <div className="flex pt-36 ml-[120px] gap-6">
        <div className="w-[342px] flex flex-col gap-6">
          <YourGroupDetailListItem YourGroupList={yourGroupsData} />
          <PopularService />
        </div>
        <div>
          <GroupDetailHeader
            group={groupDetail}
            countMember={listMemberOfgroup.length}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === "posts" && <MemberCard />}
          {selectedTab === "members" && <MemberCard />}
          {selectedTab === "requests" && <div>
            <RequestGroupCard />
            <RequestGroupCard />
            <RequestGroupCard />
          </div>}
          {selectedTab === "permission" && <MemberPermission />}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
