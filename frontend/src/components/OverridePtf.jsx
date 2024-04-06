import React from "react";
import { Box, Button } from "@mui/material";

const OverridePtf = (props) => {
  const { handleOverride, title } = props;
  return (
    <Box>
      <p>Êtes-vous sûr de vouloir remplacer cela ?</p>
      <Box className="flex items-center gap-2 flex-wrap my-2">
        <Button
          onClick={() => handleOverride(false)}
          variant="contained"
          color="error"
          size="small"
        >
          Annuler
        </Button>
        <Button
          onClick={() => handleOverride(true)}
          variant="contained"
          color="primary"
          size="small"
          disabled={!title}
        >
          Remplacer
        </Button>
      </Box>
    </Box>
  );
};

export default OverridePtf;
