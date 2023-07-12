import React from "react";
import img from "../../assets/images/inv.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoginToggle } from "../../store/action";
const Header = () => {
  let navigate = useNavigate();
  const url = useSelector((state) => state.url);
  const Dispatch = useDispatch();
  let path;
  const addVentory = () => {
    path = "/mainpage";
    navigate(path);
  };
  const billings = () => {
    path = "/billing";
    navigate(path);
  };
  const billsign = () => {
    path = "/billcheck";
    navigate(path);
  };
  const Home = () => {
    path = "/";
    navigate(path);
  };
  const logouts = async () => {
    try {
      let response = await axios.post(
        `${url}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      Dispatch(setLoginToggle(false));
      console.log("resp", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between px-2 lg:mx-4 border-b-4">
      <ul className=" hidden  order-2 lg:flex space-x-8 mt-3">
        <li className="cursor-pointer hover:underline" onClick={Home}>
          Home
        </li>
        <li className="cursor-pointer hover:underline" onClick={addVentory}>
          Add Inventory
        </li>
        <li className="cursor-pointer hover:underline" onClick={billings}>
          Billing
        </li>
        <li className="cursor-pointer hover:underline" onClick={billsign}>
          Bill Check
        </li>
        <li className="cursor-pointer hover:underline" onClick={logouts}>
          Logout
        </li>
      </ul>
      <div className="space-y-1 lg:hidden">
        <div className="bg-black h-1 w-7" />
        <div className="bg-black h-1 w-7" />
        <div className="bg-black h-1 w-7" />
      </div>
      <div>
        <img src={img} className="w-14 order-1" alt="" />
      </div>
    </div>
  );
};

export default Header;
