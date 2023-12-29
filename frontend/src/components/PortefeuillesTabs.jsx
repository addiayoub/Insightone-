import React from "react";

function Portefeuilles({ filteredComponents }) {
  return filteredComponents.map((component, index) => (
    <TabPanel key={index} value={tabValue} index={index}>
      <Portefeuille
        data={component.data ?? []}
        title={component.title}
        field={component.field}
      />
    </TabPanel>
  ));
}

export default Portefeuilles;
