import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadCsv } from "../../../redux/actions/UserActions";
import { FileUploader } from "react-drag-drop-files";
import { Box, Typography } from "@mui/material";
import { notyf } from "../../../utils/notyf";
import { setPortefeuilles } from "../../../redux/slices/UserSlice";
import MainLoader from "../../loaders/MainLoader";
import InvalidsTitres from "../../InvalidsTitres";
import PtfForm from "./PtfForm";
import { setPtfName as setPtfToSave } from "../../../redux/slices/PtfSlice";
const fileTypes = ["csv"];

const UploadPortefeuille = ({ handlePtfToBacktest, ptfsType }) => {
  const [file, setFile] = useState(null);
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState(ptfsType[0]);
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
    dispatch(setPtfToSave(ptfName));
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
          fileOrFiles={file}
          onTypeError={() => {
            notyf.options.duration = 3500;
            notyf.error(
              "Type de fichier non pris en charge. Veuillez choisir un fichier CSV."
            );
          }}
          // classes="bg-orange-400"
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
          ptfsType,
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
