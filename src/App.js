import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/Register/Register";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ServicePage from "./pages/ServicePage/ServicePage";
import FriendPage from "./pages/FriendPage/FriendPage";
import ServiceManagement from "./components/ServiceManagement/ServiceManagement";
import CreateProgessStep from "./components/ProgressStep/CreateProgessStep";
import PersonalPage from "./pages/Profile/PersonalPage";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import UserFriends from "./pages/Profile/UserFriends";
import PostGroupPage from "./pages/GroupPage/PostGroupPage";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/PersonalPage" element={<PersonalPage />} />
          <Route path="/friend" element={<FriendPage />} />
          <Route path="/CreateProgessStep" element={<CreateProgessStep />} />
          <Route path="/Service" element={<ServicePage />} />
          <Route path="/Group" element={<PostGroupPage />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/UserFriends" element={<UserFriends />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
