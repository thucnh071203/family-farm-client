import logo from "./logo.svg";
import "./App.css";
import FriendPageSidebar from "./layouts/FriendPageSidebar";
import { FilterService } from "./layouts/FilterService";

function App() {
  return (
    <div className="App">
      <FilterService />
    </div>
  );
}

export default App;
