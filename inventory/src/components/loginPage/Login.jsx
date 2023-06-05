import React from "react";

const Login = ({ onChange, placeholder, type, value, id }) => {
  return (
    <div className="flex justify-center mt-7">
      <input
        type={type}
        name=""
        id={id}
        className="w-72 p-2 outline-blue-700 border-2 border-black rounded"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Login;
