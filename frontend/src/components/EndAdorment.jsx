import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

const EndAdorment = ({ visible, setVisible }) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={() => setVisible(!visible)}>
        {visible ? (
          <VisibilityOffIcon></VisibilityOffIcon>
        ) : (
          <VisibilityIcon></VisibilityIcon>
        )}
      </IconButton>
    </InputAdornment>
  );
};

export default EndAdorment;
