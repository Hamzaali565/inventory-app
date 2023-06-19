import React from "react";

const AddInput = ({ placeholder, type, onChange, id, value, className }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex justify-center">
      <input
        className={`border-black border-2 p-2 mt-2 outline-blue-600 rounded lg:w-40 ${
          className ? className : "w-72"
        }`}
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
