import React, { memo, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Portefeuille from "./Portefeuille";
import PortefeuilleMarko from "../Markowitz/Portefeuille";

const TabTest = ({ components, isOPCVM }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredComponents = components.filter(
    (item) => !item.loading && item.data?.length > 0
  );

  return (
    <div>
      {filteredComponents.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="mui-tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {filteredComponents.map((component, index) => (
              <Tab key={index} label={component.title} />
            ))}
          </Tabs>

          {filteredComponents.map((component, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              {isOPCVM ? (
                <Portefeuille
                  data={component.data ?? []}
                  title={component.title}
                  field={component.field}
                />
              ) : (
                <PortefeuilleMarko
                  data={component.data ?? []}
                  title={component.title}
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
    id={`mui-tabpanel-${index}`}
    aria-labelledby={`mui-tab-${index}`}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

export default memo(TabTest);
