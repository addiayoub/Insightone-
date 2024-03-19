import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

export default function RadioBtn({ data, setOperateur }) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="contraintes-radio-buttons-label"
        defaultValue={data[0]}
        onChange={(event) => setOperateur(event.target.value)}
        name="contraintes-radio-buttons"
      >
        {data.map((option, index) => {
          return (
            <FormControlLabel
              value={option}
              key={index}
              control={<Radio size="small" />}
              label={option}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
