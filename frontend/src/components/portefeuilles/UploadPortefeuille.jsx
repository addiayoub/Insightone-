import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadCsv } from "../../redux/actions/UserActions";
import { FileUploader } from "react-drag-drop-files";
import { Box, Button, TextField } from "@mui/material";
import SingleSelect from "../SingleSelect";
import { notyf } from "../../utils/notyf";
import { setPortefeuilles } from "../../redux/slices/UserSlice";
const fileTypes = ["csv"];
const UploadPortefeuille = () => {
  const [file, setFile] = useState(null);
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState("Actions");
  const [titresInvalid, setTitresInvalid] = useState([]);
  const dispatch = useDispatch();
  const handleChange = (file) => {
    setFile(file);
  };
  const handleUpload = () => {
    dispatch(uploadCsv({ file, ptfName, ptfType }))
      .unwrap()
      .then((success) => {
        console.log("success", success);
        dispatch(setPortefeuilles(success.portefeuilles));
        setPtfName("");
        setFile(null);
        notyf.success(success.message);
      })
      .catch((failed) => {
        console.log("filed", failed);
        setTitresInvalid(failed.data);
        notyf.error(failed);
      });
  };
  const inva = titresInvalid.map((item) => {
    return (
      <p key={item} className="text-red-600">
        {item}
      </p>
    );
  });
  return (
    <Box className="flex gap-2 flex-col max-w-[200px]">
      <Box>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label="Upload A file"
          onTypeError={() => console.log("foulan")}
        />
        <p className="mt-2">
          {file ? `File name: ${file.name}` : "no files uploaded yet"}
        </p>
      </Box>
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
      <Button onClick={handleUpload} variant="contained" disabled={!file}>
        Upload
      </Button>
      {titresInvalid.length > 0 && (
        <>
          <h3>Invalid titres</h3>
          {inva}
        </>
      )}
    </Box>
  );
};

export default UploadPortefeuille;
