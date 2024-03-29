import React, { useState } from "react";
import invImage from "../../assets/images/inventory.png";
import invImage1 from "../../assets/images/inv.png";

import Login from "../../components/loginPage/Login";
import { Formik, ErrorMessage, Field, Form, useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setLoginToggle } from "../../store/action";
import "react-toastify/dist/ReactToastify.css";
import { ErrorToast } from "../../components/Toastify/Toast";
import ToastHook from "../../components/Toastify/ToastHook";

const LoginScreen = () => {
  const [message, setMessage] = useState("");
  const Dispatch = useDispatch();
  // const Selector = useSelector();
  const check = useSelector((state) => state.toggle);
  const url = useSelector((state) => state.url);
  const Message = (data) => {
    ErrorToast(data);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email().label("Email"),
      password: Yup.string().required().min(8).label("Password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("ok", values);
      await submit(values);
      resetForm();
    },
  });

  const submit = async (values) => {
    try {
      console.log("val", values.password);
      let responce = await axios.post(
        `${url}/api/v1/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("responce", responce);
      Dispatch(setLoginToggle(true));
      // console.log(check);
    } catch (error) {
      // setMessage(error.response.data.message);
      // console.log("err", error.response.data.message);
      // console.log(check);
      Message(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="flex justify-around items-center mt-20">
        <div className="left hidden lg:block">
          <img src={invImage1} className="w-80 h-auto" alt="" />
        </div>
        <div className="flex justify-center">
          <div className="right md:border-4 md:w-96 md:py-7 lg:py-20 lg:mt-9 rounded-2xl border-black">
            {/* png */}
            <div className="flex justify-center">
              <img
                src={invImage}
                alt=""
                className="w-32 flex justify-center h-auto lg:hidden"
              />
              <div className="font-bold text-3xl hidden lg:block">
                INVENTORY
              </div>
            </div>
            {/* input */}
            <form action="" onSubmit={formik.handleSubmit}>
              <div>
                <Login
                  id="email"
                  placeholder={"Email Address"}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="text-xs flex justify-center text-red-600 mt-1">
                {formik.touched.email && Boolean(formik.errors.email) ? (
                  <span>*{formik.errors.email}*</span>
                ) : null}
              </div>
              <div>
                <Login
                  id="password"
                  placeholder={"Password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="text-xs flex justify-center text-red-600 mt-1">
                {formik.touched.password && Boolean(formik.errors.password) ? (
                  <span>*{formik.errors.password}*</span>
                ) : null}
              </div>
              <div className="flex justify-center mt-7">
                <button
                  type="submit"
                  className="border-2 py-1 px-5 rounded-2xl bg-green-400 font-bold text-white"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastHook />
    </div>
  );
};

export default LoginScreen;
