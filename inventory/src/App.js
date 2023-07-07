import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import RoughWork from "./components/checking/RoughWork";
import BillCheck from "./screens/Bill Check/BillCheck";
import Billing from "./screens/Bill/Billing";
import MainPage from "./screens/MainPage/MainPage";
import LoginScreen from "./screens/login screen/LoginScreen";

import { Routes, Route, Link, Navigate } from "react-router-dom";
import Splash from "./screens/SplashScreen/Splash";
import { useEffect } from "react";
import { setLoginToggle } from "./store/action";
import axios from "axios";

function App() {
  const Dispatch = useDispatch();
  useEffect(() => {
    CheckLog();
    Dispatch(setLoginToggle(false));
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
  // const GetTables = async () => {
  //   try {
  //     let response = await axios.get(
  //       "http://localhost:5001/api/v1/getventory",
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setData(response.data.data.reverse());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      {LoginCheck === true ? (
        <Routes>
          <Route path="mainpage" element={<MainPage />} />
          <Route path="billing" element={<Billing />} />
          <Route path="billcheck" element={<BillCheck />} />
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
      {/* {LoginCheck === null ? <Splash /> : null} */}
      {/* <MainPage /> */}
      {/* <Billing /> */}
      {/* <RoughWork /> */}
      {/* <BillCheck /> */}
      {/* <Splash /> */}
    </div>
  );
}

export default App;
