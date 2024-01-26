import "./App.css";
import RoutePage from "./RoutePage";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { baseUrl } from "./utils";

function App() {
  axios.defaults.baseURL = baseUrl;
  return (
    <div className="App" data-scroll-container>
      <Navbar />
      <div data-scroll-section>
        <RoutePage />
      </div>
    </div>
  );
}

export default App;
