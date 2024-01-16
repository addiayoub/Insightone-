import React, { useRef, useEffect, useState } from "react";
import DataGridXL from "@datagridxl/datagridxl2";
import { transformToJSON } from "../../utils/handleConvertTable";
import { useDispatch } from "react-redux";
import { uploadCsv, uploadTable } from "../../redux/actions/UserActions";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SingleSelect from "../SingleSelect";
import { setPortefeuilles } from "../../redux/slices/UserSlice";
import { notyf } from "../../utils/notyf";
import MainLoader from "../loaders/MainLoader";

let download = function (e) {
  // e.grid.downloadDataAsCSV();
  const data = e.grid.getData();
  console.log("e data", data);
  console.log(transformToJSON(data, false));
};

const ConverTable = () => {
  const dgxlRef = useRef(null);
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState("Actions");
  const [emptyTable, setEmptyTable] = useState(true);
  const [titresInvalid, setTitresInvalid] = useState([]);
  const [noHeaders, setNoHeaders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);

  const dispatch = useDispatch();
  useEffect(() => {
    // Create only once
    if (!dgxlRef.current.grid) {
      dgxlRef.current.grid = new DataGridXL(dgxlRef.current, {
        data: DataGridXL.createEmptyData(rows, cols),
        contextMenuItems: [
          "copy",
          "cut",
          "paste",
          "delete_rows",
          "insert_rows_before",
          "insert_rows_after",
          "delete_cols",
          "insert_cols_before",
          "insert_cols_after",
        ],
      });
    }
  }, []);
  useEffect(() => {
    const grid = dgxlRef.current.grid;
    if (grid._isReady) {
      grid.insertEmptyRows(rows);
      console.log("dgxlRef.current", dgxlRef.current.grid);
    }
  }, [rows]);
  useEffect(() => {
    const grid = dgxlRef.current.grid;
    if (grid._isReady) {
      grid.insertEmptyCols(cols);
      console.log("dgxlRef.current", dgxlRef.current.grid);
    }
  }, [cols]);
  const uplolad = () => {
    setTitresInvalid([]);
    const table = dgxlRef.current;
    const tableData = table.grid.getData();
    console.log("no headers", noHeaders);
    const data = transformToJSON(tableData, !noHeaders);
    console.log("data to upload", data);
    if (data.length > 0) {
      dispatch(uploadTable({ data, ptfName, ptfType, noHeaders }))
        .unwrap()
        .then((success) => {
          console.log("success", success);
          dispatch(setPortefeuilles(success.portefeuilles));
          setPtfName("");
          setNoHeaders(false);
          notyf.success(success.message);
          // handleValider(ptfName);
        })
        .catch((failed) => {
          console.log("filed", failed);
          setTitresInvalid(failed.data);
          notyf.error(failed);
        })
        .finally(() => setLoading(false));
    } else {
      notyf.error("Check table data");
    }
  };
  const inva = titresInvalid.map((item) => {
    return (
      <span key={item} className="text-red-600">
        {item}
      </span>
    );
  });
  const isDisabled = !ptfName || !ptfType;
  return (
    <Box className="flex flex-col gap-3">
      <Box className="flex gap-2">
        <TextField
          size="small"
          label="Columns"
          value={rows}
          onChange={(e) => setRows(+e.target.value)}
        />
        <TextField
          size="small"
          label="Columns"
          value={cols}
          onChange={(e) => setCols(+e.target.value)}
        />
      </Box>
      <Box ref={dgxlRef} style={{ height: "400px" }} />
      <FormControlLabel
        control={
          <Checkbox
            value={noHeaders}
            onChange={(event) => setNoHeaders(event.target.checked)}
          />
        }
        label="No Headers"
      />
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
      <Box className="flex gap-2">
        <Button
          variant="contained"
          color="warning"
          onClick={() => download(dgxlRef.current)}
        >
          Get Data
        </Button>
        <Button variant="contained" onClick={uplolad} disabled={isDisabled}>
          Upload
        </Button>
      </Box>
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

export default ConverTable;
