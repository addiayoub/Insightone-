import React from "react";
import DateComp from "../Dashboard/DateComp";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSectorialData } from "../../redux/actions/SectorialActions";
import SecteurEvolution from "./SecteurEvolution";
import Loader, { Loader2 } from "../loader/Loader";
import SecteurPerformance from "./SecteurPerformance";
import News from "./News";
import SecteurChart from "./SecteurChart";
import Period from "../Period";
import MainLoader from "../loaders/MainLoader";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  alignItems: "center",
  gap: "0 15px",
};
function Secteurs() {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(3, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const { data, loading, error, news, lastSeance } = useSelector(
    (state) => state.sectorial
  );
  const dispatch = useDispatch();
  const handelSearch = () => {
    dispatch(getSectorialData({ dateDebut, dateFin }))
      .unwrap()
      .then()
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
          <div className="mt-24">
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 items-center mt-24">
              <div className="md:col-span-5 lg:col-span-5 xl:col-span-5">
                <SecteurEvolution data={data} height={"500px"} />
              </div>
              <div className="md:col-span-7 lg:col-span-7 xl:col-span-7">
                <SecteurPerformance data={lastSeance} height={"500px"} />
              </div>
            </div>
          </div>
        )}
        {!loading && news.length > 0 && <News data={news} />}
      </Box>
    </>
  );
}

export default Secteurs;
