import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from './pages/HomePage/HomePage';

import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      {/* vị trí của toast  */}
      <Toaster position="top-right"/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
