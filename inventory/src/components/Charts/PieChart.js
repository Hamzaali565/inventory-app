import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
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
        backgroundColor: ["aqua", "red", "yellow", "orange"],
        // borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ width: "400px" }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
