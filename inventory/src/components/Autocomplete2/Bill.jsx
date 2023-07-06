import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Auto from "../autocomplete/Auto";
// const data = [
//   { itemName: "kenwood", price: 300 },
//   { itemName: "hamza", price: 600 },
// ];
// const initialItems = [
//   { id: 5, itemName: "kenwood", price: "20", quantity: 4 },
//   { id: 14, itemName: "Pioneer", price: "13000", quantity: "3" },
// ];
function Bill() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");
  const [billId, setBillId] = useState("");
  const [show, setShow] = useState(false);

  const [data, setData] = useState([]);
  const itemRefs = useRef([]);

  // const [itemsa] = useState(initialItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const [items, setItems] = useState([
    { itemName: "", price: "", quantity: "" },
  ]);
  useEffect(() => {
    allData();
    if (itemRefs.current.length > 0) {
      itemRefs.current[0].current.focus();
    }
  }, []);
  const calculateProfit = () => {
    let totalProfit = 0;

    items.forEach((item1) => {
      const matchingItem2 = data.find((item2) => item2.id === item1.id);
      const price = parseFloat(item1.price);
      const quantity = parseInt(item1.quantity);

      if (matchingItem2) {
        const costPrice = parseFloat(matchingItem2.costPrice);
        const itemProfit = (price - costPrice) * quantity;
        totalProfit += itemProfit;
      } else {
        const itemProfit = price * quantity;
        totalProfit += itemProfit.toString();
      }
    });

    console.log("Profit:", totalProfit);
    setTotalProfit(totalProfit);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    items.forEach((item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);
      total += price * quantity;
    });
    setTotalPrice(total);
  };

  const calculateTotalCost = () => {
    let totalCost = 0;

    items.forEach((item1) => {
      const matchingItem2 = data.find((item2) => item2.id === item1.id);

      if (matchingItem2) {
        const costPrice = parseFloat(matchingItem2.costPrice);
        const quantity = parseInt(item1.quantity);
        const itemCost = costPrice * quantity;
        totalCost += itemCost;
      }
    });

    console.log("Total Cost:", totalCost);
    setTotalCost(totalCost);
  };

  const allData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/v1/getventory",
        { withCredentials: true }
      );
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const Push = async () => {
    console.log(totalPrice);
    try {
      let response = await axios.post(
        "http://localhost:5001/api/v1/addBilling",
        { data: items, totalPrice },
        { withCredentials: true }
      );
      console.log(response.data.id);
      setBillId(response.data.id);

      // setItems([{ itemName: "", price: "", quantity: "", id: "" }]);
      // setTotalPrice("0");
    } catch (error) {
      console.log(error);
    }
  };

  const clear = () => {
    setItemName("");
    setId("");
    setPrice("");
    setQuantity("");
  };

  const handleInputChange = (e, index, field) => {
    if (e.key === "Enter") {
      addNewLine();
      return;
    }
    const updatedItems = [...items];
    const newItem = { ...updatedItems[index], [field]: e.target.value };
    let price = "";
    if (field === "itemName") {
      const foundItem = data.find((item) => item.itemName === newItem.itemName);
      newItem.quantity = 1;
      if (foundItem) {
        console.log(foundItem.sellingPrice);
        newItem.price = foundItem.sellingPrice;
        newItem.id = foundItem.id;
      }
      calculateTotalPrice();
    }
    if (field === "price") {
      price = newItem.price;
      console.log(price);
      calculateTotalPrice();
      // calculateTotalPrice();
    }
    updatedItems[index] = newItem;

    const existingItemIndex = updatedItems.findIndex(
      (item, i) =>
        i !== index &&
        item.itemName === newItem.itemName &&
        item.price === newItem.price
    );

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity =
        Number(updatedItems[existingItemIndex].quantity) +
        Number(newItem.quantity);
      updatedItems.splice(index, 1);
    }
    setItems(updatedItems);
    calculateTotalPrice();
  };

  const addNewLine = () => {
    setItems([...items, { itemName: "", price: "", quantity: "" }]);
    console.log(items);
  };

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="border-4 w-96">
          <div className="flex justify-around mt-2">
            <div className="font-bold">Item Name</div>
            <div className="font-bold">Price</div>
            <div className="font-bold">Quantity</div>
          </div>
          {items.map((item, index) => (
            <div key={index} className="flex justify-around mt-2">
              <input
                type="text"
                placeholder="Item Name"
                value={item.itemName}
                className="w-24 border text-center"
                onChange={(e) => handleInputChange(e, index, "itemName")}
                onKeyDown={(e) => handleInputChange(e, index, "itemName")}
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                className="w-24 border text-center"
                onChange={(e) => handleInputChange(e, index, "price")}
                onKeyDown={(e) => handleInputChange(e, index, "price")}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-24 border text-center"
                value={item.quantity}
                onChange={(e) => handleInputChange(e, index, "quantity")}
                onKeyDown={(e) => handleInputChange(e, index, "quantity")}
              />
            </div>
          ))}
          <div className="flex justify-around items-center mt-3">
            <p className="font-bold" onClick={calculateProfit}>
              Total
            </p>
            <p className="font-bold">{totalPrice}</p>
          </div>
          <div className="flex justify-center space-x-2 items-center ">
            <p className="text-sm">Bill No.</p>
            <p className="text-sm">{billId}</p>
          </div>
          {/* <button onClick={addNewLine}>Change Line</button> */}
          <div className="flex justify-center">
            <button
              onClick={Push}
              className="border py-2 px-3 rounded-2xl bg-green-400 font-bold text-white"
            >
              Print
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="border-4 w-72 p-2">
          <div className="flex justify-center">
            <div
              className=" font-bold cursor-pointer"
              onClick={() => {
                setShow(!show);
                calculateProfit();
                calculateTotalCost();
                calculateTotalPrice();
                console.log("items.length", items.length);
              }}
            >
              {show ? "Hide Details" : "Show Detail"}
            </div>
            {/* <div></div> */}
          </div>
          <div className={` ${show ? "flex" : "hidden"} justify-between`}>
            <div className="font-bold">Cost </div>
            <div>{totalCost}</div>
          </div>
          <div className={` ${show ? "flex" : "hidden"} justify-between`}>
            <div className="font-bold">Sell</div>
            <div>{totalPrice}</div>
          </div>
          <div className={` ${show ? "flex" : "hidden"} justify-between`}>
            <div className="font-bold">Profit</div>
            <div>{totalProfit}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;
