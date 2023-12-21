import { Box } from "@mui/material";

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`mui-tabpanel-${index}`}
    aria-labelledby={`mui-tab-${index}`}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);
export default TabPanel;
