import React, { useState } from "react";
import Header from "../../components/header/Header";
import AddInput from "../../components/AddInput/AddInput";
import axios from "axios";
import { Button } from "@mui/material";
import { ErrorToast, SuccessToast } from "../../components/Toastify/Toast";
import ToastHook from "../../components/Toastify/ToastHook";
import { useSelector } from "react-redux";

const BillCheck = () => {
  const [id, setId] = useState("");
  const [res, setRes] = useState([]);
  const [oRes, setORes] = useState([]);

  const url = useSelector((state) => state.url);

  const Data = async (e) => {
    e.preventDefault();
    try {
      let responce = await axios.get(`${url}/api/v1/getbill/${id}`, {
        withCredentials: true,
      });
      // console.log(responce?.data);
      setRes(responce?.data.data);
      setORes(responce?.data);
      SuccessToast(responce.data.message);
    } catch (error) {
      // console.log(error);
      ErrorToast(error.response.data.message);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={Data} className="md:flex justify-center space-x-4 ">
        <AddInput
          placeholder={"Please Enter Bill id"}
          type="number"
          //   className={"lg:w-72"}
          onChange={(value) => {
            setId(value);
          }}
        />
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="border py-2 px-3 rounded-xl bg-green-400 font-bold text-white"
          >
            Enter
          </button>
        </div>
      </form>
      {/* <button onClick={check}>check</button> */}
      <div className="flex justify-center my-2 ">
        <div className="border-2 rounded-xl w-72 md:w-96 md:mt-3">
          {/* head */}
          <div className="flex justify-around font-bold pt-2 text-sm">
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
          </div>
          {/* data */}
          {res.length > 0 &&
            res.map((eachItem, i) => (
              <div className="flex justify-around text-sm pr-3 my-2" key={i}>
                <div>{eachItem?.itemName}</div>
                <div>{eachItem?.price}</div>
                <div>{eachItem?.quantity}</div>
              </div>
            ))}
          <div>
            <div>
              {/* total */}
              <div className="font-bold text-sm flex justify-around">
                <div>Total</div>
                <div>{oRes?.totalPrice}</div>
              </div>
              {/* Id */}
              <div className=" text-xs space-x-1 flex justify-center">
                <div>Bill No.</div>
                <div>{oRes?.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastHook />
    </div>
  );
};

export default BillCheck;
