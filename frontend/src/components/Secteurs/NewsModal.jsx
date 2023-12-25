import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Container } from "@mui/material";
import Modal from "@mui/material/Modal";
import { X } from "react-feather";
import "./News.css";
import { useSelector } from "react-redux";

const modalContainer = {
  maxWidth: "calc(100% - 170px)",
  width: "100%",
  height: "200px",
  left: "50%",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  padding: "30px",
  borderRadius: "15px",
  maxHeight: 250,
  overflowY: "auto",
};

function NewsModal({ clickedRowId, row, handleClose }) {
  const { darkTheme } = useSelector((state) => state.theme);
  return (
    <Modal
      open={clickedRowId !== null && row?.article !== ""}
      onClose={handleClose}
    >
      <Container minWidth="sm">
        <Box
          sx={{
            ...modalContainer,
            backgroundColor: darkTheme ? "var(--bg-color)" : "#fff",
          }}
        >
          <Box
            className="flex items-center justify-center"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{row?.titre}</Typography>
            <IconButton onClick={handleClose}>
              <X color="var(--text-warning)" />
            </IconButton>
          </Box>
          <Box className="mt-96">
            <Typography>{row?.article}</Typography>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}

export default memo(NewsModal);
