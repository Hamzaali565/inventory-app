import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import RoughWork from "./components/checking/RoughWork";
import BillCheck from "./screens/Bill Check/BillCheck";
import Billing from "./screens/Bill/Billing";
import MainPage from "./screens/MainPage/MainPage";
import LoginScreen from "./screens/login screen/LoginScreen";

import { Routes, Route, Link, Navigate } from "react-router-dom";
import Splash from "./screens/SplashScreen/Splash";
import { useEffect, useState } from "react";
import { setLoginToggle } from "./store/action";
import axios from "axios";
import BarChart from "./components/Charts/BarChart";
import Home from "./screens/HomeScreen/Home";
const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 8900,
    userlose: 200,
  },
  {
    id: 2,
    year: 2017,
    userGain: 8930,
    userlose: 20,
  },
  {
    id: 3,
    year: 2018,
    userGain: 2900,
    userlose: 100,
  },
  {
    id: 4,
    year: 2019,
    userGain: 1900,
    userlose: 100,
  },
  {
    id: 5,
    year: 2020,
    userGain: 800,
    userlose: 900,
  },
  {
    id: 6,
    year: 2021,
    userGain: 8900,
    userlose: 200,
  },
];
function App() {
  const Dispatch = useDispatch();
  useEffect(() => {
    CheckLog();
    // Dispatch(setLoginToggle(false));
  }, []);

  const LoginCheck = useSelector((state) => state.toggle);
  const url = useSelector((state) => state.url);
  console.log("MYURL", url);

  const CheckLog = async () => {
    try {
      let response = await axios.get(`${url}/api/v1/getventory`, {
        withCredentials: true,
      });
      console.log("ghgh", response);
      Dispatch(setLoginToggle(true));
    } catch (error) {
      console.log(error);
      Dispatch(setLoginToggle(false));
    }
  };
  return (
    <div>
      {LoginCheck === true ? (
        <Routes>
          <Route path="mainpage" element={<MainPage />} />
          <Route path="billing" element={<Billing />} />
          <Route path="billcheck" element={<BillCheck />} />
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={<Navigate to="/mainpage" replace={true} />}
          />
        </Routes>
      ) : null}
      {LoginCheck === false ? (
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      ) : null}
      {LoginCheck === null ? <Splash /> : null}
    </div>
  );
}

export default App;
