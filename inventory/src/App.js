import "./App.css";
import RoughWork from "./components/checking/RoughWork";
import BillCheck from "./screens/Bill Check/BillCheck";
import Billing from "./screens/Bill/Billing";
import MainPage from "./screens/MainPage/MainPage";

import { Routes, Route, Link, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/billcheck" element={<BillCheck />} />
      </Routes>
      {/* <MainPage /> */}
      {/* <Billing /> */}
      {/* <RoughWork /> */}
      {/* <BillCheck /> */}
    </div>
  );
}

export default App;
