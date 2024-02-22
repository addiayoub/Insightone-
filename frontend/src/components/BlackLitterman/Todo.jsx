import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ViewsList = () => {
  const [views, setViews] = useState([]);
  const [newView, setNewView] = useState({
    id: "",
    type: "Absolute",
    operateur: ">=",
    value: "",
    secteur: "BMCI",
  });

  const addView = () => {
    const viewWithId = { ...newView, id: uuidv4() }; // Generate a unique ID
    setViews((prevViews) => [...prevViews, viewWithId]);
    setNewView({
      id: "",
      type: "Absolute",
      operateur: ">=",
      value: "",
      secteur: "BMCI",
    });
  };

  const deleteView = (viewId) => {
    setViews((prevViews) => prevViews.filter((view) => view.id !== viewId));
  };

  return (
    <div>
      <h2>Views List</h2>

      {views.map((view) => (
        <div key={view.id}>
          <p>{`View ${view.id}: Type - ${view.type}, Operateur - ${view.operateur}, Value - ${view.value}, Secteur - ${view.secteur}`}</p>
          <button onClick={() => deleteView(view.id)}>Delete View</button>
        </div>
      ))}

      <div>
        <label>
          Type:
          <select
            value={newView.type}
            onChange={(e) => setNewView({ ...newView, type: e.target.value })}
          >
            <option value="Absolute">Absolute</option>
            <option value="Relative">Relative</option>
          </select>
        </label>

        <label>
          Operateur:
          <select
            value={newView.operateur}
            onChange={(e) =>
              setNewView({ ...newView, operateur: e.target.value })
            }
          >
            <option value=">=">{">="}</option>
            <option value="<=">{"<="}</option>
          </select>
        </label>

        <label>
          Value:
          <input
            type="text"
            value={newView.value}
            onChange={(e) => setNewView({ ...newView, value: e.target.value })}
          />
        </label>

        <label>
          Secteur:
          <select
            value={newView.secteur}
            onChange={(e) =>
              setNewView({ ...newView, secteur: e.target.value })
            }
          >
            <option value="BMCI">BMCI</option>
            <option value="CIH">CIH</option>
          </select>
        </label>

        <button onClick={addView}>Add View</button>
      </div>
    </div>
  );
};

export default ViewsList;
