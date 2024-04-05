import React, { memo, useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import { Box, TextField } from "@mui/material";
import dayjs from "dayjs";
import Contrainte from "../Contrainte";
import { useDispatch } from "react-redux";
import { valueAtRiskAction } from "../../redux/actions/RiskManageActions";
import { SearchButton } from "../Ui/Buttons";
import { notyf } from "../../utils/notyf";
import Upload from "../Backtest/UploadPtf/Upload";

const Filter = ({ setIsShow }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(2, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [days, setDays] = useState(100);
  const [mcSims, setMcSims] = useState(20);
  const [showParams, setShowParams] = useState(false);
  const dispatch = useDispatch();
  const handleSearch = () => {
    console.log("Days are", days);
    setIsShow(false);
    dispatch(
      valueAtRiskAction({
        dateDebut,
        dateFin,
        days,
        mcSims,
      })
    )
      .unwrap()
      .then(() => setIsShow(true))
      .catch(() => {
        notyf.error("Server Error");
        setIsShow(false);
      });
  };
  const disabled = !days || mcSims === "";
  return (
    <>
      <Upload show={showParams} setShow={setShowParams} />
      {showParams && (
        <AccordionBox title="Value at risk" isExpanded>
          <Box className="flex flex-col flex-wrap gap-4">
            <Box className="flex flex-wrap gap-2 items-center">
              <DateComponent
                date={dateDebut}
                setDate={setDateDebut}
                label="Date début"
              />
              <DateComponent
                date={dateFin}
                setDate={setDateFin}
                label="Date fin"
              />
            </Box>
            <Box>
              <Contrainte label={"Days"} width={150}>
                <TextField
                  id="days"
                  size="small"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  onBlur={(e) => setDays(parseInt(e.target.value))}
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                />
              </Contrainte>
              {/* <Contrainte label={"Initial Investment (MMAD)"} width={150}>
                <TextField
                  id="days"
                  size="small"
                  value={initInvest}
                  onChange={(e) => setInitInvest(e.target.value)}
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                />
              </Contrainte> */}
              <Contrainte label={"Nombre de simulations"} width={150}>
                <TextField
                  id="days"
                  size="small"
                  value={mcSims}
                  onChange={(e) => setMcSims(e.target.value)}
                  onBlur={(e) => setMcSims(parseInt(e.target.value))}
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                />
              </Contrainte>
            </Box>
            <SearchButton
              onClick={handleSearch}
              className="w-fit"
              disabled={disabled}
            />
          </Box>
        </AccordionBox>
      )}
    </>
  );
};

export default memo(Filter);
