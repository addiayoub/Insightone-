import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { PlusCircle, Trash } from "react-feather";
import SingleSelect from "../SingleSelect";
import { v4 as uuidv4 } from "uuid";

const types = ["Relative", "Absolue"];
const secteurs = ["BANQUES", "BOISSONS"];
const operateurs = [">=", "<="];

const View = ({ view, setView }) => {
  const [type, setType] = useState(view.type);
  const [secteur1, setSecteur1] = useState(view.secteur1);
  const [secteur2, setSecteur2] = useState(view.secteur1);
  const [operateur, setOperateur] = useState(">=");
  const [value, setValue] = useState(view.value);
  console.log("The view is", view);
  useEffect(() => {
    setView((prev) => {
      return {
        ...prev,
        type,
        value,
        operateur,
        secteur1,
        secteur2,
      };
    });
  }, [type, value, secteur1, secteur2, operateur]);
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
        value={view.secteur1}
        setValue={setSecteur1}
        label="Secteurs"
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
      {type === "Relative" && (
        <SingleSelect
          options={secteurs}
          value={view.secteur2}
          setValue={setSecteur2}
          label="Secteurs"
        />
      )}
    </Box>
  );
};

const Views = () => {
  const [views, setViews] = useState([]);
  const [newView, setNewView] = useState({
    id: "",
    type: "Absolue",
    operateur: ">=",
    value: "",
    secteur1: null,
    secteur2: null,
  });
  console.log("Views are", views);
  const disabled = false;
  const addView = () => {
    const viewWithId = { ...newView, id: uuidv4() };
    setViews((prevViews) => [...prevViews, viewWithId]);
    setNewView({
      id: "",
      type: "Absolue",
      operateur: ">=",
      value: "",
      secteur1: null,
      secteur2: null,
    });
  };
  const deleteView = (viewId) => {
    setViews((prevViews) => prevViews.filter((view) => view.id !== viewId));
  };
  return (
    <Box className="my-2">
      <h3>Views</h3>
      <View setView={setNewView} view={newView} />
      <IconButton disabled={disabled} onClick={addView}>
        <PlusCircle
          color={`${disabled ? "var(--text-muted)" : "var(--primary-color)"}`}
        />
      </IconButton>
      {views.length > 0 && (
        <div className="border border-indigo-600 border-solid rounded-md p-2 max-w-[50%]">
          {views.map((view) => (
            <div
              key={view.id}
              className="flex flex-warp justify-between items-center bg-slate-200 text-black rounded-md p-2 my-2"
            >
              <p>{`Type : ${view.type}, Operateur : ${view.operateur}, Value : ${view.value}, Secteur : ${view.secteur1}`}</p>
              <IconButton onClick={() => deleteView(view.id)}>
                <Trash color="var(--error-color)" size={18} />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default Views;
