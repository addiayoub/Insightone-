import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

const AccordionBox = ({
  accordionClass = "",
  summaryClass = "",
  detailsClass = "",
  title,
  isExpanded = false,
  children,
}) => {
  return (
    <Accordion
      defaultExpanded={isExpanded}
      className={`my-5 ${accordionClass}`}
    >
      <AccordionSummary
        className={summaryClass}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="title" className="capitalize">
          {title}
        </Typography>
      </AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails className={`p-5 ${detailsClass}`}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
export default AccordionBox;
