import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { SignalRProvider } from "./context/SignalRContext";
import { NotificationProvider } from "./context/NotificationContext";
import useAuth from "./hooks/useAuth";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import LoginPage from "./pages/AuthenPage/LoginPage";
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
import MostUser from "./components/Statistic/MostUser";
import SidebarDashboard from "./components/Dashboard/SidebarDashboard";
import { UserGrowthChart } from "./components/Statistic/UserGrowthChart";
import PersonalPage from "./pages/Profile/PersonalPage";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import UserFriends from "./pages/Profile/UserFriends";
import PostGroupPage from "./pages/GroupPage/PostGroupPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import JoinRequestsListPage from "./pages/GroupPage/JoinRequestsListPage";
import PermissionGroupPage from "./pages/GroupPage/PermissionGroupPage";
import CreateServicePage from "./pages/ServicePage/CreateServicePage";
import EditServicePage from "./pages/ServicePage/EditServicePage";
import ServiceDetailPage from "./pages/ServicePage/ServiceDetailPage";
import ProcessResultPage from "./pages/ProcessPage/ProcessResultPage";
import FilterService from "./components/FilterService/FilterService";
import ChatPage from "./pages/Chat/ChatPage";

import StatisticPage from "./pages/Dashboard/StatisticPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ReactionPage from "./pages/Dashboard/ReactionPage";
import PostCatePage from "./pages/Dashboard/PostCatePage";
import CreateReactionPage from "./pages/Dashboard/CreateReactionPage";
import CreatePostCate from "./pages/Dashboard/CreatePostCate";
import UpdatePostCate from "./pages/Dashboard/UpdatePostCate";
import DetailPostCate from "./pages/Dashboard/DetailPostCate";

import GroupDetailPage from "./pages/GroupPage/GroupDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import UpdatePostPage from "./pages/Profile/UpdatePostPage";
import EditGroupPage from "./pages/GroupPage/EditGroupPage";
import RecycleBin from "./pages/Profile/RecycleBin";
import ChangePasswordPage from "./pages/Profile/ChangePasswordPage";
import SetPasswordPage from "./pages/Profile/SetPasswordPage";
import ForgotPasswordPage from "./pages/AuthenPage/ForgotPasswordPage";
import ConfirmOtpPage from "./pages/AuthenPage/ConfirmOtpPage";
import ResetPasswordPage from "./pages/AuthenPage/ResetPasswordPage";
import Register from "./components/Authen/Register";
import CensorDetailPage from "./pages/Dashboard/CensorDetailPage";
import { UserProvider } from "./context/UserContext";
import PaymentManagementPage from "./pages/Dashboard/PaymentManagementPage";
import PostManagementPage from "./pages/Dashboard/PostManagementPage";
import ReportManagementPage from "./pages/Dashboard/ReportManagementPage";
import ReportDetailPage from "./pages/Dashboard/ReportDetailPage";
import AccountDetailPage from "./pages/Dashboard/AccountDetailPage";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth(navigate, location);

  // đang kiểm tra token
  if (isLoading) {
    return (
      <>
        <LoginPage />
        Loading...
      </>
    );
  }

  console.log("Current path:", location.pathname);

  const isPublicRoute = ["/Login", "/Register", "/ForgotPassword", "/ConfirmOtp", "/ResetPassword"].includes(location.pathname);

  const skipAuthRoutes = ["/Login", "/Register", "/ForgotPassword", "/ConfirmOtp", "/ResetPassword"];

  // const { isAuthenticated, isLoading } = useAuth(
  //     skipAuthRoutes.includes(location.pathname) ? null : navigate,
  //     location
  // );

  return (
    <>
      <ScrollToTop />
      <Routes>
        {isPublicRoute || isAuthenticated ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/ServiceManagement" element={<ServiceManagement />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/PersonalPage">
              <Route index element={<PersonalPage />} /> {/* my profile */}
              <Route path=":accId" element={<PersonalPage />} />{" "}
              {/* other profile */}
            </Route>
            <Route path="/Friend" element={<FriendPage />} />
            <Route path="/CreateProcessStep" element={<CreateProcessStep />} />
            <Route path="/Statistic1" element={<Statistic1 />} />
            <Route path="/UserGrowthChart" element={<UserGrowthChart />} />
            <Route path="/MapChart" element={<MapChart />} />
            <Route path="/Service" element={<ServicePage />} />
            <Route path="/Group" element={<PostGroupPage />} />
            <Route path="/group/:id" element={<GroupDetailPage />} />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />
            <Route path="/UserFriends" element={<UserFriends />} />
            <Route path="/ProcessList" element={<ProcessListPage />} />
            <Route path="/ProcessResult" element={<ProcessResultPage />} />
            <Route path="/WaitingOrderList" element={<WaitingListPage />} />
            <Route path="/GroupPage" element={<GroupPage />} />
            <Route
              path="/JoinRequestsListPage"
              element={<JoinRequestsListPage />}
            />
            <Route
              path="/PermissionGroupPage"
              element={<PermissionGroupPage />}
            />
            <Route path="/SavedPostPage" element={<SavedPostPage />} />
            <Route path="/CreateService" element={<CreateServicePage />} />
            <Route path="/EditService/:id" element={<EditServicePage />} />
            <Route path="/ServiceDetail" element={<ServiceDetailPage />} />
            <Route
              path="/ProgressListFarmer"
              element={<ProcessListFarmerPage />}
            />
            <Route path="/CreateStepPage" element={<CreateStepPage />} />
            <Route path="/Chats" element={<ChatPage />} />
            <Route path="/FilterService" element={<FilterService />} />
            <Route path="/EditPost/:postId" element={<UpdatePostPage />} />
            <Route path="/EditGroup/:groupId" element={<EditGroupPage />} />

            <Route path="/Trash" element={<RecycleBin />} />
            <Route path="/ChangePassword" element={<ChangePasswordPage />} />
            <Route path="/SetPassword" element={<SetPasswordPage />} />
            <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/ConfirmOtp" element={<ConfirmOtpPage />} />
            <Route path="/ResetPassword" element={<ResetPasswordPage />} />

            <Route path="/ReactionPage" element={<ReactionPage />} />
            <Route path="/PaymentManagement" element={<PaymentManagementPage />} />
            <Route path="/PostManagement" element={<PostManagementPage />} />
            <Route path="/ReportManagement" element={<ReportManagementPage />} />
            <Route path="/ReportDetail/:reportId" element={<ReportDetailPage />} />

            <Route
              path="/Dashboard/PostCatePage"
              element={<PostCatePage />}
            />
            <Route path="/StatisticPage" element={<StatisticPage />} />
            <Route path="/Dashboard" element={<DashboardPage />} />
            <Route
              path="/Dashboard/CensorDetail/:accId"
              element={<CensorDetailPage />}
            />
            <Route
              path="/Dashboard/AccountDetail/:accId"
              element={<AccountDetailPage />}
            />
            <Route
              path="/DashboardPage/PostCatePage/CreatePostCate"
              element={<CreatePostCate />}
            />
            <Route
              path="/Dashboard/PostCatePage/UpdatePostCate/:id"
              element={<UpdatePostCate />}
            />
            <Route
              path="/Dashboard/PostCatePage/DetailPostCate/:id"
              element={<DetailPostCate />}
            />
          </>
        ) : (
          <Route path="*" element={<LoginPage />} /> // Chuyển hướng tất cả các route không hợp lệ về Login
        )}
      </Routes>
    </>
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
        <UserProvider>
          <SignalRProvider>
            <NotificationProvider>
              <AppContent />
            </NotificationProvider>
          </SignalRProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
