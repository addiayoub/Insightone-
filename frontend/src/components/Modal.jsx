import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import Modal from "@mui/material/Modal";
import { X } from "react-feather";

const basedStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent({
  open,
  handleClose,
  style = {},
  modalStyle = {},
  modalClassname,
  containerClassName,
  children,
  withHeader,
  headerText,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={modalStyle}
        className={`${modalClassname}`}
      >
        <Box
          sx={{ ...basedStyle, ...style }}
          className={`${containerClassName}`}
        >
          {withHeader && (
            <Box className="mb-3">
              <Box className="flex justify-between items-center mb-1">
                <Typography variant="h6" component="h4">
                  {headerText}
                </Typography>
                <IconButton onClick={handleClose}>
                  <X size={18} color="var(--error-color)" />
                </IconButton>
              </Box>
              <Divider />
            </Box>
          )}
          {children}
        </Box>
      </Modal>
    </div>
  );
}
