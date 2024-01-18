import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadCsv } from "../../../redux/actions/UserActions";
import { FileUploader } from "react-drag-drop-files";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SingleSelect from "../../SingleSelect";
import { notyf } from "../../../utils/notyf";
import { setPortefeuilles } from "../../../redux/slices/UserSlice";
import MainLoader from "../../loaders/MainLoader";
import InvalidsTitres from "../../InvalidsTitres";
import PtfForm from "./PtfForm";
const fileTypes = ["csv"];

const UploadPortefeuille = ({ handlePtfToBacktest }) => {
  const [file, setFile] = useState(null);
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState("Actions");
  const [invalidsTitres, setInvalidsTitres] = useState([]);
  const [noHeaders, setNoHeaders] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (file) => {
    setFile(file);
  };
  const upload = () => {
    setInvalidsTitres([]);
    setIsLoading(true);
    dispatch(uploadCsv({ file, ptfName, ptfType, noHeaders }))
      .unwrap()
      .then((success) => {
        console.log("success", success);
        dispatch(setPortefeuilles(success.portefeuilles));
        setPtfName("");
        setFile(null);
        notyf.success(success.message);
        handlePtfToBacktest(success.portefeuilles, ptfName);
      })
      .catch((failed) => {
        console.log("filed", failed);
        setInvalidsTitres(failed.data);
        handlePtfToBacktest([], null);
        notyf.error(failed);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => console.log("no headers", noHeaders), [noHeaders]);
  const isDisabled = !file || !ptfName || !ptfType;
  return (
    <Box className="flex gap-4 flex-col max-w-[400px]">
      <Box>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label="Importer"
          onTypeError={() => console.log("foulan")}
        />
        <Typography className="mt-2 text-sm">
          {file
            ? `Nom du fichier: ${file.name}`
            : "Aucun fichier téléchargé pour l'instant"}
        </Typography>
      </Box>
      <PtfForm
        {...{
          ptfType,
          ptfName,
          noHeaders,
          setNoHeaders,
          setPtfName,
          setPtfType,
          upload,
          isDisabled,
        }}
      />
      <InvalidsTitres invalidsTitres={invalidsTitres} />
      {isLoading && <MainLoader />}
    </Box>
  );
};

export default UploadPortefeuille;
