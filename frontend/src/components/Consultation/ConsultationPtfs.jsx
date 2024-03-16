import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortefeuilles } from "../../redux/actions/UserActions";
import MainLoader from "../loaders/MainLoader";
import { Box } from "@mui/material";
import SingleSelect from "../SingleSelect";
import { ValidateButton } from "../Ui/Buttons";
import AccordionBox from "../AccordionBox";
import { Save } from "react-feather";

const types = ["Actions", "OPCVM"];
const ConsultationPtfs = (props) => {
  const { handleValider, setChoosen } = props;
  const {
    portefeuilles: { loading, data },
  } = useSelector((state) => state.user);
  const [type, setType] = useState("Actions");
  const [ptf, setPtf] = useState(null);
  const portefeuilles = data
    .filter((ptf) => ptf.type === type)
    .map((ptf) => ptf.name);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortefeuilles({ type: "" }));
  }, []);

  useEffect(() => {
    setPtf(null);
  }, [type]);
  const handleClick = () => {
    const choosen = data.find((item) => item.name === ptf);
    console.log("choosen", choosen);
    setChoosen(choosen);
    handleValider();
  };
  return (
    <>
      <AccordionBox
        title="la liste des portefeuilles enregistrés"
        Icon={Save}
        isExpanded
      >
        <Box className="flex flex-wrap gap-3 items-center">
          <SingleSelect
            label={"Type"}
            options={types}
            value={type}
            setValue={setType}
          />
          <SingleSelect
            label={"Portefeuilles"}
            options={portefeuilles}
            value={ptf}
            setValue={setPtf}
          />
          <ValidateButton
            size="small"
            className="min-w-[115px]"
            onClick={handleClick}
            disabled={!ptf}
          />
        </Box>
      </AccordionBox>
      {loading && <MainLoader />}
    </>
  );
};

export default ConsultationPtfs;
