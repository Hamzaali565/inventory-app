import React, { useState } from "react";

function RoughWork() {
  const [array1, setArray1] = useState([
    { itemName: "Pioneer", price: "13000", quantity: 2, id: 14 },
    { itemName: "kenwood", price: "20", quantity: 2, id: 5 },
    { itemName: "jazz", price: "566", quantity: 2 },
  ]);
  // 1000 * 2 + 5 * 2 + 566 * 2
  const [array2] = useState([
    {
      costPrice: "15",
      id: 5,
      itemName: "kenwood",
      model: "3",
      quantity: "2",
      sellingPrice: "20",
    },
    {
      costPrice: "148",
      id: 11,
      itemName: "kenwood",
      model: "7",
      quantity: "2",
      sellingPrice: "206",
    },
    {
      costPrice: "15",
      id: 12,
      itemName: "kenwood",
      model: "3",
      quantity: "2",
      sellingPrice: "20",
    },
    {
      costPrice: "12000",
      id: 14,
      itemName: "Pioneer",
      model: "0900",
      quantity: "6",
      sellingPrice: "13000",
    },
    {
      costPrice: "12000",
      id: 15,
      itemName: "Pioneer",
      model: "0900",
      quantity: "6",
      sellingPrice: "13000",
    },
  ]);

  const calculateTotal = () => {
    const total = array1.reduce((acc, item) => {
      const price = parseInt(item.price);
      const quantity = parseInt(item.quantity);
      return acc + price * quantity;
    }, 0);
    console.log("Total:", total);
  };

  const calculateProfit = () => {
    let totalProfit = 0;

    array1.forEach((item1) => {
      const matchingItem2 = array2.find((item2) => item2.id === item1.id);
      if (matchingItem2) {
        const costPrice = parseFloat(matchingItem2.costPrice);
        const sellingPrice = parseFloat(matchingItem2.sellingPrice);
        const quantity = parseInt(item1.quantity);
        const itemProfit = (sellingPrice - costPrice) * quantity;
        totalProfit += itemProfit;
      } else {
        const price = parseFloat(item1.price);
        const quantity = parseInt(item1.quantity);
        const itemProfit = price * quantity;
        totalProfit += itemProfit;
      }
    });

    console.log("Profit:", totalProfit);
  };

  return (
    <div>
      {/* Your existing JSX code here */}
      <button onClick={calculateTotal}>Calculate Total</button>
      <button onClick={calculateProfit}>Calculate Profit</button>
    </div>
  );
}

export default RoughWork;
