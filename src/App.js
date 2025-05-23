import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/Register/Register";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ServicePage from "./pages/ServicePage/ServicePage";
import ProgressListPage from "./pages/ProgressPage/ProgressListPage";
import SavedPostPage from "./pages/SavedPostPage/SavedPostPage";
import WaitingListPage from "./pages/WaitingPage/WaitingListPage";
import FriendPage from "./pages/FriendPage/FriendPage";
import ServiceManagement from "./components/ServiceManagement/ServiceManagement";
import CreateProgessStep from "./components/ProgressStep/CreateProgessStep";
import { Statistic1 } from "./components/Statistic/Statistic1";
import  MapChart  from "./components/Statistic/MapChart";
import { UserGrowthChart } from "./components/Statistic/UserGrowthChart";
import PersonalPage from "./pages/Profile/PersonalPage";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import UserFriends from "./pages/Profile/UserFriends";
import PostGroupPage from "./pages/GroupPage/PostGroupPage";
import CreateServicePage from "./pages/ServicePage/CreateServicePage";

import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      {/* vị trí của toast  */}
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ServiceManagement" element={<ServiceManagement />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/PersonalPage" element={<PersonalPage />} />
          <Route path="/Friend" element={<FriendPage />} />
          <Route path="/CreateProgessStep" element={<CreateProgessStep />} />
          <Route path="/Statistic1" element={<Statistic1 />} />
          <Route path="/UserGrowthChart" element={<UserGrowthChart />} />
          <Route path="/MapChart" element={<MapChart />} />
          <Route path="/Service" element={<ServicePage />} />
          <Route path="/Group" element={<PostGroupPage />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/UserFriends" element={<UserFriends />} />
          <Route path="/ProgressList" element={<ProgressListPage />} />
          <Route path="/WaitingOrderList" element={<WaitingListPage />} />
          <Route path="/SavedPostPage" element={<SavedPostPage />} />
          <Route path="/CreateService" element={<CreateServicePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
