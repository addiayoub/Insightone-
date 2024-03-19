import React, { memo } from "react";
import { Box, IconButton, Button } from "@mui/material";
import { Trash } from "react-feather";

const result = (array, action, actionHandler) => {
  return array.map((entry) => {
    return (
      <Box key={entry.id} className="flex justify-between">
        <span>{`${entry.indice} [${entry.operateur} ${entry.value}%]`}</span>
        <IconButton onClick={() => actionHandler(action, entry.id)}>
          <Trash size={20} color="var(--error-color)" />
        </IconButton>
      </Box>
    );
  });
};
const boxStyle =
  "border-1 border-solid border-primary p-5 max-h-[225px] h-full overflow-y-auto relative rounded-md";

function Result({
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
      <Box className={`${boxStyle}`}>
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
        <Box className={`${boxStyle}`}>
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

export default memo(Result);
