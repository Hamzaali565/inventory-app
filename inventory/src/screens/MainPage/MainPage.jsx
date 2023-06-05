import React, { useState } from "react";
import Auto from "../../components/autocomplete/Auto";
import AddInput from "../../components/AddInput/AddInput";
import { useFormik } from "formik";
import * as Yup from "yup";
const MainPage = () => {
  const [ItemName, setItemName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const SubmitHandler = (event) => {
    event.preventDefault();
    console.log({
      ItemName,
      price,
      costPrice,
      qty,
    });
    setCostPrice("");
    setItemName("");
    setPrice("");
    setQty("");
  };
  const data = [
    { city: "lahore", id: 1 },
    { city: "lahore", id: 2 },
    { city: "lahore", id: 3 },
    { city: "lahore", id: 4 },
  ];
  const handleInputChange = (event) => {
    setQty(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div>
      <div className="my-3 font-semibold text-2xl flex justify-center lg:justify-start lg:ml-4">
        Add Inventory
      </div>
      {/* form */}
      <form className="lg:flex justify-around" onSubmit={SubmitHandler}>
        <Auto
          id="names"
          // value={ItemName}
          // defaultValue={ItemName}
          options={data.map((items) => items.city)}
          onInputChange={(e, v) => {
            console.log(v);
            setItemName(v);
          }}
        />
        {/* <input
          type="number"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          name=""
          id=""
        /> */}
        <AddInput
          placeholder="Item Cost Price"
          type="number"
          value={costPrice}
          id="CostPrice"
          onChange={(value) => {
            setCostPrice(value);
            // console.log();
          }}
        />
        <AddInput
          placeholder="Item Price"
          id="price"
          type="number"
          value={price}
          onChange={(value) => {
            setPrice(value);
            // console.log(value);
          }}
        />
        <AddInput
          placeholder="Items Quantity"
          type="number"
          id="Qty"
          value={qty}
          onChange={(value) => {
            setQty(value);
          }}
        />
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="border px-3 py-2 rounded-xl bg-green-400 font-bold text-white"
          >
            Submit
          </button>
        </div>
      </form>
      {/* table */}
      <div className="px-4 border-2 m-2 mt-5 rounded-2xl">
        <table class="table table-striped">
          <thead>
            <tr className="text-sm md:text-lg">
              <th scope="col">S No.</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm md:text-lg">
              <th scope="row">1</th>
              <td>kenwood</td>
              <td>300</td>
              <td>40</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPage;
