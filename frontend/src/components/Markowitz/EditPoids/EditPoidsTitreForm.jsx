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
      // sx={{
      //   maxHeight: "460px",
      //   overflowY: "auto",
      // }}
      className="bg-yellow-400"
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
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              mb: 3,
            }}
          >
            <span>{titre}</span>
            <Slider
              aria-label="poids-slider"
              value={+poids}
              onChange={(event, value) => setPoids(value)}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => value + " %"}
              sx={{
                maxWidth: 150,
              }}
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
              sx={{ maxWidth: 100 }}
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
        <Box
          sx={{
            alignSelf: "end",
          }}
        >
          <Button
            variant="contained"
            color="error"
            sx={{
              margin: "0 10px",
            }}
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
