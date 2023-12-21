import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function RadioBtn({ data, setOperateur }) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={data[0]}
        onChange={(event) => setOperateur(event.target.value)}
        name="radio-buttons-group"
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
