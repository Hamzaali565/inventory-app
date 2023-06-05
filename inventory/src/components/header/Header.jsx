import React from "react";
import img from "../../assets/images/inv.png";
const Header = () => {
  return (
    <div className="flex items-center justify-between px-2 lg:mx-4 border-b-4">
      <ul className=" hidden  order-2 lg:flex space-x-8 mt-3">
        <li className="cursor-pointer hover:underline">Home</li>
        <li className="cursor-pointer hover:underline">Add Inventory</li>
        <li className="cursor-pointer hover:underline">Billing</li>
        <li className="cursor-pointer hover:underline">Bill Check</li>
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
