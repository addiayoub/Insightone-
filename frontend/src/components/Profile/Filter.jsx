import React, { useState } from "react";
import AccordionBox from "../Ui/AccordionBox";
import TitresComponent from "../TitresComponent";
import SingleSelect from "../SingleSelect";
import { SearchButton } from "../Ui/Buttons";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/ProfileFinActions";
const options = ["Annuel", "Trimestriels"];

const Filter = ({ setIsShow }) => {
  const [titre, setTitre] = useState("DISWAY");
  const [periode, setPeriode] = useState("Annuel");
  const dispatch = useDispatch();
  const handleSearch = () => {
    console.log("searche");
    setIsShow(false);
    dispatch(getData({ titre, periode }))
      .unwrap()
      .then(() => setIsShow(true))
      .catch(() => setIsShow(false));
  };
  return (
    <AccordionBox
      isExpanded
      title="Filtre"
      detailsClass="flex flex-col gap-3 flex-wrap"
    >
      <TitresComponent
        choice="Actions"
        selectedTitres={titre}
        setSelectedTitres={setTitre}
      />
      <SingleSelect options={options} value={periode} setValue={setPeriode} />
      <SearchButton className="max-w-fit" onClick={handleSearch} />
    </AccordionBox>
  );
};

export default Filter;
