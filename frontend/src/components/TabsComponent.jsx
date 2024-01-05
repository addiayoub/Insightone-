import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PortefeuilleTable from "./OPCVM/PortefeuilleTable";
import PortefeuilleTableMarko from "./Markowitz/PortefeuilleTable";

const injectIsLocked = (data) => {
  return data.map((item) => ({
    ...item,
    isLocked: false,
  }));
};

const TabsComponent = ({ tabs }) => {
  const [tabValue, setTabValue] = useState(0);
  console.log("tabs", tabs);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      {tabs.length > 0 && (
        <Box sx={{ width: "100%", mt: 5 }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="mui-tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((component, index) => (
              <Tab key={index} label={component.name} />
            ))}
          </Tabs>

          {tabs.map((component, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              {component.type === "OPCVM" ? (
                <PortefeuilleTable
                  showActions
                  rows={injectIsLocked(component.data) ?? []}
                  field={component.field}
                />
              ) : (
                <PortefeuilleTableMarko
                  showActions
                  rows={injectIsLocked(component.data) ?? []}
                  field={component.field}
                />
              )}
            </TabPanel>
          ))}
        </Box>
      )}
    </div>
  );
};

export const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export default TabsComponent;
