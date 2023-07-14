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
        data: value.map((item) => item.profit),
        backgroundColor: "aqua",
        borderColor: "black",
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
      <div className="" style={{ width: "400px" }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
};

export default BarChart;
