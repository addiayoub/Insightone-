import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import AccordionBox from "../AccordionBox";
function Optimisation() {
  return (
    <AccordionBox title={"Optimisation"}>
      <Box>
        <FormControl className="flex flex-wrap flex-row gap-2.5 items-center mb-3">
          <Typography variant="caption" gutterBottom className="min-w-[150px]">
            Rendement de départ
          </Typography>
          <TextField
            id="rendement-dep"
            label=""
            type="number"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            className="min-w-[100px]"
          />
        </FormControl>
        <FormControl className="flex flex-wrap flex-row gap-2.5 items-center mb-3">
          <Typography variant="caption" gutterBottom className="min-w-[150px]">
            Rendement Max
          </Typography>
          <TextField
            id="vrendement-max"
            label=""
            size="small"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="min-w-[100px]"
          />
        </FormControl>
        <FormControl className="flex flex-wrap flex-row gap-2.5 items-center mb-3">
          <Typography variant="caption" gutterBottom className="min-w-[150px]">
            Pas de rendement
          </Typography>
          <TextField
            id="pas-de-rendement"
            label=""
            type="number"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            className="min-w-[100px]"
          />
        </FormControl>
      </Box>
      <Box className="block max-w-[400px] mt-4 mx-auto">
        <Button variant="contained" color="primary" fullWidth>
          Valider
        </Button>
      </Box>
    </AccordionBox>
  );
}

export default Optimisation;
