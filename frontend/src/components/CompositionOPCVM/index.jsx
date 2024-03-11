import React, { memo, useEffect, useState } from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import Table from "../Table";
import { columns, libelleColumns } from "./columns";
import PtfPoids from "../charts/Backtest/PtfPoids";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import { Box } from "@mui/material";
import ValorisationChart from "../charts/CompOPCVm/ValorisationChart";
import AccordionBox from "../AccordionBox";
import PortefeuilleBacktest from "../portefeuilles/PortefeuilleBacktest";
import CustomButton from "../Ui/Buttons";
import {
  setPtfToBacktest,
  setSelectedPtf,
} from "../../redux/slices/BacktestSlice";
import { Zap, Table as TableIcon } from "react-feather";
import MainLoader from "../loaders/MainLoader";
import Simule from "./Simule";

// sum the "Poids" for each unique "titre"
const transToPtf = (data) => {
  const isNull = data
    .map((item) => ({ ...item, titre: item.SIMULE, Poids: item.Poids }))
    .find((item) => item.titre === null);
  console.log(
    "data",
    data
      .map((item) => ({ ...item, titre: item.SIMULE, Poids: item.Poids }))
      .filter((item) => item.titre === null)
  );
  // if (isNull) {
  //  alert("is null");
  // }
  const result = data
    .filter((item) => item.SIMULE !== null)
    .reduce((accumulator, item) => {
      const existingItem = accumulator.find(
        (accItem) => accItem.titre.toLowerCase() === item.SIMULE?.toLowerCase()
      );

      if (existingItem) {
        existingItem.Poids += item.Poids;
      } else {
        accumulator.push({
          titre: item.SIMULE,
          Poids: item.Poids,
        });
      }

      return accumulator;
    }, []);
  return result;
};

const index = () => {
  const { data, loading } = useSelector((state) => state.compOpcvm);
  const [isShow, setIsShow] = useState(false);
  const [sim, setSim] = useState({
    state: false,
    payload: null,
  });
  console.log("data", data);
  const show = !loading && isShow;
  const reset = () => {
    setSim({ state: false, payload: null });
  };
  useEffect(() => {
    reset();
  }, [data]);
  const dispatch = useDispatch();
  const handleSimule = () => {
    reset();
    const ptf = {
      name: "Simulé",
      field: "Poids",
    };
    const newData = transToPtf(data);
    ptf.data = newData;
    dispatch(setPtfToBacktest(ptf));
    dispatch(setSelectedPtf(ptf.name));
    setSim({ state: true, payload: newData });
    console.log("ptf is", ptf);
  };
  return (
    <>
      <Filter setIsShow={setIsShow} />
      {loading && <MainLoader />}
      {show && data.length > 0 && (
        <Box>
          <AccordionBox isExpanded title="Allocation d'actifs" Icon={TableIcon}>
            <Table rows={[data[0]]} columns={columns} pageSize={10} />
            <GridContainer extraCss="my-5">
              <GridItem cols={4}>
                <PtfPoids
                  field="Poids"
                  sumOf="FAMILLE"
                  title="FAMILLE"
                  data={data}
                />
              </GridItem>
              <GridItem cols={4}>
                <PtfPoids
                  field="Poids"
                  sumOf="Classification"
                  title="Classification"
                  data={data}
                />
              </GridItem>
              <GridItem cols={4}>
                <PtfPoids
                  field="Poids"
                  sumOf="CATEGORIE"
                  title="CATEGORIE"
                  data={data}
                />
              </GridItem>
            </GridContainer>
          </AccordionBox>
          <AccordionBox isExpanded title="Composition" Icon={TableIcon}>
            <GridContainer>
              <GridItem>
                <Box>
                  <Table columns={libelleColumns} rows={data} pageSize={10} />
                  <CustomButton
                    icon={<Zap size={18} />}
                    text="Simuler"
                    onClick={handleSimule}
                  />
                </Box>
              </GridItem>
              <GridItem>
                <ValorisationChart data={data} />
              </GridItem>
            </GridContainer>
          </AccordionBox>
          {sim.state && (
            <>
              <Simule data={sim.payload} />
              <PortefeuilleBacktest initOpcvm={data[0]["OPCVM"]} />
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default memo(index);
