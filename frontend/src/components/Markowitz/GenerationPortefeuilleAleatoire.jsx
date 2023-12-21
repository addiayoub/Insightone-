import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import AccordionBox from "../AccordionBox";
import { useDispatch, useSelector } from "react-redux";
import {
  EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE,
  GENERATION_PORTEFEUILLES_ALEATOIRES,
} from "../../redux/actions/DataActions";
import PortefeuilleAleatoires from "../charts/PortefeuilleAleatoires";
import PortefeuilleFrontiere from "../charts/PortefeuilleFrontiere";
import MainLoader from "../loaders/MainLoader";
import PortefeuilleDonut from "../charts/PortefeuilleDonut";
import Modal from "../Modal";
import Ptf from "./PortefeuilleFrontiere";

function GenerationPortefeuilleAleatoire({ dateDebut, dateFin, titres }) {
  const [PTF, setPTF] = useState("");
  const [risque, setRisque] = useState("");
  const [nbrPointFront, setNbrPointFront] = useState("");
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    evolutionB100Frontiere,
    contraintesPoids,
    portefeuillesAleatoires: {
      data,
      loading,
      error,
      frontiere,
      frontiereWeights,
    },
  } = useSelector((state) => state.rapport);
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsLoading(true);
    setIsShow(false);
    if (contraintesPoids.data && contraintesPoids.data?.df_return?.length > 0) {
      dispatch(
        GENERATION_PORTEFEUILLES_ALEATOIRES({
          PTF,
          risque,
          nbrPointFront,
        })
      )
        .then(() =>
          dispatch(
            EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE({
              nbrPointFront,
            })
          )
        )
        .then(() => {
          setIsLoading(false);
          setIsShow(true);
        });
    }
  };
  useEffect(() => {
    console.log("name", name);
  }, [name]);
  return (
    <>
      <AccordionBox title={"Génération de portefeuille aléatoire"}>
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              contraintesPoids?.data?.df_return?.length < 1 || isLoading
            }
            onClick={handleClick}
          >
            {loading || evolutionB100Frontiere.loading
              ? "Veuillez patienter..."
              : "Valider"}
          </Button>
        </Box>
      </AccordionBox>
      {isLoading && <MainLoader />}
      {isShow &&
        !isLoading &&
        typeof data === "object" &&
        Object.keys(data).length > 0 && (
          <PortefeuilleAleatoires
            data={data}
            frontiere={frontiere}
            setName={setName}
            setOpen={setOpen}
          />
        )}
      {isShow &&
        !isLoading &&
        evolutionB100Frontiere.data[
          "Evolution base 100 des Portefeuille simulé"
        ].length > 0 && (
          <PortefeuilleFrontiere data={evolutionB100Frontiere.data} />
        )}
      {/* <Modal open={open} setOpen={setOpen} name={name}> */}
      {/* <PortefeuilleDonut
          data={frontiereWeights.filter((item) => item[name] > 0.01)}
          field={name}
        /> */}
      {name && (
        <Ptf
          data={frontiereWeights.filter((item) => item[name] > 0.01)}
          field={name}
        />
      )}
      {/* </Modal> */}
    </>
  );
}

export default GenerationPortefeuilleAleatoire;
