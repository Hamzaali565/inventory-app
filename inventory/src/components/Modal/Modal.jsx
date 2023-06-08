import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddInput from "../AddInput/AddInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: 6,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal({
  open,
  handleClose,
  itemValue,
  costValue,
  priceValue,
  modelValue,
  quantityValue,
  onChangeCostPrice,
  onChangeModel,
  onChangeName,
  onChangePrice,
  onChangeQantity,
  onClickCencel,
  onClickUpdate,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title" className="text-center py-3">
            Edit Data
          </h2>
          <AddInput
            value={itemValue}
            onChange={onChangeName}
            placeholder={"itemName"}
          />
          <AddInput
            value={modelValue}
            onChange={onChangeModel}
            placeholder={"Model No."}
          />
          <AddInput
            value={priceValue}
            onChange={onChangePrice}
            placeholder={"Price"}
          />
          <AddInput
            value={costValue}
            onChange={onChangeCostPrice}
            placeholder={"Cost Price"}
          />
          <AddInput
            value={quantityValue}
            onChange={onChangeQantity}
            placeholder={"Quantity"}
          />
          <div className="flex justify-around mt-3">
            <button
              onClick={onClickUpdate}
              className="border py-2 px-3 rounded-2xl bg-green-400 font-bold text-white"
            >
              Update
            </button>
            <button
              onClick={onClickCencel}
              className="border py-2 px-3 rounded-2xl bg-green-400 font-bold text-white"
            >
              Cencel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
