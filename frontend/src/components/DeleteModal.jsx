import React from "react";
import { Box, Button } from "@mui/material";
import { AlertTriangle } from "react-feather";

const DeleteModal = ({
  headerText = "confirmation de suppression",
  bodyText = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible",
  handleDeleteConfirmation,
}) => {
  return (
    <div className="rounded-md md:max-w-md md:mx-auto fixed inset-x-0 bottom-0 z-50 md:relative">
      <div className="md:flex items-center">
        <div
          className="rounded-full flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto"
          style={{ border: "1px solid #ccc" }}
        >
          <AlertTriangle
            className="bx bx-error text-3xl"
            color="var(--error-color)"
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p className="font-bold capitalize">{headerText}</p>
          <p className="text-sm mt-2">{bodyText}</p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <Button
          className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          onClick={() => handleDeleteConfirmation(true)}
        >
          Supprimer
        </Button>
        <Button
          className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
          onClick={() => handleDeleteConfirmation(false)}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
