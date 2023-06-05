import React from "react";

const AddInput = ({ placeholder, type, onChange, id, value }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex justify-center">
      <input
        className="border-black border-2 p-2 mt-2 outline-blue-600 rounded w-72  lg:w-40"
        type={type}
        placeholder={placeholder}
        id={id}
        min={0}
        onChange={handleInputChange}
        value={value}
      />
    </div>
  );
};

export default AddInput;
