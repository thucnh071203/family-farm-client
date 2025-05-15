import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import FriendRight from "./components/Friend/FriendRight";
import FriendPage from "./pages/FriendPage/FriendPage";
import FriendSidebar from "./components/Friend/FriendSidebar";

function App() {
  return (
    <div className="App">
      {/* <FilterService /> */}
      {/* <LoginPage/> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
