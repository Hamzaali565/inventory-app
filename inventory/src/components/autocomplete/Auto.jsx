import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

const Auto = ({ options, id, onChange, onInputChange, defaultValue }) => {
  const data = [
    { city: "lahore" },
    { city: "lahore" },
    { city: "lahore" },
    { city: "lahore" },
  ];
  return (
    <div className="flex justify-center mt-2">
      <Autocomplete
        className="w-72 lg:w-40"
        disablePortal
        id={id}
        onInputChange={onInputChange}
        options={options}
        onChange={onChange}
        // value={value}
        // defaultValue={defaultValue}
        sx={{
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 2,
          outline: "#42a5f5",
        }}
        renderInput={(params) => <TextField {...params} label="Items Name" />}
      />
    </div>
  );
};

export default Auto;
