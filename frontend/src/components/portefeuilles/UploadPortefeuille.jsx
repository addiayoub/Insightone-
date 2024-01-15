import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { savePortefeuille, uploadCsv } from "../../redux/actions/UserActions";
import axiosClient from "../../axios";
import { FileUploader } from "react-drag-drop-files";
import { Button, TextField } from "@mui/material";
import SingleSelect from "../SingleSelect";
const fileTypes = ["csv"];
const UploadPortefeuille = () => {
  const [file, setFile] = useState(null);
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState("Actions");
  const dispatch = useDispatch();
  const handleChange = (file) => {
    setFile(file);
  };
  const handleUpload = () => {
    dispatch(uploadCsv({ file, ptfName, ptfType })).unwrap().then().catch();
  };
  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        label="Upload A file"
        onTypeError={() => console.log("foulan")}
      />
      <TextField
        size="small"
        label="Nom de portefeuille"
        value={ptfName}
        onChange={(e) => setPtfName(e.target.value)}
      />
      <SingleSelect
        label="Type"
        options={["OPCVM", "Actions"]}
        value={ptfType}
        setValue={setPtfType}
      />
      <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      <Button onClick={handleUpload} variant="contained" disabled={!file}>
        Upload
      </Button>
    </>
  );
};

export default UploadPortefeuille;
