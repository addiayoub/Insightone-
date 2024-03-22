import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { PlusCircle, Trash } from "react-feather";
import SingleSelect from "../../SingleSelect";
import { v4 as uuidv4 } from "uuid";
import { getViewPosition } from "../../../utils/getViewPosition";
import { useSelector } from "react-redux";
import Table from "../../Table";
import { getColumns } from "./columns";

const types = ["Classes", "Assets"];
const operateurs = [">=", "<="];

const ref = {
  OPCVM: {
    Classes: "Classification",
  },
  Actions: {
    Classes: "SECTEUR_ACTIVITE",
  },
};

const View = ({ view, setView }) => {
  const { ptfToBacktest } = useSelector((state) => state.backtest);
  const [type, setType] = useState(view.type);
  const [typeRel, setTypeRel] = useState(view.typeRel);
  const [position, setPosition] = useState(view.position);
  const [positionRel, setPositionRel] = useState(view.position);
  const [operateur, setOperateur] = useState(">=");
  const [value, setValue] = useState(view.value);
  const [secteurs, setSecteurs] = useState([]);
  const [secteursRel, setSecteursRel] = useState([]);
  console.log("The view is", view, secteurs, ptfToBacktest);
  useEffect(() => {
    let secteurs = [];
    if (type === "Classes") {
      secteurs = getViewPosition(
        ptfToBacktest?.data,
        ref[ptfToBacktest?.type]["Classes"]
      );
    } else if (type === types[1]) {
      secteurs = getViewPosition(ptfToBacktest?.data, "titre");
    }
    setSecteurs(secteurs);
  }, [type]);
  useEffect(() => {
    let secteurs = [];
    if (typeRel === "Classes") {
      secteurs = getViewPosition(
        ptfToBacktest?.data,
        ref[ptfToBacktest?.type]["Classes"]
      );
    } else if (typeRel === types[1]) {
      secteurs = getViewPosition(ptfToBacktest?.data, "titre");
    }
    setSecteursRel(secteurs);
  }, [typeRel]);
  useEffect(() => {
    setView((prev) => {
      return {
        ...prev,
        type,
        value,
        operateur,
        position,
        positionRel,
        typeRel,
      };
    });
  }, [type, value, position, positionRel, operateur, typeRel]);
  return (
    <Box className="flex gap-2 flex-wrap items-center my-2">
      <SingleSelect
        options={types}
        value={view.type}
        setValue={setType}
        label="Type"
      />
      <SingleSelect
        options={secteurs}
        value={view.position}
        setValue={setPosition}
        label="Position"
      />
      <SingleSelect
        options={operateurs}
        value={view.operateur}
        setValue={setOperateur}
        label="Opérateur"
      />
      <TextField
        value={view.value}
        onChange={(e) => setValue(e.target.value)}
        size="small"
        label="%"
        type="number"
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
      />
      <SingleSelect
        options={types}
        value={view.typeRel}
        setValue={setTypeRel}
        label="Type relative"
      />
      <SingleSelect
        options={secteursRel}
        value={view.positionRel}
        setValue={setPositionRel}
        label="Position relative"
      />
    </Box>
  );
};

const DEFAULT_VIEW = {
  id: "",
  type: "Classes",
  operateur: ">=",
  value: "",
  typeRel: null,
  position: null,
  positionRel: null,
};

const Views = ({ views, setViews }) => {
  // const [views, setViews] = useState([]);
  const [key, setKey] = useState(0);
  const [newView, setNewView] = useState({
    id: "",
    type: "Classes",
    operateur: ">=",
    value: "",
    typeRel: null,
    position: null,
    positionRel: null,
  });
  console.log("Views are", views);
  const disabled =
    !newView.type ||
    !newView.typeRel ||
    !newView.operateur ||
    newView.value === "" ||
    !newView.position ||
    !newView.positionRel;
  const addView = () => {
    const { type, operateur, value, typeRel, position, positionRel } = newView;
    const v = {
      Type: type,
      Position: position,
      Sign: operateur,
      Weight: parseFloat(value / 100),
      "Type Relative": typeRel,
      Relative: positionRel,
    };
    const viewWithId = { ...v, id: uuidv4() };
    setViews((prevViews) => [...prevViews, viewWithId]);
    setNewView(DEFAULT_VIEW);
  };
  useEffect(() => {
    console.log("nw view", newView);
  }, [newView]);
  const deleteView = (viewId) => {
    setViews((prevViews) => prevViews.filter((view) => view.id !== viewId));
  };
  const columns = getColumns(deleteView);
  return (
    <Box className="my-2 flex gap-2 flex-wrap ">
      <Box>
        <span className="tablet:text-md phone:text-sm laptop:text-lg font-semibold block mt-2.5 mb-3.5">
          Views
        </span>
        <View setView={setNewView} view={newView} key={key} />
        <IconButton disabled={disabled} onClick={addView}>
          <PlusCircle
            color={`${disabled ? "var(--text-muted)" : "var(--primary-color)"}`}
          />
        </IconButton>
      </Box>
      {views.length > 0 && (
        <Box className="border border-indigo-600 border-solid rounded-md p-2 max-h-[400px] overflow-auto max-w-full]">
          <Table columns={columns} rows={views} />
          {/* {views.map((view) => (
            <div
              key={view.id}
              className="flex flex-warp justify-between items-center bg-slate-200 text-black rounded-md p-2 my-2"
            >
              <p>
                {`Type : ${view.Type},Position: ${view.Position}, Sign : ${view.Sign}, Weight : ${view.Weight}, Type Relative : ${view["Type Relative"]}, Position Relative: ${view.Relative}`}$
              </p>

              <IconButton onClick={() => deleteView(view.id)}>
                <Trash color="var(--error-color)" size={18} />
              </IconButton>
            </div>
          ))} */}
        </Box>
      )}
    </Box>
  );
};

export default Views;
