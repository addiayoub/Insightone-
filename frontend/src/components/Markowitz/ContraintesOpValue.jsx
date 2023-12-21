import { Box, Button, TextField } from "@mui/material";
import React from "react";

function ContraintesOpValue({
  operateur,
  opValue,
  setOpValue,
  handleClick,
  error,
  relative = true,
}) {
  return (
    <Box className="flex flex-col gap-4">
      <TextField
        id="op-val"
        label="%"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        {...(error && { error: true, helperText: error })}
        className="min-w-[100px]"
        value={opValue}
        onChange={(e) => setOpValue(e.target.value)}
      />
      <Box className="flex flex-col gap-2">
        <Button
          variant="contained"
          color="hover"
          onClick={() => handleClick("contrainte", operateur, opValue)}
        >
          Ajouter contrainte
        </Button>
        {relative && (
          <Button
            variant="contained"
            color="hover"
            onClick={() =>
              handleClick("contrainte_relative", operateur, opValue)
            }
          >
            Ajouter contrainte relative
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ContraintesOpValue;
