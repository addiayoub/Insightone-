import React, { useEffect, useMemo, useState } from "react";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import ModalComponent from "../Modal";
import EditPoidsSecteurForm from "./EditPoids/EditPoidsSecteurForm";
import EditPoidsTitreForm from "./EditPoids/EditPoidsTitreForm";
import Actions from "./EditPoids/Actions";
import { calculateSumPoids } from "../../utils/Markowitz/helpers";
import AddTitre from "../portefeuilles/AddTitre";
import { addTitres } from "../../utils/addTitres";
import { useDispatch, useSelector } from "react-redux";
import { setPtfToBacktest } from "../../redux/slices/BacktestSlice";
import PortefeuilleActions from "../PortefeuilleActions";
import PortefeuillePeriod from "../PortefeuillePeriod";
import DeleteModal from "../DeleteModal";
import PtfPoids from "../charts/Backtest/PtfPoids";
import GridContainer, { GridItem } from "../Ui/GridContainer";

const calculateSum = (data, secteur, field) => {
  // Filter the data based on the provided Classification
  const filteredData = data.filter((item) => item.SECTEUR_ACTIVITE === secteur);

  // Calculate the sum and count of the specified field values
  const result = filteredData.reduce(
    (accumulator, currentItem) => {
      return {
        sum: accumulator.sum + currentItem[field],
        count: accumulator.count + 1,
      };
    },
    { sum: 0, count: 0 }
  );

  return result;
};

const calculatePoidsSum = (data, field) => {
  const sum = data.reduce((acc, item) => acc + item[field], 0);
  return parseFloat(sum.toFixed(2));
};

const injectSums = (rows, secteurSums) => {
  return rows.map((row) => {
    const secteur = row.SECTEUR_ACTIVITE;
    const sum = secteurSums[secteur] || 0;
    return { ...row, somme: sum };
  });
};

const PortefeuilleTable = ({ rows, field, showActions, params }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [poids, setPoids] = useState(null);
  const [newRows, setNewRows] = useState(rows);
  const [newTitre, setNewTitre] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { ptfToBacktest } = useSelector((state) => state.backtest);
  const dispatch = useDispatch();
  console.log(
    "calculatePoidsSum",
    calculatePoidsSum(newRows, field),
    newRows,
    rows
  );
  const secteurSums = useMemo(() => {
    return newRows.reduce((acc, row) => {
      const secteur = row.SECTEUR_ACTIVITE;
      acc[secteur] = (acc[secteur] || 0) + (row[field] || 0);
      return acc;
    }, {});
  }, [newRows, field]);
  const reset = () => {
    setOpen(false);
    setPoids(null);
  };
  const update = () => {
    const { SECTEUR_ACTIVITE } = newRows.find((row) => row.titre === newTitre);
    const sameSecteur = newRows
      .filter(
        (row) =>
          row.SECTEUR_ACTIVITE === SECTEUR_ACTIVITE && row.titre !== newTitre
      )
      .map((item) => item.titre);
    const { sum } = calculateSum(newRows, SECTEUR_ACTIVITE, field);
    const part = (sum - +poids) / sameSecteur.length;
    setNewRows((prevData) =>
      prevData.map((item) => {
        if (item.titre === newTitre) {
          return { ...item, [field]: +poids, isLocked: true };
        }
        return { ...item };
      })
    );
    reset();
  };
  const handleLock = (titre, isLocked) => {
    setNewRows((prevData) =>
      prevData.map((item) => {
        if (item.titre === titre) {
          return { ...item, isLocked: !isLocked };
        }
        return { ...item };
      })
    );
  };
  const handleAdd = (data, titresToAdd) => {
    const rowsToAdd = addTitres(data, titresToAdd, field, "Actions");
    console.log("rowsToAdd", rowsToAdd);
    setNewRows((prev) => [...prev, ...rowsToAdd]);
    setOpenAdd(false);
  };
  useEffect(() => console.log("newRowshdzhd", newRows), [newRows]);
  const disableSave =
    calculateSumPoids(rows, field) !== calculateSumPoids(newRows, field);
  useEffect(() => {
    setNewRows(rows);
  }, [rows]);
  const handleDelete = (row) => {
    // setNewRows((prevRows) =>
    //   prevRows.filter((item) => item.titre !== row.titre)
    // );
    setRowToDelete(row);
    setOpenDelete(true);
  };
  const handleDeleteConfirmation = (deleteConfirmed) => {
    console.log("Row to dlete", rowToDelete);
    if (deleteConfirmed) {
      setNewRows((prevRows) =>
        prevRows.filter((item) => item.titre !== rowToDelete.titre)
      );
    }

    // Reset the state
    setOpenDelete(false);
    setRowToDelete(null);
  };
  const columns = useMemo(() => {
    const basedColumns = [
      {
        field: "SECTEUR_ACTIVITE",
        headerName: "SECTEUR ACTIVITÉ",
        flex: 1,
        renderCell: (params) => <strong>{params.row.SECTEUR_ACTIVITE}</strong>,
      },
      {
        field: "titre",
        headerName: "Titre",
        flex: 0.5,
        renderCell: (params) => <strong>{params.row.titre}</strong>,
      },
      {
        field: field,
        headerName: "Poids (%)",
        hide: true,
        flex: 0.3,
        renderCell: (params) => {
          const val = params.row?.[field]?.toFixed(2);
          return (
            <span className="font-semibold">
              {" "}
              {formatNumberWithSpaces(val)}
            </span>
          );
        },
      },
      {
        field: "",
        headerName: "Somme",
        flex: 0.2,
        valueGetter: (params) => {
          const secteur = params.row.SECTEUR_ACTIVITE;
          const sum = secteurSums[secteur] || 0;
          return sum.toFixed(2);
        },
        renderCell: (params) => {
          const secteur = params.row.SECTEUR_ACTIVITE;
          const sum = secteurSums[secteur] || 0;
          return (
            <span className="font-semibold">
              {formatNumberWithSpaces(sum.toFixed(2))}
            </span>
          );
        },
      },
    ];
    if (showActions) {
      basedColumns.push({
        field: "actions",
        flex: 0.5,
        headerName: "Actions",
        renderCell: (params) => (
          <Actions
            rows={rows}
            params={params}
            setOpen={setOpen}
            setOpenEdit={setOpenEdit}
            setNewTitre={setNewTitre}
            setPoids={setPoids}
            handleLock={handleLock}
            field={field}
            handleDelete={handleDelete}
          />
        ),
      });
    }
    return basedColumns;
  }, [newRows, field, showActions]);
  useEffect(() => {
    console.log("newRows useEff", newRows);
    const newPtf = {
      ...ptfToBacktest,
      data: newRows,
    };
    dispatch(setPtfToBacktest(newPtf));
  }, [newRows]);
  useEffect(() => {
    console.log("selectedRows marko", selectedRows);
  }, [selectedRows]);
  const tableRows = useMemo(
    () => injectSums(newRows, secteurSums),
    [newRows, secteurSums]
  );
  return (
    <>
      {showActions && (
        <PortefeuilleActions
          oldRows={rows}
          newRows={newRows}
          setNewRows={setNewRows}
          field={field}
          openAddModal={() => setOpenAdd(true)}
          ptfType="Actions"
          oldParams={params}
          isDisabled={disableSave}
          rowsToDelete={selectedRows}
        />
      )}
      <PortefeuillePeriod params={params} />
      <Table
        columns={columns}
        rows={tableRows}
        pageSize={25}
        withCheckboxes={showActions && true}
        setSelectedRows={setSelectedRows}
      />
      {showActions && newRows.length > 0 && (
        <GridContainer extraCss="my-4">
          <GridItem>
            <PtfPoids
              data={newRows}
              field={field}
              sumOf="SECTEUR_ACTIVITE"
              title="Poids des secteurs d'activités"
            />
          </GridItem>
          <GridItem>
            <PtfPoids data={newRows} field={field} title="Poids des titres" />
          </GridItem>
        </GridContainer>
      )}
      <ModalComponent open={open} handleClose={reset}>
        <EditPoidsTitreForm
          poids={poids}
          setPoids={setPoids}
          reset={reset}
          titre={newTitre}
          handleUpdate={update}
          rows={newRows}
          field={field}
        />
      </ModalComponent>
      <ModalComponent open={openEdit} handleClose={() => setOpenEdit(false)}>
        <EditPoidsSecteurForm
          setNewRows={setNewRows}
          titre={newTitre}
          poids={poids}
          reset={() => setOpenEdit(false)}
          rows={newRows}
          field={field}
        />
      </ModalComponent>
      <ModalComponent open={openAdd} handleClose={() => setOpenAdd(false)}>
        <AddTitre
          handleAdd={handleAdd}
          oldRows={newRows}
          reset={() => setOpenAdd(false)}
        />
      </ModalComponent>
      <ModalComponent
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
      >
        <DeleteModal handleDeleteConfirmation={handleDeleteConfirmation} />
      </ModalComponent>
    </>
  );
};

export default PortefeuilleTable;
