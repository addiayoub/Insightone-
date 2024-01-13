import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { savePortefeuille, uploadCsv } from "../../redux/actions/UserActions";
import axiosClient from "../../axios";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "@mui/material";
const fileTypes = ["csv", "xlsx"];
const UploadPortefeuille = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (file) => {
    setFile(file);
  };
  const handleUpload = () => {
    dispatch(uploadCsv(file));
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
      <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      <Button onClick={handleUpload}>Upload</Button>
    </>
  );
};

export default UploadPortefeuille;
