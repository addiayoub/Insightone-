import React, { memo, useMemo, useState } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import Table from "../Table";
import { bilanCols } from "./columns";
import Choice from "../portefeuilles/Choice";
import ElemeFin from "./ElemeFin";
import Dividende from "./Dividende";
const ProfileFin = () => {
  const { data, loading } = useSelector((state) => state.profilFin);
  const [isShow, setIsShow] = useState(false);
  const show = !loading && !Array.isArray(data) && isShow;
  console.log("data?.cmptResResu", data?.cmptResResu);
  const tabs = useMemo(() => {
    return [
      {
        label: "Eléments financiers clés",
        component: ElemeFin,
      },
      {
        label: "Bilan",
        component: Table,
        props: {
          rows: data?.bilan,
          columns: bilanCols(data?.bilan),
          withoutCellP: true,
          pageSize: 50,
          density: "compact",
        },
      },
      {
        label: "Compte Résultat",
        component: Table,
        props: {
          rows: data?.cmptRes,
          columns: bilanCols(data?.cmptRes),
          withoutCellP: true,
          pageSize: 50,
          density: "compact",
        },
      },
      {
        label: "Dividende",
        component: Dividende,
        props: {
          data: data?.dividende,
        },
      },
    ];
  }, [data]);
  return (
    <>
      <Filter setIsShow={setIsShow} />
      {show && <Choice tabs={tabs} />}
      {loading && <MainLoader />}
    </>
  );
};

export default memo(ProfileFin);
