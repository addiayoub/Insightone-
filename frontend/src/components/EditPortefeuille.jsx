import { Button, Box } from "@mui/material";
import React from "react";
import { calculateSumPoids, ajuster } from "../utils/Markowitz/helpers";
import { useDispatch } from "react-redux";
import { updatePortefeuilles } from "../redux/actions/UserActions";
import { notyf } from "../utils/notyf";
import { setPtfToBacktest } from "../redux/slices/BacktestSlice";
import { Save, Zap } from "react-feather";

const EditPortefeuille = ({
  oldRows,
  newRows,
  setNewRows,
  field,
  children,
}) => {
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(updatePortefeuilles({ ptfs: newRows }))
      .unwrap()
      .then(({ message, portefeuille }) => {
        dispatch(setPtfToBacktest(portefeuille));
        notyf.success(message);
      })
      .catch(() => notyf.error("Error Update"));
  };

  return (
    <Box className="flex flex-wrap flex-col content-end items-center gap-3">
      <h4>
        La somme: {calculateSumPoids(newRows, field)}/
        {calculateSumPoids(oldRows, field)}
      </h4>
      <Box className="flex flex-wrap gap-y-1 items-center">
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => ajuster(newRows, setNewRows, field)}
          className="flex gap-1 items-center"
        >
          Ajuster <Zap size={18} />
        </Button>
        {/* <Button
          variant="contained"
          onClick={() => {
            console.log("Before ", oldRows, "After", newRows);
            handleSave();
          }}
          className="flex gap-1 items-center"
          disabled={
            calculateSumPoids(oldRows, field) !==
            calculateSumPoids(newRows, field)
          }
        >
          Enregistrer <Save size={18} />
        </Button> */}
        {children}
      </Box>
    </Box>
  );
};

export default EditPortefeuille;
