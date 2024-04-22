import React, { useRef, useState } from "react";
import AccordionBox from "../Ui/AccordionBox";
import { Box, FormControl, Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  evolutionB100Frontiere_,
  portefeuilleAleatoire_,
} from "../../redux/actions/OpcvmActions";
import MainLoader from "../loaders/MainLoader";
import PortefeuilleAleatoires from "../charts/PortefeuilleAleatoires";
import PortefeuilleFrontiere from "../charts/PortefeuilleFrontiere";
import { Aperture } from "react-feather";
import { ValidateButton } from "../Ui/Buttons";

function GenerationPortefeuille() {
  const [PTF, setPTF] = useState("");
  const [risque, setRisque] = useState("");
  const [nbrPointFront, setNbrPointFront] = useState("");
  const {
    evolutionB100Frontiere,
    portefeuillesAleatoires: {
      data,
      loading,
      error,
      frontiere,
      frontiereWeights,
    },
  } = useSelector((state) => state.opcvm);
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsLoading(true);
    setShow(false);
    // dispatch(portefeuilleSimule_({ risque }))
    //   .then(() => setShow(true))
    //   .finally(() => setIsLoading(false));
    dispatch(portefeuilleAleatoire_({ PTF, risque, nbrPointFront }))
      // .then(() => dispatch(portefeuilleSimule_({ risque })))
      .then(() => dispatch(evolutionB100Frontiere_({ nbrPointFront })))
      .then(() => setShow(true))
      .finally(() => setIsLoading(false));
  };
  const isDisabled =
    isLoading || PTF === "" || risque === "" || nbrPointFront === "";
  return (
    <>
      <AccordionBox
        title={"Génération de portefeuille aléatoire"}
        Icon={Aperture}
      >
        <Box>
          <FormControl className="flex flex-wrap flex-row gap-2.5 items-center mb-3">
            <Typography
              variant="caption"
              gutterBottom
              className="min-w-[150px]"
            >
              Nombre de PTF générés
            </Typography>
            <TextField
              id="nbr-ptf"
              label=""
              type="number"
              size="small"
              value={PTF}
              onChange={(event) => setPTF(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="min-w-[100px]"
            />
          </FormControl>
          <FormControl className="flex flex-wrap flex-row gap-2.5 items-center mb-3">
            <Typography
              variant="caption"
              gutterBottom
              className="min-w-[150px]"
            >
              Taux sans risque (%)
            </Typography>
            <TextField
              id="taux-sans-risque"
              label=""
              size="small"
              type="number"
              value={risque}
              onChange={(event) => setRisque(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="min-w-[100px]"
            />
          </FormControl>
          <FormControl className="flex flex-wrap flex-row gap-2.5 items-center mb-3">
            <Typography
              variant="caption"
              gutterBottom
              className="min-w-[150px]"
            >
              Nombres points frontiere
            </Typography>
            <TextField
              id="num-points-front"
              label=""
              size="small"
              type="number"
              value={nbrPointFront}
              onChange={(event) => setNbrPointFront(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="min-w-[100px]"
            />
          </FormControl>
        </Box>
        <Box className="block max-w-[400px] mt-4 mx-auto">
          <ValidateButton
            fullWidth
            onClick={handleClick}
            disabled={isDisabled}
          />
        </Box>
      </AccordionBox>
      {isLoading && <MainLoader />}
      {show &&
        !isLoading &&
        typeof data === "object" &&
        Object.keys(data).length > 0 && (
          <PortefeuilleAleatoires
            data={data}
            frontiere={frontiere}
            frontiereWeights={frontiereWeights}
            // setName={setName}
            type={"OPCVM"}
            setOpen={setOpen}
          />
        )}
      {show && !isLoading && evolutionB100Frontiere.data && (
        <PortefeuilleFrontiere data={evolutionB100Frontiere.data} />
      )}
    </>
  );
}

export default GenerationPortefeuille;
