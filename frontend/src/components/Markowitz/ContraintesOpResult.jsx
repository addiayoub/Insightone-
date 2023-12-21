import { Box, IconButton, Button } from "@mui/material";
import React from "react";
import { Trash } from "react-feather";

const result = (array, action, actionHandler) => {
  return array.map((entry) => {
    return (
      <Box key={entry.id} sx={{ ...divStyle }}>
        <span>{`${entry.indice} [${entry.operateur} ${entry.value}%]`}</span>
        <IconButton onClick={() => actionHandler(action, entry.id)}>
          <Trash size={20} color="var(--text-warning)" />
        </IconButton>
      </Box>
    );
  });
};
const style = {
  border: "1px solid var(--primary-color)",
  padding: "20px",
  maxHeight: "225px",
  height: "225px",
  overflowY: "scroll",
  position: "relative",
};
const divStyle = {
  display: "flex",
  justifyContent: "space-between",
};

function ContraintesOpResult({
  contrainteVal,
  setContraintVal,
  contrainteRelaVal,
  setContrainteRelaVal,
  relative = true,
}) {
  const handleDelete = (choice, id) => {
    if (choice === "contrainte") {
      const filtered = contrainteVal.filter((item) => item.id !== id);
      setContraintVal(filtered);
    } else {
      const filtered = contrainteRelaVal.filter((item) => item.id !== id);
      setContrainteRelaVal(filtered);
    }
  };
  return (
    <Box className="flex flex-col gap-2 w-[450px]">
      <Box sx={{ ...style }}>
        {contrainteVal.length > 0 && (
          <Button
            onClick={() => setContraintVal([])}
            sx={{
              margin: "0 0 10px calc(100% - 100px)",
            }}
            variant="contained"
            size="small"
            color="error"
          >
            réinitialiser
          </Button>
        )}
        {result(contrainteVal, "contrainte", handleDelete)}
      </Box>
      {relative && (
        <Box sx={{ ...style }}>
          {contrainteRelaVal.length > 0 && (
            <Button
              onClick={() => setContrainteRelaVal([])}
              sx={{
                margin: "0 0 10px calc(100% - 100px)",
              }}
              variant="contained"
              size="small"
              color="error"
            >
              réinitialiser
            </Button>
          )}
          {result(contrainteRelaVal, "contrainte relative", handleDelete)}
        </Box>
      )}
    </Box>
  );
}

export default ContraintesOpResult;
