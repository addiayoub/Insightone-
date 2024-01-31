import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import "notyf/notyf.min.css";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import AreaChartIcon from "../../icons/AreaChartIcon";
import BarChartIcon from "../../icons/BarChartIcon";
import LineChartIcon from "../../icons/LineChartIcon";
import {
  closeModal,
  setCustomization,
  showChart,
} from "../../redux/slices/DataSlice";
import "./SettingsModal.css";

const pickerStyle = {
  default: {
    picker: {
      position: "absolute",
      bottom: "50px",
      left: "0",
      zIndex: 3,
      width: "100%",
      maxWidth: "200px",
    },
  },
};

function SettingsModal() {
  const { modalIsOpen, customization } = useSelector((state) => state.rapport);
  console.log(customization);
  const dispatch = useDispatch();
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setCustomization({
        title,
        xAxis,
        yAxis1: {
          title: selectedOption1,
          type: selectedType1,
          color: color1,
        },
        yAxis2: {
          title: selectedOption2,
          type: selectedType2,
          color: color2,
        },
      })
    );
    dispatch(showChart());
    dispatch(closeModal());
  };
  const [title, setTitle] = useState(customization.title);
  const [xAxis, setxAxis] = useState(customization.xAxis);

  const [selectedOption1, setSelectedOption1] = useState(
    customization.yAxis1.title
  );
  const [selectedType1, setSelectedType1] = useState(customization.yAxis1.type);
  const [color1, setColor1] = useState(customization.yAxis1.color);
  const [isHide1, setIsHide1] = useState(true);

  const [selectedOption2, setSelectedOption2] = useState(
    customization.yAxis2.title
  );
  const [selectedType2, setSelectedType2] = useState(customization.yAxis2.type);
  const [color2, setColor2] = useState(customization.yAxis2.color);
  const [isHide2, setIsHide2] = useState(true);

  const handleTypeChange1 = (event) => {
    setSelectedType1(event.target.value);
  };
  const handleTypeChange2 = (event) => {
    setSelectedType2(event.target.value);
  };
  const handleOptionChange1 = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);
    setSelectedOption2("");
  };

  const handleOptionChange2 = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
  };
  const options = [
    { label: "Séance", value: "Seance", hide: true },
    { label: "Secteur", value: "Secteur", hide: true },
    // { label: "MASI", value: "masi" },
    { label: "Variation", value: "Variation", hide: false },
    { label: "Valeur", value: "Valeur", hide: false },
  ];
  const chartTypes = [
    { label: "Ligne", value: "line", icon: LineChartIcon },
    { label: "Barres", value: "column", icon: BarChartIcon },
    { label: "Area", value: "area", icon: AreaChartIcon },
  ];
  const handleXAxisChange = (selectedOption) => {
    setxAxis(selectedOption);
  };
  const handelClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Modal
        open={modalIsOpen}
        onClose={handelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container minWidth="sm">
          <Box
            component="form"
            noValidate
            onSubmit={handelSubmit}
            className="form"
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Paramètres Graphique</Typography>
              <Button onClick={handelClose}>
                <CloseIcon color="error" />
              </Button>
            </Box>
            <Box>
              <TextField
                id="chart-title"
                label="Titre du Graphique"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box>
              <fieldset>
                <legend>
                  <Typography variant="h7">Axe X:</Typography>
                </legend>
                <FormControl fullWidth>
                  <RadioGroup
                    row
                    aria-labelledby="xAxis-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    fullWidth
                  >
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      {options.map(({ label, value }, index) => {
                        if (value === "Seance") {
                          return (
                            <Grid key={index} item xs={6}>
                              <FormControlLabel
                                value={value}
                                control={<Radio />}
                                label={label}
                                checked={xAxis === value}
                                onChange={() => handleXAxisChange(value)}
                              />
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </fieldset>
            </Box>
            <Box>
              <fieldset>
                <legend>
                  <Typography variant="h7">Axe Y:</Typography>
                </legend>

                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
                  <Grid item xs={6}>
                    <Grid container rowGap={2}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="select-yAxis1">Axe Y1</InputLabel>
                          <Select
                            labelId="select-yAxis1"
                            id="simple-select"
                            value={selectedOption1}
                            label="Axe Y1"
                            onChange={handleOptionChange1}
                          >
                            {options.map(({ label, value, hide }, index) => {
                              if (hide) {
                                return;
                              }
                              return (
                                <MenuItem
                                  value={value}
                                  disabled={selectedOption2 === value}
                                  key={index}
                                >
                                  {label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="select-yAxis1Type">Type</InputLabel>
                          <Select
                            labelId="select-yAxis1Type"
                            id="simple-select"
                            label="Type"
                            value={selectedType1}
                            onChange={handleTypeChange1}
                          >
                            {chartTypes.map((type, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  value={type.value}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <type.icon size={20} />
                                  {type.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <FormLabel>Couleur</FormLabel>
                          <Box sx={{ position: "relative" }}>
                            {!isHide1 && (
                              <SketchPicker
                                styles={pickerStyle}
                                color={color1}
                                onChange={(newColor) => setColor1(newColor.hex)}
                              />
                            )}
                            <span
                              className="color-picker"
                              style={{
                                backgroundColor: color1,
                              }}
                              onClick={() => setIsHide1(!isHide1)}
                            ></span>
                          </Box>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container rowGap={2}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="select-yAxis2">Axe Y2</InputLabel>
                          <Select
                            labelId="select-yAxis2"
                            id="simple-select"
                            value={selectedOption2}
                            label="Axe Y2"
                            onChange={handleOptionChange2}
                          >
                            {options.map(({ label, value, hide }, index) => {
                              if (hide) {
                                return;
                              }
                              return (
                                <MenuItem
                                  value={value}
                                  disabled={selectedOption1 === value}
                                  key={index}
                                >
                                  {label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="select-yAxis2Type">Type</InputLabel>
                          <Select
                            labelId="select-yAxis2Type"
                            id="simple-select"
                            label="Type"
                            value={selectedType2}
                            onChange={handleTypeChange2}
                          >
                            {chartTypes.map((type, index) => {
                              return (
                                <MenuItem key={index} value={type.value}>
                                  <type.icon size={20} />
                                  {type.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <FormLabel>Couleur</FormLabel>
                          <Box sx={{ position: "relative" }}>
                            {!isHide2 && (
                              <SketchPicker
                                styles={pickerStyle}
                                color={color2}
                                onChange={(newColor) => setColor2(newColor.hex)}
                              />
                            )}
                            <span
                              className="color-picker"
                              style={{
                                backgroundColor: color2,
                              }}
                              onClick={() => setIsHide2(!isHide2)}
                            ></span>
                          </Box>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </fieldset>
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              mt={2}
            >
              <Button variant="contained" type="submit">
                Valider
              </Button>
              <Button variant="outlined" onClick={handelClose}>
                Annuler
              </Button>
            </Stack>
          </Box>
        </Container>
      </Modal>
    </>
  );
}

export default SettingsModal;
