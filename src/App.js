import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { SignalRProvider } from "./context/SignalRContext"; // Import đúng context của bạn
import instance from "./Axios/axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Register from "./components/Register/Register";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ServicePage from "./pages/ServicePage/ServicePage";
import ProcessListPage from "./pages/ProcessPage/ProcessListPage";
import ProcessListFarmerPage from "./pages/ProcessPage/ProgressListFarmerPage";
import CreateStepPage from "./pages/ProcessPage/CreateStepPage";
import SavedPostPage from "./pages/SavedPostPage/SavedPostPage";
import WaitingListPage from "./pages/WaitingPage/WaitingListPage";
import FriendPage from "./pages/FriendPage/FriendPage";
import ServiceManagement from "./components/ServiceManagement/ServiceManagement";
import CreateProcessStep from "./components/ProcessStep/CreateProcessStep";
import { Statistic1 } from "./components/Statistic/Statistic1";
import MapChart from "./components/Statistic/MapChart";
import { UserGrowthChart } from "./components/Statistic/UserGrowthChart";
import PersonalPage from "./pages/Profile/PersonalPage";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import UserFriends from "./pages/Profile/UserFriends";
import PostGroupPage from "./pages/GroupPage/PostGroupPage";
import CreateServicePage from "./pages/ServicePage/CreateServicePage";
import ServiceDetailPage from "./pages/ServicePage/ServiceDetailPage";
import ProcessResultPage from "./pages/ProcessPage/ProcessResultPage";
import FilterService from "./components/FilterService/FilterService";

import ChatPage from "./pages/Chat/ChatPage";

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginState = async () => {
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("No access token found, redirecting to /Login");
        navigate("/Login");
        return;
      }

      try {
        console.log("Checking token validity with /api/account/own-profile");
        await instance.get("/api/account/own-profile");
        console.log("Token valid, user remains logged in");
      } catch (error) {
        console.error("Check login state failed:", error.response?.data || error.message);
        navigate("/Login");
      }
    };

    checkLoginState();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/ServiceManagement" element={<ServiceManagement />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/PersonalPage" element={<PersonalPage />} />
      <Route path="/Friend" element={<FriendPage />} />
      <Route path="/CreateProcessStep" element={<CreateProcessStep />} />
      <Route path="/Statistic1" element={<Statistic1 />} />
      <Route path="/UserGrowthChart" element={<UserGrowthChart />} />
      <Route path="/MapChart" element={<MapChart />} />
      <Route path="/Service" element={<ServicePage />} />
      <Route path="/Group" element={<PostGroupPage />} />
      <Route path="/UpdateProfile" element={<UpdateProfile />} />
      <Route path="/UserFriends" element={<UserFriends />} />
      <Route path="/ProcessList" element={<ProcessListPage />} />
      <Route path="/ProcessResult" element={<ProcessResultPage />} />
      <Route path="/WaitingOrderList" element={<WaitingListPage />} />
      <Route path="/SavedPostPage" element={<SavedPostPage />} />
      <Route path="/CreateService" element={<CreateServicePage />} />
      <Route path="/ServiceDetail" element={<ServiceDetailPage />} />
      <Route path="/ProgressListFarmer" element={<ProcessListFarmerPage />} />
      <Route path="/CreateStepPage" element={<CreateStepPage />} />
      <Route path="/Chats" element={<ChatPage />} />
      <Route path="/FilterService" element={<FilterService />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Router>
        <SignalRProvider>
          <AppContent />
        </SignalRProvider>
      </Router>
    </div>
  );
}

export default App;