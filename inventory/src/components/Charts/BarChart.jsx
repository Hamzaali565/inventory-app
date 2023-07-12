import {
  BarElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";
import Header from "../header/Header";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thurs",
      "Tue",
      "Wed",
      "Thurs",
      "Tue",
      "Wed",
      "Thurs",
      "Tue",
      "Wed",
      "Thurs",
      "Tue",
      "Wed",
      "Thurs",
    ],
    datasets: [
      {
        label: "369",
        data: [3, 6, 9, 12, 6, 9, 12, 6, 9, 12, 6, 9, 12, 6, 9, 12],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

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
