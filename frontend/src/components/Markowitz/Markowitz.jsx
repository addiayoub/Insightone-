import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataWithContraints,
  filterMarkoAction,
  getSecteurs,
} from "../../redux/actions/DataActions";
import { logout } from "../../redux/slices/AuthSlice";
import { resetContraints } from "../../redux/slices/DataSlice";
import AccordionBox from "../AccordionBox";
import ContraintesOptimisation from "./ContraintesOptimisation";
import Indices from "./Indices";
import Optimisation from "./Optimisation";
import { Loader2 } from "../loader/Loader";
import Contraintes from "./Contraintes";
import Period from "../Period";
import Univers from "./Univers";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { ArrowDown, ArrowRight, ArrowUp, Star } from "react-feather";
import GenerationPortefeuilleAleatoire from "./GenerationPortefeuilleAleatoire";
import { Star1 } from "iconsax-react";
import { StarBorderRounded, StarOutline } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import RangeSlider from "../SliderCom";
import { calculatePercentage } from "../../utils/calculatePercentage";
import MainLoader from "../loaders/MainLoader";
import { LoadingSpinner } from "../loaders/LoadingSpinner";
import TestChart from "../charts/TestChart";
import BasicTabs from "../Test/Index";
import Scatter from "../Test/Scatter";
import SelectAll from "../Test/SelectAll";
import Slider from "../Dashboard/Slider";
import NewUnivers from "./NewUnivres";

const textColor = (value) => {
  value = +value;
  let className = "";
  let arrow = <ArrowRight size={18} />;
  if (value > 0) {
    className = "text-[var(--text-success)]";
    arrow = <ArrowUp size={18} />;
  } else if (value < 0) {
    className = "text-[var(--text-warning)]";
    arrow = <ArrowDown size={18} />;
  }
  return (
    <span className={`${className} font-semibold`}>
      <span>{formatNumberWithSpaces(value)}%</span>
      <span>{arrow}</span>
    </span>
  );
};

const getStarRating = (value) => {
  if (value >= 0 && value < 10000) {
    return 0;
  } else if (value >= 10000 && value < 50000) {
    return 1;
  } else if (value >= 50000 && value < 200000) {
    return 2;
  } else if (value >= 200000 && value < 600000) {
    return 3;
  } else if (value >= 600000 && value < 1000000) {
    return 4;
  } else {
    return 5;
  }
};
const renderStarsWithRating = (value) => {
  const rating = getStarRating(value);

  const stars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? (
      <StarIcon key={index} sx={{ color: "#faaf00" }} fontSize="small" />
    ) : (
      <StarOutline key={index} fontSize="small" />
    )
  );

  return (
    <div className="flex">
      <Typography
        variant="body2"
        className="mr-3 font-semibold min-w-[90px] text-right"
      >
        {formatNumberWithSpaces(value.toFixed(2))}
      </Typography>
      <div>{stars}</div>
    </div>
  );
};

export default function Markowitz() {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [error, setError] = useState(false);
  const [showData, setShowData] = useState(false);
  const [contraintesOptimisation, setContraintesOptimisation] = useState([]);
  const { filterMarko } = useSelector((state) => state.rapport);
  const [filteredData, setFilteredData] = useState(filterMarko.data);
  console.log("filteredData", filteredData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetContraints());
    dispatch(getDataWithContraints());
  }, []);
  const handelClick = () => {
    setError(false);
    setShowData(true);
    dispatch(filterMarkoAction({ dateDebut, dateFin }));
  };

  const columns = [
    {
      field: "LIBELLE",
      headerName: "LIBELLE",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      width: 360,
      renderCell: (params) => <strong>{params.row.LIBELLE}</strong>,
    },
    {
      field: "Performance",
      headerName: "Performance",
      headerAlign: "center",
      align: "center",
      flex: 0.3,
      width: 360,
      renderCell: (params) =>
        textColor((params.row.Performance * 100).toFixed(2)),
    },
    {
      field: "Performance_AN",
      headerName: "Performance Anualisé",
      headerAlign: "center",
      align: "center",
      flex: 0.3,
      width: 360,
      renderCell: (params) =>
        textColor((params.row.Performance_AN * 100).toFixed(2)),
    },
    {
      field: "Volatilite",
      headerName: "Volatilité",
      headerAlign: "center",
      align: "center",
      flex: 0.25,
      width: 360,
      renderCell: (params) =>
        textColor((params.row.Volatilite * 100).toFixed(2)),
    },
    {
      field: "VQM",
      headerName: "VQM",
      headerAlign: "center",
      align: "center",
      flex: 0.45,
      width: 360,
      renderCell: (params) => {
        const val = params.row.VQM.toFixed(2);
        return renderStarsWithRating(params.row.VQM);
      },
    },
    {
      field: "Nb_Semaine",
      headerName: "Nombre de semaines",
      headerAlign: "center",
      align: "center",
      flex: 0.3,
      width: 360,
      renderCell: (params) => params.row.Nb_Semaine,
    },
  ];
  return (
    <>
      <Period
        dateDebut={dateDebut}
        setDateDebut={setDateDebut}
        dateFin={dateFin}
        setDateFin={setDateFin}
        onSearch={handelClick}
      />
      {showData && (
        <Box className="w-full min-h-[400px] relative mt-[30px]">
          {filterMarko.loading ? (
            <MainLoader />
          ) : (
            <>
              <Indices dateDebut={dateDebut} dateFin={dateFin} />
              <Contraintes />
              <AccordionBox title={"Data"} isExpanded={true}>
                <h3 className="text-right">{`${
                  filterMarko.filteredData.length
                }/${filterMarko.data.length} (${calculatePercentage(
                  filterMarko.filteredData.length,
                  filterMarko.data.length
                )}%)`}</h3>
                <Table
                  columns={columns}
                  rows={filterMarko.filteredData}
                  rowId={"LIBELLE"}
                  pageSize={25}
                />
              </AccordionBox>

              {/* <Univers
                dateDebut={dateDebut}
                dateFin={dateFin}
                setContraintesOptimisation={setContraintesOptimisation}
              /> */}
              <NewUnivers
                dateDebut={dateDebut}
                dateFin={dateFin}
                setContraintesOptimisation={setContraintesOptimisation}
              />

              <ContraintesOptimisation
                contraintesOptimisation={contraintesOptimisation}
                dateDebut={dateDebut}
                dateFin={dateFin}
              />
              <GenerationPortefeuilleAleatoire
                titres={contraintesOptimisation}
                dateDebut={dateDebut}
                dateFin={dateFin}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
}
