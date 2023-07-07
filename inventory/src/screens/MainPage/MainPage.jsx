import React, { useEffect, useState } from "react";
import AddInput from "../../components/AddInput/AddInput";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import NestedModal from "../../components/Modal/Modal";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";

const MainPage = () => {
  const [itemName, setItemName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setPrice] = useState("");
  const [quantity, setQty] = useState("");
  const [model, setModel] = useState("");
  const [id, setId] = useState("");

  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = React.useState(false);

  const url = useSelector((state) => state.url);
  console.log("uuuu", url);

  useEffect(() => {
    GetTables();
  }, [!toggle]);

  const Empty = () => {
    setCostPrice("");
    setItemName("");
    setPrice("");
    setQty("");
    setModel("");
  };
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
          model,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response", response);
      setToggle(!toggle);
      Empty();
    } catch (error) {
      console.log("error", error);
    }
  };

  const GetTables = async () => {
    try {
      let response = await axios.get(
        "http://localhost:5001/api/v1/getventory",
        {
          withCredentials: true,
        }
      );
      setData(response.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  const Edits = async () => {
    try {
      let response = await axios.put(
        `http://localhost:5001/api/v1/updateventory`,
        {
          itemName,
          sellingPrice,
          costPrice,
          model,
          quantity,
          id,
        },
        { withCredentials: true }
      );
      console.log(response);
      Empty();
      setOpen(false);
    } catch (error) {
      console.log("err", error);
    }
  };
  const Deletes = async (id) => {
    console.log("id", id);
    try {
      let response = await axios.delete(
        `http://localhost:5001/api/v1/delventory/${id}`,
        { withCredentials: true }
      );
      console.log("response", response);
      setToggle(!toggle);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChange = (event) => {
    setQty(event.target.value);
    console.log(event.target.value);
  };
  const handleOpen = (item) => {
    setItemName(item.itemName);
    setPrice(item.sellingPrice);
    setQty(item.quantity);
    setModel(item.model);
    setCostPrice(item.costPrice);
    setId(item.id);
    setOpen(true);
    console.log(item.model);
  };
  const handleClose = () => {
    setOpen(false);
    Empty();
  };

  return (
    <div>
      <Header />
      <div className="my-3 font-semibold text-2xl flex justify-center lg:justify-start lg:ml-4">
        Add Inventory
      </div>
      {/* form */}
      <form className="lg:flex justify-around" onSubmit={SubmitHandler}>
        <AddInput
          placeholder={"Item Name"}
          value={itemName}
          id={"itemName"}
          onChange={(value) => {
            setItemName(value.charAt(0).toUpperCase() + value.slice(1));
          }}
        />
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
        <AddInput
          placeholder="Model No."
          type="number"
          id="model"
          value={model}
          onChange={(value) => {
            setModel(value);
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
              <th scope="col">Qty</th>
              <th scope="col">E</th>
              <th scope="col">D</th>
              {/* <th scope="col">Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-xs md:text-lg">
                <th scope="row">{index + 1}</th>
                <td>{item.itemName}</td>
                <td>{item.model}</td>
                <td>{item.sellingPrice}</td>
                <td>{item.quantity}</td>
                <td
                  onClick={() => {
                    handleOpen(item);
                  }}
                >
                  <BiEditAlt />
                </td>
                <td
                  onClick={() => {
                    Deletes(item?.id);
                  }}
                >
                  <AiFillDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NestedModal
        open={open}
        onClickCencel={handleClose}
        onClickUpdate={Edits}
        itemValue={itemName}
        priceValue={sellingPrice}
        quantityValue={quantity}
        modelValue={model}
        costValue={costPrice}
        onChangeCostPrice={(value) => {
          setCostPrice(value);
        }}
        onChangeModel={(value) => {
          setModel(value);
        }}
        onChangeName={(value) => {
          setItemName(value);
        }}
        onChangePrice={(value) => {
          setPrice(value);
        }}
        onChangeQantity={(value) => {
          setQty(value);
        }}
      />
    </div>
  );
};

export default MainPage;
