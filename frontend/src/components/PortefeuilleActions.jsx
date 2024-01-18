import React from "react";
import EditPortefeuille from "./EditPortefeuille";
import SavePortefeuille from "./SavePortefeuille";

const PortefeuilleActions = ({
  oldRows,
  newRows,
  setNewRows,
  field,
  openAddModal,
  params,
  isDisabled,
  ptfType,
}) => {
  return (
    <>
      <EditPortefeuille
        {...{ oldRows, newRows, setNewRows, field, openAddModal }}
      >
        <SavePortefeuille
          data={newRows}
          field={field}
          type={ptfType}
          oldParams={params}
          isDisabled={isDisabled}
        />
      </EditPortefeuille>
    </>
  );
};

export default PortefeuilleActions;
