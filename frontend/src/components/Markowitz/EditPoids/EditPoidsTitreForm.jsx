import React from "react";
import { calculateSumSecteur } from "../../../utils/Markowitz/helpers";
import {
  Typography,
  Button,
  Box,
  Divider,
  TextField,
  Slider,
} from "@mui/material";

const EditPoidsTitreForm = ({
  rows,
  poids,
  setPoids,
  reset,
  titre,
  handleUpdate,
  field,
}) => {
  const { SECTEUR_ACTIVITE, [field]: oldPoids } = rows.find(
    (row) => row.titre === titre
  );
  const sameSecteur = rows.filter(
    (row) => row.SECTEUR_ACTIVITE === SECTEUR_ACTIVITE && row.titre !== titre
  );
  const { sum } = calculateSumSecteur(rows, SECTEUR_ACTIVITE, field);
  const poidsSecteur = sum - oldPoids;
  return (
    <Box
      sx={{
        maxHeight: "460px",
        overflowY: "auto",
      }}
    >
      <Box>
        <Typography variant="h6" mb={3}>
          Modifier poids
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          height: "250px",
          minWidth: "400px",
          width: "100%",
          mt: 3,
        }}
        className="flex flex-wrap flex-col justify-between"
      >
        <Box>
          <Box className="flex gap-3 items-center mb-3">
            <span>{titre}</span>
            <Slider
              aria-label="poids-slider"
              value={+poids}
              onChange={(event, value) => setPoids(value)}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => value + " %"}
              className="max-w-[150px]"
              step={0.5}
              min={0}
              max={100}
            />
            <TextField
              id="poids"
              label="Poids (%)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              autoFocus
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="max-w-[100px]"
            />
          </Box>

          <Box>
            <div>
              Poids secteur:
              <strong>
                {` ${SECTEUR_ACTIVITE}: ${(poidsSecteur + +poids).toFixed(2)}`}
              </strong>
            </div>
            {sameSecteur.map((item) => {
              return (
                <Box key={item.TICKER}>
                  {item.titre} : <strong> {item[field].toFixed(2)}</strong>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box className="self-end">
          <Button
            variant="contained"
            color="error"
            className="mx-[10px]"
            onClick={reset}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleUpdate();
            }}
            disabled={!poids || poids > 100 || poids < 0}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPoidsTitreForm;
