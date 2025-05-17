import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { Register } from "./components/Register/Register";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import FriendRight from "./components/Friend/FriendRight";
import FriendPage from "./pages/FriendPage/FriendPage";
import FriendSidebar from "./components/Friend/FriendSidebar";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/friend" element={<FriendPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
