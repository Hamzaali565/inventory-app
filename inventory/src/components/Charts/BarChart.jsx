import {
  BarElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [value, setValue] = useState([]);
  const url = useSelector((state) => state.url);
  const GetResponse = async () => {
    try {
      let response = await axios.get(`${url}/api/v1/getAllBills`, {
        withCredentials: true,
      });
      let data = response.data.data;
      // let myData = await response.data.data
      //   .slice(response.data.data.length - 10)
      //   .map((item) => ({
      //     profit: item.profit,
      //     // time: item.createdTime,
      //     time: moment(item.createdTime).format("dddd"),
      //   }));
      // setValue(myData);
      // console.log("myData", myData, value);
      // console.log(response.data);
      // const groupedData = Object.values(data).reduce((result, item) => {
      //   const { createdTime, profit } = item;
      //   if (!createdTime || !profit) {
      //     return result;
      //   }

      //   const existingItem = result.find(
      //     (group) => group.createdTime === createdTime
      //   );
      //   if (existingItem) {
      //     existingItem.profit += Number(profit);
      //   } else {
      //     result.push({ createdTime, profit: Number(profit) });
      //   }

      //   return result;
      // }, []);
      //  let billData = data.map{}

      // console.log(groupedData);
      let newData = await data.map((item) => ({
        time: moment(item.createdTime).format("ddd"),
        profit: item.profit,
      }));
      console.log("newData", newData);

      const groupedData = Object.values(newData).reduce((result, item) => {
        const { time, profit } = item;
        if (!time || !profit) {
          return result;
        }

        const existingItem = result.find((group) => group.time === time);
        if (existingItem) {
          existingItem.profit += Number(profit);
        } else {
          result.push({ time, profit: Number(profit) });
        }

        return result;
      }, []);

      console.log("groupedData", groupedData);
      setValue(groupedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetResponse();
  }, []);
  const data = {
    labels: value.map((item) => item.time),
    datasets: [
      {
        label: "Profit Of Last 10 Days",
        // data: [3, 6, 9, 12, 6, 9, 12, 6, 9, 12, 6, 9, 12, 6, 9, 12],
        data: value.map((item) => item.profit),
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  // const CheckLog = async () => {
  //   try {
  //     let response = await axios.get(`${url}/api/v1/getventory`, {
  //       withCredentials: true,
  //     });
  //     console.log("ghgh", response);
  //     Dispatch(setLoginToggle(true));
  //   } catch (error) {
  //     console.log(error);
  //     Dispatch(setLoginToggle(false));
  //   }
  // };
  return (
    <div>
      This is chart
      <div className="" style={{ width: "400px" }}>
        <Bar data={data}></Bar>
      </div>
    </div>
  );
};

export default BarChart;
