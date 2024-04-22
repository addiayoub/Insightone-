import { IconButton } from "@mui/material";
import React from "react";
import { ChevronsUp } from "react-feather";

function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };
  return (
    <IconButton className="scroll-top-btn" onClick={scrollToTop}>
      <ChevronsUp />
    </IconButton>
  );
}

export default ScrollToTop;
