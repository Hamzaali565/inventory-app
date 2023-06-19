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
  //   width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: 6,
  boxShadow: 24,
  pt: 2,
  px: 2,
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
        <Box sx={{ ...style }} className="lg:w-96 sm:w-80 w-72 lg:px-4">
          <h2 id="parent-modal-title" className="text-center py-3">
            Edit Data
          </h2>
          <div className="">
            <div className="items-center flex justify-between">
              <label
                htmlFor="itemName "
                className="font-bold text-xs lg:text-sm"
              >
                Item Name:
              </label>
              <AddInput
                className={"w-40"}
                value={itemValue}
                onChange={onChangeName}
                placeholder={"itemName"}
              />
            </div>
            <div className="items-center flex justify-between">
              <label
                htmlFor="Model No."
                className="font-bold text-xs lg:text-sm"
              >
                Model No.:
              </label>
              <AddInput
                className={"w-40"}
                value={modelValue}
                onChange={onChangeModel}
                placeholder={"Model No."}
              />
            </div>
            <div className="items-center flex justify-between">
              <label
                htmlFor="Selling Price "
                className="font-bold text-xs lg:text-sm"
              >
                Selling Price:
              </label>
              <AddInput
                className={"w-40"}
                value={priceValue}
                onChange={onChangePrice}
                placeholder={"Price"}
              />
            </div>
            <div className="items-center flex justify-between">
              <label
                htmlFor="Cost Price"
                className="font-bold text-xs lg:text-sm"
              >
                Cost Price:
              </label>
              <AddInput
                className={"w-40"}
                value={costValue}
                onChange={onChangeCostPrice}
                placeholder={"Cost Price"}
              />
            </div>
            <div className="items-center flex justify-between">
              <label
                htmlFor="Quantity"
                className="font-bold text-xs lg:text-sm"
              >
                Quantity:
              </label>
              <AddInput
                className={"w-40"}
                value={quantityValue}
                onChange={onChangeQantity}
                placeholder={"Quantity"}
              />
            </div>
            <div className="flex justify-between mt-3">
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
          </div>
        </Box>
      </Modal>
    </div>
  );
}
