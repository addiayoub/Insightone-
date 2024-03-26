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
  rowsToDelete,
}) => {
  return (
    <>
      <EditPortefeuille
        {...{ oldRows, newRows, setNewRows, field, openAddModal, rowsToDelete }}
      >
        <SavePortefeuille
          data={newRows}
          dataToSave={newRows}
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
