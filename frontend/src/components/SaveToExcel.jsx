import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IconButton } from "@mui/material";
import { Save } from "react-feather";

const SaveToExcel = ({ data, fileName }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `${fileName}.xlsx`);
  };
  return (
    <IconButton
      variant="contained"
      onClick={exportToExcel}
      className="bg-primary absolute right-0 top-20 z-[9] hover:bg-secondary"
      title="Export CSV"
    >
      <Save size={20} color="white" />
    </IconButton>
  );
};

export default SaveToExcel;
