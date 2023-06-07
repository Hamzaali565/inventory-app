import React, { useEffect, useState } from "react";
import Auto from "../../components/autocomplete/Auto";
import AddInput from "../../components/AddInput/AddInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

const MainPage = () => {
  const [itemName, setItemName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setPrice] = useState("");
  const [quantity, setQty] = useState("");
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    GetTables();
  }, [!toggle]);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:5001/api/v1/addventory",
        {
          itemName,
          sellingPrice,
          costPrice,
          quantity,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response", response);
      if (response) setToggle(!toggle);
      // setCostPrice("");
      // setItemName("");
      // setPrice("");
      // setQty("");
    } catch (error) {}
  };

  const GetTables = async () => {
    let response = await axios.get("http://localhost:5001/api/v1/getventory", {
      withCredentials: true,
    });
    setData(response.data.data);
  };
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
          options={data.map((items) => items.itemName)}
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
          value={sellingPrice}
          onChange={(value) => {
            setPrice(value);
            // console.log(value);
          }}
        />
        <AddInput
          placeholder="Items Quantity"
          type="number"
          id="Qty"
          value={quantity}
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
            <tr className="text-xs md:text-lg">
              <th scope="col">S No.</th>
              <th scope="col">Name</th>
              <th scope="col">Model</th>
              <th scope="col">Price</th>
              <th scope="col">E</th>
              <th scope="col">D</th>
              {/* <th scope="col">Delete</th> */}
              <th scope="col">Qty</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-xs md:text-lg">
                <th scope="row">{index + 1}</th>
                <td>{item.itemName}</td>
                <td>{item.sellingPrice}</td>
                <td>{item.sellingPrice}</td>
                <td>
                  <BiEditAlt />
                </td>
                <td>
                  <AiFillDelete />
                </td>
                {/* <td>{item.sellingPrice}</td> */}
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPage;
