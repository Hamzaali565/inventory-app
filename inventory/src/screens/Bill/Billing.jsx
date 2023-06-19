import React from "react";
import Header from "../../components/header/Header";
import Bill from "../../components/Autocomplete2/Bill";

const Billing = () => {
  return (
    <div>
      <Header />
      <div className="font-bold text-4xl flex justify-center mt-2">Billing</div>
      <Bill />
    </div>
  );
};

export default Billing;
