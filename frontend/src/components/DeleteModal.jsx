import React from "react";
import { Button } from "@mui/material";

const DeleteModal = ({ onDelete, onCancel }) => {
  return (
    <>
      <h1>Are you sure</h1>
      <Button onClick={onDelete}> Delete</Button>
      <Button onClick={onCancel}> Cancel</Button>
    </>
  );
};

export default DeleteModal;
