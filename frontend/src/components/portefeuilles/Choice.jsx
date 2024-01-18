import React, { memo, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const Choice = ({ tabs }) => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      {tabs.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="mui-tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>

          {tabs.map((tab, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              <tab.component {...tab.props} />
            </TabPanel>
          ))}
        </Box>
      )}
    </>
  );
};

export const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box sx={{ p: 2, mt: 2 }}>{children}</Box>}
  </div>
);

export default memo(Choice);
