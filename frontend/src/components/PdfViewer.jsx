import React from "react";
import "../utils/pdfWorker.js";
import { hostName } from "../api/config.js";
import { Box } from "@mui/material";
// Import Worker
import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// Import the localization file
import fr_FR from "@react-pdf-viewer/locales/lib/fr_FR.json";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ pdfFile = `${hostName}/files/3021.pdf` }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      {pdfFile && (
        <Box className="h-[400px]">
          <Worker>
            <Viewer
              className="pdf-viewer"
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
              localization={fr_FR}
            ></Viewer>
          </Worker>
        </Box>
      )}
    </>
  );
};

export default PdfViewer;