import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import FriendPageSidebar from "./layouts/FriendPageSidebar";
import LoginPage from "./pages/LoginPage/LoginPage";
import { FilterService } from "./layouts/FilterService";
import HomePage from './pages/HomePage/HomePage';


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
