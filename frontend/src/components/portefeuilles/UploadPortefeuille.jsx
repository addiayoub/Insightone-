import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadCsv } from "../../redux/actions/UserActions";
import { FileUploader } from "react-drag-drop-files";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SingleSelect from "../SingleSelect";
import { notyf } from "../../utils/notyf";
import { setPortefeuilles } from "../../redux/slices/UserSlice";
import MainLoader from "../loaders/MainLoader";
const fileTypes = ["csv"];

const UploadPortefeuille = ({ setType, setPtf, handleValider }) => {
  const [file, setFile] = useState(null);
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState("Actions");
  const [titresInvalid, setTitresInvalid] = useState([]);
  const [noHeaders, setNoHeaders] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (file) => {
    setFile(file);
  };
  const handleUpload = () => {
    setTitresInvalid([]);
    setLoading(true);
    dispatch(uploadCsv({ file, ptfName, ptfType, noHeaders }))
      .unwrap()
      .then((success) => {
        console.log("success", success);
        dispatch(setPortefeuilles(success.portefeuilles));
        setPtfName("");
        setFile(null);
        notyf.success(success.message);
        setPtf(ptfName);
        setType(ptfType);
        // handleValider(ptfName);
      })
      .catch((failed) => {
        console.log("filed", failed);
        setTitresInvalid(failed.data);
        notyf.error(failed);
      })
      .finally(() => setLoading(false));
  };
  const inva = titresInvalid.map((item) => {
    return (
      <span key={item} className="text-red-600">
        {item}
      </span>
    );
  });
  useEffect(() => console.log("no headers", noHeaders), [noHeaders]);
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
        <FormControlLabel
          control={
            <Checkbox
              value={noHeaders}
              onChange={(event) => setNoHeaders(event.target.checked)}
            />
          }
          label="No Headers"
        />
      </Box>
      <Box className="flex gap-2 items-center">
        <TextField
          size="small"
          label="Nom de portefeuille"
          value={ptfName}
          onChange={(e) => setPtfName(e.target.value)}
        />
        <SingleSelect
          label="Type"
          options={["Actions", "OPCVM"]}
          value={ptfType}
          setValue={setPtfType}
        />
      </Box>
      <Button
        onClick={handleUpload}
        variant="contained"
        disabled={!file || !ptfName || !ptfType}
      >
        Upload
      </Button>
      {titresInvalid.length > 0 && (
        <>
          <h3>Le fichier contient des titres invalides:</h3>
          {inva}
        </>
      )}
      {loading && <MainLoader />}
    </Box>
  );
};

export default UploadPortefeuille;
