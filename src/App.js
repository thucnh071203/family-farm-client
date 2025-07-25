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
import EditStepPage from "./pages/ProcessPage/EditStepPage";
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
import ListReaction from "./components/ReactionManagement/ListReaction";
import PostCatePage from "./pages/Dashboard/PostCatePage";
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
import ListCensorPage from "./pages/Dashboard/ListCensorPage";
import ListAccountPage from "./pages/Dashboard/ListAccountPage";
import CreatePostCatePage from "./pages/Dashboard/CreatePostCatePage";
import UpdatePostCatePage from "./pages/Dashboard/UpdatePostCatePage";
import DetailPostCatePage from "./pages/Dashboard/DetailPostCatePage";
import CateServicePage from "./pages/Dashboard/CateServicePage";
import CreateCateServicePage from "./pages/Dashboard/CreateCateServicePage";
import ReactionPage from "./pages/Dashboard/ReactionPage";
import CreateReactionPage from "./pages/Dashboard/CreateReactionPage";
import UpdateReactionPage from "./pages/Dashboard/UpdateReactionPage";
import HomeProcessFarmer from "./pages/ProcessPage/HomeProcessFarmer";
import DetailCateServicePage from "./pages/Dashboard/DetailCateServicePage";
import EditCateServicePage from "./pages/Dashboard/EditCateServicePage";
import ProfessionalPage from "./pages/Profile/ProfessionalPage";
import FriendRequestPage from "./pages/FriendPage/FriendRequestPage";
import SuggestionFriendPage from "./pages/FriendPage/SuggestionFriendPage";
import SentRequestFriendPage from "./pages/FriendPage/SentRequestFriendPage";
import YourFollowingPage from "./pages/FriendPage/YourFollowingPage";
import YourFollowerPage from "./pages/FriendPage/YourFollowerPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import UnpaidBookingPage from "./pages/WaitingPage/UnpaidBookingPage";
import UserFriendOfOther from "./pages/Profile/UserFriendOfOther";
import CallbackPage from "./pages/CallbackPage/PaymentCallback";
import PaymentResultPage from "./pages/CallbackPage/PaymentResult";
import PaymentSuccess from "./pages/PaymentPage/PaymentSuccessfulPage";
import PaymentFailed from "./pages/PaymentPage/PaymentFailedPage";
import ListPhotoPage from "./pages/Profile/ListPhotoPage";
import ListPhotoOther from "./pages/Profile/ListPhotoOther";
import CreateSubprocessPage from "./pages/Subprocess/CreateSubprocessPage";
import RePaymentResultPage from "./pages/CallbackPage/RePaymentResult";
import ReviewServicePage from "./pages/ProcessPage/ReviewServicePage";
import AICheckerPage from "./pages/Dashboard/AICheckerPage";
import PostAIDetailPage from "./pages/Dashboard/PostAIDetailPage";
import PaymentInvoicePage from "./pages/PaymentPage/PaymentInvoicePage";
import PostManagementDetailPage from "./pages/Dashboard/PostManagementDetailPage";

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

  // console.log("Current path:", location.pathname);

  const isPublicRoute = [
    "/Login",
    "/Register",
    "/ForgotPassword",
    "/ConfirmOtp",
    "/ResetPassword",
  ].includes(location.pathname);

  const skipAuthRoutes = [
    "/Login",
    "/Register",
    "/ForgotPassword",
    "/ConfirmOtp",
    "/ResetPassword",
  ];

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
            <Route path="/Professional" element={<ProfessionalPage />} />
            <Route path="/Friend" element={<FriendPage />} />
            <Route
              path="/Friend/requests-receive"
              element={<FriendRequestPage />}
            />
            <Route
              path="/Friend/requests-sent"
              element={<SentRequestFriendPage />}
            />
            <Route
              path="/Friend/list-following"
              element={<YourFollowingPage />}
            />
            <Route
              path="/Friend/list-follower"
              element={<YourFollowerPage />}
            />
            <Route
              path="/Friend/suggestion-friend"
              element={<SuggestionFriendPage />}
            />

            <Route path="/CreateProcessStep" element={<CreateProcessStep />} />
            <Route path="/Statistic1" element={<Statistic1 />} />
            <Route path="/UserGrowthChart" element={<UserGrowthChart />} />
            <Route path="/MapChart" element={<MapChart />} />
            <Route path="/Service" element={<ServicePage />} />
            <Route path="/Group" element={<PostGroupPage />} />
            <Route path="/Search" element={<SearchPage />} />
            <Route path="/group/:id" element={<GroupDetailPage />} />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />S
            <Route path="/UserFriends" element={<UserFriends />} />
            <Route path="/UserFriends/:accId" element={<UserFriendOfOther />} />
            <Route path="/UserPhotos" element={<ListPhotoPage />} />
            <Route path="/UserPhotos/:accId" element={<ListPhotoOther />} />
            
            <Route path="/ProcessList" element={<ProcessListPage />} />
            <Route path="/ProcessResult/:subprocessId" element={<ProcessResultPage />} />
            <Route path="/WaitingOrderList" element={<WaitingListPage />} />
            <Route path="/UnpaidBooking" element={<UnpaidBookingPage/>} />
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
            <Route path="/ServiceDetail/:id" element={<ServiceDetailPage />} />
            <Route
              path="/ProgressListFarmer"
              element={<ProcessListFarmerPage />}
            />
            <Route path="/HomeProcessFarmer" element={<HomeProcessFarmer />} />
            <Route path="/CreateStepPage/:id" element={<CreateStepPage />} />
            <Route path="/EditStepPage/:id" element={<EditStepPage />} />
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

            <Route path="/ReactionManagement" element={<ReactionPage />} />
            <Route path="/CreateReaction" element={<CreateReactionPage />} />
            <Route
              path="/UpdateReaction/:id"
              element={<UpdateReactionPage />}
            />
            <Route path="/PostCatePage" element={<PostCatePage />} />
            <Route
              path="/PaymentManagement"
              element={<PaymentManagementPage />}
            />

            <Route path="/PostCatePage" element={<PostCatePage />} />
            <Route path="/PostManagement" element={<PostManagementPage />} />
            <Route
              path="/ReportManagement"
              element={<ReportManagementPage />}
            />
            <Route
              path="/ReportDetail/:reportId"
              element={<ReportDetailPage />}
            />

            <Route path="/StatisticPage" element={<StatisticPage />} />
            <Route path="/Dashboard" element={<DashboardPage />} />
            <Route path="/ListCensor" element={<ListCensorPage />} />
            <Route path="/CateService" element={<CateServicePage />} />
            <Route
              path="/CateService/Create"
              element={<CreateCateServicePage />}
            />
            <Route
              path="/CateService/Detail/:id"
              element={<DetailCateServicePage />}
            />
            <Route
              path="/CateService/Edit/:id"
              element={<EditCateServicePage />}
            />
            <Route path="/ListAccount" element={<ListAccountPage />} />
            <Route path="/CensorDetail/:accId" element={<CensorDetailPage />} />
            <Route
              path="/AccountDetail/:accId"
              element={<AccountDetailPage />}
            />
            <Route path="/ListPostCheckedAI" element={<AICheckerPage />} />
            <Route path="/ListPostCheckedAI/PostAIDetail/:id" element={<PostAIDetailPage />} />
            <Route path="/PostManagementDetail/:id" element={<PostManagementDetailPage />} />
            {/* /PostManagement/PostDetail */}
            <Route
              path="/CreatePostCate"
              element={<CreatePostCatePage />}
            />
            <Route
              path="/UpdatePostCate/:id"
              element={<UpdatePostCatePage />}
            />
            <Route
              path="/PostCatePage/DetailPostCate/:id"
              element={<DetailPostCatePage />}
            />
            {/* <Route path="/CreatePostCate" element={<CreatePostCate />} /> */}
            {/* <Route path="/UpdatePostCate/:id" element={<UpdatePostCate />} /> */}
            <Route path="/DetailPostCate/:id" element={<DetailPostCate />} />
            <Route path="/payment-callback" element={<CallbackPage />} />
            <Route path="/PaymentResult" element={<PaymentResultPage />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/PaymentFailed" element={<PaymentFailed />} />
            <Route path="/CreateSubprocess" element={<CreateSubprocessPage/>} />
            <Route path="/RePaymentResult" element={<RePaymentResultPage />} />
            <Route path="/ReviewService/:serviceId" element={<ReviewServicePage />} />
            <Route path="/PaymentInvoice" element={<PaymentInvoicePage />} />
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
