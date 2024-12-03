import React, { useMemo } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSectorialData } from "../../redux/actions/AnalyseSectorialActions";
import SecteurEvolution from "./SecteurEvolution";
import SecteurPerformance from "./SecteurPerformance";
import News from "./News";
import Period from "../Period";
import MainLoader from "../loaders/MainLoader";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import { getColumns } from "../PerfGlis/columns";
import Table from "../Table";

function Secteurs() {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(3, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const { data, loading, error, news, lastSeance, perfMASI, perfSectoriel } =
    useSelector((state) => state.analyseSectorial);
  const dispatch = useDispatch();
  const handelSearch = () => {
    dispatch(getSectorialData({ dateDebut, dateFin }))
      .unwrap()
      .then((success) => console.log("SectorialData", success))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Period
        dateDebut={dateDebut}
        setDateDebut={setDateDebut}
        dateFin={dateFin}
        setDateFin={setDateFin}
        onSearch={handelSearch}
        isLoading={loading}
      />
      <Box className="w-full min-h-[400px] relative mt-[30px]">
        {loading && <MainLoader />}
        {!loading && data.length > 0 && (
          <GridContainer extraCss="gap-y-4 gap-x-12 items-center mt-24">
            <GridItem cols={5}>
              <SecteurEvolution data={data} height={"500px"} />
            </GridItem>
            <GridItem
              className="md:col-span-7 lg:col-span-7 xl:col-span-7"
              cols={7}
            >
              <SecteurPerformance data={lastSeance} height={"500px"} />
            </GridItem>
          </GridContainer>
        )}
        {perfMASI.length > 0 && (
          <Table
            legend={"Performance MASI"}
            columns={getColumns(perfMASI, true)}
            rows={perfMASI}
            density="compact"
          />
        )}
        {perfMASI.length > 0 && (
          <Table
            legend={"Performance MASI Annualisée"}
            columns={getColumns(perfMASI, false)}
            rows={perfMASI}
            density="compact"
          />
        )}
        {perfSectoriel.length > 0 && (
          <Table
            legend={"Performance Sectoriel"}
            columns={getColumns(perfSectoriel, true)}
            rows={perfSectoriel}
            density="compact"
          />
        )}
        {perfSectoriel.length > 0 && (
          <Table
            legend={"Performance Sectoriel Annualisée"}
            columns={getColumns(perfSectoriel, false)}
            rows={perfSectoriel}
            density="compact"
          />
        )}
        {!loading && news.length > 0 && <News data={news} />}
      </Box>
    </>
  );
}

export default Secteurs;
