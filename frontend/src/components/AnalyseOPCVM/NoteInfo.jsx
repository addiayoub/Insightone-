import React from "react";
import AccordionBox from "../Ui/AccordionBox";

const NoteInfo = ({ opcvm }) => {
  return (
    <div>
      <AccordionBox title="Note d'information" isExpanded>
        <h3>{opcvm}</h3>
      </AccordionBox>
    </div>
  );
};

export default NoteInfo;
