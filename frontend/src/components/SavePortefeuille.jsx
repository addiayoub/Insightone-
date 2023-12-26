import { Button } from "@mui/material";
import React from "react";
import { memo } from "react";
import { Save } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { savePortefeuille } from "../redux/actions/UserActions";
import { notyf } from "../utils/notyf";

const SavePortefeuille = ({ title, data, type }) => {
  const { params } =
    type === "OPCVM"
      ? useSelector((state) => state.opcvm)
      : useSelector((state) => state.rapport);
  const dispatch = useDispatch();
  const handleSave = () => {
    console.log("params", params);
    const portefeuille = {
      name: title,
      type,
      params,
      data,
    };
    console.log("portefeuille", portefeuille);

    dispatch(savePortefeuille({ portefeuille }))
      .unwrap()
      .then(({ message }) => notyf.success(message));
  };
  return (
    <Button onClick={handleSave}>
      <span>Enregistrer</span>
      <Save />
    </Button>
  );
};

export default memo(SavePortefeuille);
