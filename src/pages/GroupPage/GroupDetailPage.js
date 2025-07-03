import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import YourGroupDetailListItem from "../../components/Group/YourGroupDetailListItem";
import GroupDetailHeader from "../../components/Group/GroupDetailHeader";
import RequestGroupCard from "../../components/Group/RequestGroupCard";
import MemberPermission from "../../components/Group/MemberPermission";
import MemberCard from "../../components/Group/MemberCard";
import PopularService from "../../components/Services/PopularService";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import instance from "../../Axios/axiosConfig";
import { useSignalR } from "../../context/SignalRContext";

const GroupDetailPage = () => {
  const { id } = useParams(); // lấy groupId từ URL
  const [groupDetail, setGroupDetail] = useState(null);
  const [listMemberOfgroup, setListmember] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [memberStatus, setMemberStatus] = useState(null);
  const [userAccId, setUserAccId] = useState(null);
  const [groupReload, setGroupReload] = useState(null);
  const { connection } = useSignalR();

  // get list request join group
  const [listRequestToJoin, setListRequestToJoin] = useState([]);

  // select home, member,...
  const [selectedTab, setSelectedTab] = useState("members");

  //List your group đã join
  const [yourGroupsData, setGroupData] = useState([]);

  //Load trang signalR
  const ReloadSignlR = useCallback(async () => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const res = await instance.get(`/api/group/get-by-id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const groupDataRaw = res.data?.data ? res.data.data : res.data;
      const groupData = Array.isArray(groupDataRaw)
        ? groupDataRaw[0]
        : groupDataRaw;
      setGroupDetail(groupData);

      // Nếu muốn load thành viên, gọi API tương tự ở đây (nếu cần)
      // const memberRes = await instance.get(...);
      // setListMemberOfGroup(memberRes.data.data);
    } catch (err) {
      console.error("Lỗi reload group:", err);
    }
  }, [id]);

  // ---- Load group ngay khi mở page hoặc đổi groupId ----
  useEffect(() => {
    ReloadSignlR();
  }, [ReloadSignlR]);

  // Ở component cha (GroupDetailPage)
  useEffect(() => {
    if (!connection) return;
    console.log("SignalR connection state:", connection.state);
    const handler = (groupUpdated) => {
      if (groupUpdated.groupId === groupDetail?.groupId) {
        console.log("Nhận được GroupUpdated:", groupUpdated);
        ReloadSignlR();
      }
    };
    connection.on("GroupUpdated", handler);
    return () => {
      connection.off("GroupUpdated", handler);
    };
  }, [connection, groupDetail?.groupId, ReloadSignlR]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      const accId = decoded.AccId;
      setUserAccId(accId);
    }
  }, []);
  useEffect(() => {
    if (userAccId) {
      fetchListMemberData();
    }
  }, [userAccId]); // gọi lại khi userAccId được cập nhật
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
      if (Array.isArray(data.data)) {
        setGroupData(data.data);
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

      setGroupDetail(data.data[0]);
      console.log(data.data[0].background);
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

  // get list resquest to join
  const fetchListRequestToJoinData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }

      const res = await fetch(
        `https://localhost:7280/api/group-member/list-request-to-join/${id}`,
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

      if (Array.isArray(data.data)) {
        const list = Array.isArray(data.data) ? data.data : [];

        // Luôn tạo mảng mới để React biết là thay đổi
        setListRequestToJoin([...list]);
      } else {
        console.warn("Unexpected response format:", data);
        setListRequestToJoin([]);
      }
    } catch (err) {
      console.error("Error fetching groups:", err.message || err);
    } finally {
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      const accId = decoded.AccId;
      setUserAccId(accId);
    }
  }, []);

  useEffect(() => {
    if (listMemberOfgroup && listMemberOfgroup.length > 0 && userAccId) {
      const person = listMemberOfgroup.find(
        (member) => member.accId.trim() === userAccId.trim()
      );
      setUserRole(person?.roleInGroupId);
      setMemberStatus(person?.memberStatus);
      console.log(
        "Role of current user:",
        person?.fullName,
        person?.roleInGroupId,
        person?.memberStatus
      );
    }
  }, [listMemberOfgroup, userAccId]);
  // phụ thuộc cả 2

  useEffect(() => {
    fetchListMemberData();
    fetchGroupDetailData();
    fetchListRequestToJoinData();
  }, [id]);
  useEffect(() => {
    fetchYourGroupsData();
  }, []);

  const ReloadData = () => {
    fetchListRequestToJoinData();
    fetchListMemberData();
  };

  return (
    <div>
      <Header />
      <NavbarHeader />
      <div className="md:flex md:flex-row md:pt-36 md:ml-[120px] gap-6 flex flex-col ml-[40px] pt-20">
        <div className="w-[342px] flex flex-col gap-6">
          <YourGroupDetailListItem YourGroupList={yourGroupsData} />
          <PopularService />
        </div>
        <div>
          <GroupDetailHeader
            group={groupDetail}
            userRole={userRole}
            userAccId={userAccId}
            memberStatus={memberStatus}
            countMember={listMemberOfgroup.length}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            reload={ReloadData}
            reloadsignlR={ReloadSignlR}
          />
          {/* {selectedTab === "posts" && <MemberCard />} */}
          {selectedTab === "members" && groupDetail && (
            <div>
              {listMemberOfgroup.map((member) => (
                <MemberCard
                  key={member.accId}
                  member={member}
                  userRole={userRole}
                  userAccId={userAccId}
                  reload={ReloadData}
                  ownerId={groupDetail.ownerId} // Không bị lỗi nữa vì groupDetail đã được kiểm tra
                />
              ))}
            </div>
          )}
          {selectedTab === "requests" && (
            <div>
              {listRequestToJoin.map((request) => {
                return (
                  <RequestGroupCard
                    key={request.groupMemberId + request.memberStatus}
                    request={request}
                    userRole={userRole}
                    reload={ReloadData}
                    setListRequestToJoin={setListRequestToJoin}
                  />
                );
              })}
            </div>
          )}
          {selectedTab === "permission" && groupDetail && (
            <div>
              {listMemberOfgroup.map((member) => {
                return (
                  <MemberPermission
                    key={member.groupMemberId}
                    member={member}
                    userRole={userRole}
                    userAccId={userAccId}
                    reload={ReloadData}
                    ownerId={groupDetail.ownerId}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
