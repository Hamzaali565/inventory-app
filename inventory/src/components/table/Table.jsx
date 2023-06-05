import React from "react";

const Table = ({ index, price, Qty, names }) => {
  return (
    <div className="px-4 border-2 m-2 rounded-2xl">
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
            <th scope="row">{index}</th>
            <td>{names}</td>
            <td>{price}</td>
            <td>{Qty}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
