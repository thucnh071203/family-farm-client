import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Register } from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      {/* <FilterService /> */}
      {/* <LoginPage/> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
