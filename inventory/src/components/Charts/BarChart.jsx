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
import "./Chart.css";
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
      let newData = await data.map((item) => ({
        time: moment(item.createdTime).format("YYYY-MM-DD"),
        profit: item.profit,
      }));
      // console.log("newData", newData);

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

      // console.log("groupedData", groupedData);
      setValue(groupedData);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    GetResponse();
  }, []);
  const data = {
    labels: value.map((item) => item.time),
    // labels: [
    //   "Mon",
    //   "Tue",
    //   "Wed",
    //   "Thurs",
    //   "Fri",
    //   "Sat",
    //   "Mon",
    //   "Tue",
    //   "Wed",
    //   "Thurs",
    // ],
    datasets: [
      {
        label: "Profit Of Last 10 Days",
        data: value.map((item) => item.profit),
        // data: [
        //   "3400",
        //   "9000",
        //   "4000",
        //   "4900",
        //   "8000",
        //   "200",
        //   "890",
        //   "3000",
        //   "1000",
        //   "120",
        // ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(153, 103, 255, 0.2)",
          "rgba(255, 151, 64, 0.2)",
          "rgba(54, 163, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(153, 103, 255)",
          "rgb(255, 151, 64)",
          "rgb(54, 163, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
        },
        ticks: {
          font: {
            family: "Arial, sans-serif",
            size: 12,
            weight: "bold",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Arial, sans-serif",
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        // position: "top",
        labels: {
          font: {
            family: "Arial, sans-serif",
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };
  return (
    <div>
      This is chart
      <div className="flex justify-center mt-10 ">
        <div className="Chart">
          <Bar data={data} options={options}></Bar>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
