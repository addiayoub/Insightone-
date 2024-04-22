import React, { useEffect, useMemo, useState } from "react";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import ModalComponent from "../Modal/index";
import EditPoidsTitreForm from "./EditPoids/EditPoidsTitreForm";
import Actions from "./EditPoids/Actions";
import { calculateSumClassification } from "../../utils/OPCVM/helpers.js";
import EditPoidsClassification from "./EditPoids/EditPoidsClassification.jsx";
import { calculateSumPoids } from "../../utils/Markowitz/helpers.js";
import EditPortefeuille from "../EditPortefeuille.jsx";
import SavePortefeuille from "../SavePortefeuille.jsx";
import { addTitres } from "../../utils/addTitres.js";
import AddTitre from "../portefeuilles/AddTitre.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setPtfToBacktest } from "../../redux/slices/BacktestSlice.js";
import PortefeuilleActions from "../PortefeuilleActions.jsx";
import PortefeuillePeriod from "../PortefeuillePeriod.jsx";
import DeleteModal from "../Modal/DeleteModal.jsx";
import PtfPoids from "../charts/Backtest/PtfPoids.jsx";
import GridContainer, { GridItem } from "../Ui/GridContainer.jsx";

const calculateSum = (data, classification, field) => {
  // Filter the data based on the provided Classification
  const filteredData = data.filter(
    (item) => item.Classification === classification
  );

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

const updatePoids = (setState, titreToUpdate, newData, field) => {
  setState((prevData) => {
    return prevData.map((item) => {
      const { sum, count } = calculateSum(prevData, item.Classification, field);
      if (item.titre === titreToUpdate) {
        console.log("new data", newData);
        return { ...item, ...newData };
      }
      console.log(item);
      return { ...item, [field]: (sum - newData[field]) / count };
    });
  });
};

// const EditPoisForm = ({ poids, setPoids, reset, titre, handleUpdate }) => {
//   return (
//     <>
//       <Box>
//         <Typography variant="h6" mb={3}>
//           {`
//             Modifier poids ( ${titre} )
//           `}
//         </Typography>
//       </Box>
//       <Divider />
//       <Box
//         sx={{
//           height: "250px",
//           width: "400px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           mt: 3,
//         }}
//       >
//         <TextField
//           id="poids"
//           label="Poids (%)"
//           type="number"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           variant="outlined"
//           autoFocus
//           value={poids}
//           onChange={(e) => setPoids(e.target.value)}
//         />
//         <Box
//           sx={{
//             alignSelf: "end",
//           }}
//         >
//           <Button
//             variant="contained"
//             color="error"
//             sx={{
//               margin: "0 10px",
//             }}
//             onClick={reset}
//           >
//             Annuler
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => {
//               // handleUpdate();
//               reset();
//             }}
//             disabled={!poids}
//           >
//             Enregistrer
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

const PortefeuilleTable = ({ rows, field, showActions, params }) => {
  console.log("rows from PortefeuilleTable", rows, field);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [poids, setPoids] = useState(null);
  const [newRows, setNewRows] = useState(rows);
  console.log("New rows from PortefeuilleTable", newRows, field);
  const [newTitre, setNewTitre] = useState("");
  const { ptfToBacktest } = useSelector((state) => state.backtest);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const reset = () => {
    setOpen(false);
    setPoids(null);
  };
  const update = () => {
    const { Classification } = newRows.find((row) => row.titre === newTitre);
    const sameSecteur = newRows
      .filter(
        (row) => row.Classification === Classification && row.titre !== newTitre
      )
      .map((item) => item.titre);
    const { sum } = calculateSumClassification(newRows, Classification, field);
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
        field: "Societe_Gestion",
        headerName: "Société de Gestion",
        flex: 0.6,
        renderCell: (params) => <strong>{params.row.Societe_Gestion}</strong>,
      },
      {
        field: "Classification",
        headerName: "Classification",
        flex: 0.4,
        renderCell: (params) => <strong>{params.row.Classification}</strong>,
      },
      {
        field: "titre",
        headerName: "Titre",
        flex: 0.7,
        renderCell: (params) => <strong>{params.row.titre}</strong>,
      },
      {
        field: field,
        headerName: "Poids (%)",
        flex: 0.3,
        renderCell: (params) => {
          const val = params.row?.[field]?.toFixed(2);
          console.log("Poids val field", params.row);
          return <span className="font-semibold">{val}</span>;
        },
      },
    ];
    if (showActions) {
      basedColumns.push({
        field: "actions",
        headerName: "Actions",
        flex: 0.4,
        renderCell: (params) => (
          <Actions
            params={params}
            rows={rows}
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
  }, [rows, field, showActions]);
  const handleAdd = (data, titresToAdd) => {
    const rowsToAdd = addTitres(data, titresToAdd, field, "OPCVM");
    console.log("rowsToAdd", rowsToAdd);
    setNewRows((prev) => [...prev, ...rowsToAdd]);
    setOpenAdd(false);
  };
  const disableSave =
    calculateSumPoids(rows, field) !== calculateSumPoids(newRows, field);
  console.log("Columns", columns);
  console.log("params", params);
  useEffect(() => {
    console.log("newRows useEff", newRows);
    const newPtf = {
      ...ptfToBacktest,
      data: newRows,
    };
    dispatch(setPtfToBacktest(newPtf));
  }, [newRows]);

  useEffect(() => {
    console.log("selectedRows ara", selectedRows);
  }, [selectedRows]);
  useEffect(() => {
    setNewRows(rows);
    console.log("Rows changed");
  }, [rows]);
  return (
    <>
      {showActions && (
        <PortefeuilleActions
          oldRows={rows}
          newRows={newRows}
          setNewRows={setNewRows}
          field={field}
          openAddModal={() => setOpenAdd(true)}
          ptfType="OPCVM"
          oldParams={params}
          isDisabled={disableSave}
          rowsToDelete={selectedRows}
        />
      )}

      <PortefeuillePeriod params={params} />
      <Table
        columns={columns}
        rows={newRows}
        pageSize={25}
        withCheckboxes={showActions && true}
        setSelectedRows={setSelectedRows}
      />
      {showActions && newRows.length > 0 && (
        <GridContainer extraCss="my-4">
          <GridItem cols={4}>
            <PtfPoids
              data={newRows}
              field={field}
              sumOf="Societe_Gestion"
              title="Poids des sociétés des gestions"
            />
          </GridItem>
          <GridItem cols={4}>
            <PtfPoids
              data={newRows}
              field={field}
              sumOf="Classification"
              title="Classification"
            />
          </GridItem>
          <GridItem cols={4}>
            <PtfPoids data={newRows} field={field} title="Poids des titres" />
          </GridItem>
        </GridContainer>
      )}
      {open && (
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
      )}
      {openEdit && (
        <ModalComponent open={openEdit} handleClose={() => setOpenEdit(false)}>
          <EditPoidsClassification
            titre={newTitre}
            poids={poids}
            reset={() => setOpenEdit(false)}
            rows={newRows}
            field={field}
            setNewRows={setNewRows}
          />
        </ModalComponent>
      )}
      {openAdd && (
        <ModalComponent open={openAdd} handleClose={() => setOpenAdd(false)}>
          <AddTitre
            handleAdd={handleAdd}
            oldRows={newRows}
            reset={() => setOpenAdd(false)}
          />
        </ModalComponent>
      )}

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
