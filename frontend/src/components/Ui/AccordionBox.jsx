import React, { memo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import { Settings } from "react-feather";

const AccordionBox = ({
  accordionClass = "",
  summaryClass = "",
  detailsClass = "",
  title,
  isExpanded = false,
  Icon = Settings,
  children,
}) => {
  return (
    <Accordion
      defaultExpanded={isExpanded}
      className={`my-5 ${accordionClass}`}
    >
      <AccordionSummary
        className={`flex flex-wrap items-center ${summaryClass}`}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Icon className="mr-3" color="var(--primary-color)" />
        <Typography variant="title" className="capitalize leading-[24px]">
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
export default memo(AccordionBox);
