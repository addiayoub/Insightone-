import { Button } from "@mui/material";
import React from "react";
import { RefreshCcw } from "react-feather";

// Reset Contraintes
function ResetButton({ handleReset }) {
  return (
    <Button
      variant="contained"
      size="small"
      color="error"
      className="mt-3"
      onClick={handleReset}
    >
      Réinitialiser <RefreshCcw size={20} className="ml-2" />
    </Button>
  );
}

export default ResetButton;
