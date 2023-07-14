import React from "react";
import PieChart from "../../components/Charts/PieChart";
import BarChart from "../../components/Charts/BarChart";
import Header from "../../components/header/Header";

const Home = () => {
  return (
    <div className="">
      <Header />
      {/* <PieChart /> */}
      <BarChart />
    </div>
  );
};

export default Home;
