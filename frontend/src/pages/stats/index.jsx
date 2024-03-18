import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../redux/actions/AdminActions";
import MainLoader from "../../components/loaders/MainLoader";
import GridContainer, { GridItem } from "../../components/Ui/GridContainer";
import ApiLogs from "./ApiLogs";
import { getStatsCards } from "./StatsCards";
import ApiLog from "./ApiLog";

const index = () => {
  const {
    stats: { data, loading },
  } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  console.log("data", data);
  const cards = useMemo(() => getStatsCards(data), [data]);
  useEffect(() => {
    dispatch(getStats());
  }, []);
  return (
    <div>
      {!loading && (
        <>
          <GridContainer>
            {cards.map((card, index) => {
              return (
                <GridItem cols={3} key={index} extraCss="md:col-span-4">
                  <Card {...card} />
                </GridItem>
              );
            })}
          </GridContainer>
          <ApiLogs />
        </>
      )}
      {loading && <MainLoader />}
      {/* <ApiLog /> */}
    </div>
  );
};

const Card = (props) => {
  const { title, value, icon } = props;
  return (
    <div className="p-8 rounded-xl flex flex-col gap-x-2 gap-y-4 max-h-[160px] shadow-lg cursor-pointer select-none">
      <div className="flex gap-4 items-center">
        <div className="rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0 border-[1px] border-solid border-muted">
          {icon}
        </div>
        <span className="font-semibold phone:text-sm">{title}</span>
      </div>
      <p className="flex items-center gap-2">
        <span className="font-semibold">{value}</span>
      </p>
    </div>
  );
};

export default index;
