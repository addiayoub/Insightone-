import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getComparaison,
  getFirstGraph,
  getIndices,
  getIndicesChart,
  getRendementRisqueData,
} from "../../redux/actions/DataActions";
import { logout } from "../../redux/slices/AuthSlice";
import groupBy from "../../utils/groupBy";
import AccordionBox from "../AccordionBox";
import ComparaisonIndices from "../charts/ComparaisonIndices";
import IndicesChart from "../charts/IndicesChart";
import PerformanceChart from "../charts/PerformanceChart";
import RendementRisqueChart from "../charts/RendementRisqueChart";
import VolatiliteChart from "../charts/VolatiliteChart";
import MainLoader from "../loaders/MainLoader";
import RendementRisqueScatter from "../charts/RendementRisqueScatter";
import SelectIndices from "./SelectIndices";
import ChartContainer from "../ChartContainer";
import RendementRisqueData from "./RendementRisqueData";
import { notyf } from "../../utils/notyf";

const grid = {
  display: "grid",
  gridTemplateColumns: "repeate(auto-fit, minmax(250px, 1fr))",
};

function Indices({ dateDebut, dateFin }) {
  const dispatch = useDispatch();
  const [indices, setIndices] = useState([]);
  const [indicesData, setIndicesData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sCategories, setSCategories] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSCategories, setSeletedSCategories] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState([]);
  const [showCompa, setShowCompa] = useState(false);
  const [compaData, setCompaData] = useState([]);
  const [loadingIndicesChart, setLoadingIndicesChart] = useState(false);
  const [loadingCompa, setLoadingCompa] = useState(false);
  const [g1Data, setG1Data] = useState([]);
  const [g2Data, setG2Data] = useState([]);
  const [rendementRisqueData, setRendementRisqueData] = useState([]);

  const showComparaison = () => {
    setLoadingCompa(true);
    dispatch(getComparaison({ dateDebut, dateFin, indices: selectedIndices }))
      .unwrap()
      .then(({ data }) => {
        const groupedData = groupBy(data, "NOM_INDICE");
        setCompaData(groupedData);
        setShowCompa(true);
      })
      .finally(() => {
        setLoadingCompa(false);
      });
  };

  const showPerformanceChart = () => {
    dispatch(getFirstGraph({ dateDebut, dateFin, indices: selectedIndices }))
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        const groupedData = groupBy(data, "NOM_INDICE");
        setG1Data(groupedData);
        setG2Data(groupedData);
      });
  };

  const showRendementRisqueChart = () => {
    dispatch(
      getRendementRisqueData({ dateDebut, dateFin, indices: selectedIndices })
    )
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        setRendementRisqueData(data);
      });
  };

  // let filtred = indicesData;
  // useEffect(() => {
  //   if (selectedClasses.length > 0) {
  //     filtred = filtred.filter((item) => selectedClasses.includes(item.classe));
  //   }
  //   if (selectedCategories.length > 0) {
  //     console.log(selectedCategories);
  //     const newScat = filtred.filter((item) =>
  //       selectedCategories.includes(item.S_CATEGORIE)
  //     );
  //     console.log("newScat", newScat);
  //   }
  //   const newCat = [...new Set(filtred.map((item) => item.categorie))];
  //   setCategories(newCat);
  //   console.log(filtred);
  // }, [selectedClasses, selectedCategories, selectedSCategories]);
  useEffect(() => {
    setSelectedCategories([]);
    setSeletedSCategories([]);
    setSelectedIndices([]);
    const categories = [...new Set(indicesData.map((item) => item.categorie))];
    const sCategories = [
      ...new Set(indicesData.map((item) => item.S_CATEGORIE)),
    ];
    const indices = [...new Set(indicesData.map((item) => item.NOM_INDICE))];
    const filtred = indicesData.filter((item) =>
      selectedClasses.includes(item.classe)
    );
    if (selectedClasses.length > 0) {
      console.log("Filtered", filtred);
      const newCat = [...new Set(filtred.map((item) => item.categorie))];
      const newSCat = [...new Set(filtred.map((item) => item.S_CATEGORIE))];
      const newIndices = [...new Set(filtred.map((item) => item.NOM_INDICE))];
      console.log("new Cat", newCat);
      console.log("new Scat", newSCat);
      console.log("newIndices Sc", newIndices);
      setCategories(newCat);
      setSCategories(newSCat);
      setIndices(newIndices);
    } else {
      console.log("selectedClasses else");

      setCategories(categories);
      setSCategories(sCategories);
      setIndices(indices);
    }
  }, [selectedClasses]);

  useEffect(() => {
    setSeletedSCategories([]);
    setSelectedIndices([]);
    const sCategories = [
      ...new Set(indicesData.map((item) => item.S_CATEGORIE)),
    ];
    const indices = [...new Set(indicesData.map((item) => item.NOM_INDICE))];
    let filtred = indicesData;
    if (selectedClasses.length > 0) {
      filtred = filtred.filter((item) => selectedClasses.includes(item.classe));
    }
    if (selectedCategories.length > 0) {
      filtred = filtred.filter((item) =>
        selectedCategories.includes(item.categorie)
      );
      console.log("setSCategories filtred", filtred);
    }
    const newSCat = [...new Set(filtred.map((item) => item.S_CATEGORIE))];
    const newIndices = [...new Set(filtred.map((item) => item.NOM_INDICE))];
    console.log("setSCategories newSCa", newSCat);
    console.log("setSCategories newIndices", newIndices);
    setSCategories(newSCat);
    setIndices(newIndices);
  }, [selectedCategories]);

  useEffect(() => {
    let filtred = indicesData.filter((item) =>
      selectedSCategories.includes(item.S_CATEGORIE)
    );
    console.log("filtered sCta", filtred);

    if (selectedClasses.length > 0) {
      filtred = indicesData.filter((item) =>
        selectedClasses.includes(item.classe)
      );
    }
    if (selectedCategories.length > 0) {
      filtred = indicesData.filter((item) =>
        selectedCategories.includes(item.categorie)
      );
    }
    if (selectedSCategories.length > 0) {
      filtred = filtred.filter((item) =>
        selectedSCategories.includes(item.S_CATEGORIE)
      );
    }
    console.log("selectedSCategories", filtred);
    const indices = [...new Set(indicesData.map((item) => item.NOM_INDICE))];
    const newIndices = [...new Set(filtred.map((item) => item.NOM_INDICE))];
    setIndices(newIndices.length > 0 ? newIndices : indices);
  }, [selectedSCategories]);

  useEffect(() => {
    setShowCompa(false);
    if (selectedIndices.length > 0) {
      setLoadingIndicesChart(true);
      dispatch(
        getIndicesChart({ dateDebut, dateFin, indices: selectedIndices })
      )
        .unwrap()
        .then(({ data }) => {
          const groupedData = groupBy(data, "NOM_INDICE");
          setData(groupedData);
          setIsShow(true);
        })
        .catch((rejectedValue) => {
          console.log("DATA rejectedValue", rejectedValue);
          if (rejectedValue.status) {
            dispatch(logout());
          }
          // notyf.error(rejectedValue);
        })
        .finally(() => setLoadingIndicesChart(false));
    } else {
      setIsShow(false);
    }
  }, [selectedIndices]);
  useEffect(() => {
    dispatch(getIndices())
      .unwrap()
      .then((successValue) => {
        console.log("indices success", successValue);
        setIndicesData(successValue.data);
        setClasses(successValue.classes);
        setCategories(successValue.categories);
        setSCategories(successValue.sCategories);
        setIndices(successValue.indices);
      })
      .catch((rejectedValue) => {
        console.log("univers", rejectedValue);
        if (rejectedValue.status) {
          dispatch(logout());
        }
        notyf.error("Request Failed");
      });
  }, []);
  return (
    <>
      <AccordionBox title={"Selection des indices"}>
        <Box className="">
          {indicesData.length > 0 && (
            <Box className="flex gap-4 flex-wrap">
              <SelectIndices
                label={"Classes"}
                indices={classes}
                selectedIndices={selectedClasses}
                setSelectedIndices={setSelectedClasses}
              />
              <SelectIndices
                label={"Catégories"}
                indices={categories}
                selectedIndices={selectedCategories}
                setSelectedIndices={setSelectedCategories}
              />
              <SelectIndices
                label={"Sous-catégories"}
                indices={sCategories}
                selectedIndices={selectedSCategories}
                setSelectedIndices={setSeletedSCategories}
              />
              <SelectIndices
                label={"Indices"}
                indices={indices}
                selectedIndices={selectedIndices}
                disableCloseOnSelect={false}
                setSelectedIndices={setSelectedIndices}
              />
            </Box>
          )}
          {loadingIndicesChart && <MainLoader />}
          <ChartContainer width={400}>
            {isShow && !loadingIndicesChart && <IndicesChart data={data} />}
            {showCompa && <ComparaisonIndices data={compaData} />}
          </ChartContainer>
        </Box>
        <Box className="block max-w-[400px] mt-4 mx-auto">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              showComparaison();
              showPerformanceChart();
              showRendementRisqueChart();
            }}
            disabled={
              selectedIndices.length < 1 || loadingCompa || loadingIndicesChart
            }
          >
            {loadingCompa ? "Veuillez patienter..." : "Valider"}
          </Button>
        </Box>
        {loadingCompa && <MainLoader />}
        {showCompa && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 mt-24">
              <div className="md:col-span-5 lg:col-span-5 xl:col-span-5">
                <RendementRisqueData data={rendementRisqueData} />
              </div>
              <div className="md:col-span-7 lg:col-span-7 xl:col-span-7">
                <RendementRisqueScatter data={rendementRisqueData} />
              </div>
            </div>
            <ChartContainer width={400}>
              <PerformanceChart data={g1Data} />
              <VolatiliteChart data={g2Data} />
            </ChartContainer>
          </>
        )}
      </AccordionBox>
    </>
  );
}

export default Indices;
