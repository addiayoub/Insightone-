import React, { useState, useMemo } from "react";
import ConsultationPtfs from "./ConsultationPtfs";
import moment from "moment";
import { getColumns } from "./columns";
import MainLoader from "../loaders/MainLoader";
import { Box } from "@mui/material";
import AccordionBox from "../Ui/AccordionBox";
import { Wallet } from "iconsax-react";
import PortefeuillePeriod from "../PortefeuillePeriod";
import Table from "../Table";
import { countUniqueValues } from "../../utils/caluclations";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import Card from "../Ui/Card";
import { Flag } from "react-feather";

const index = () => {
  const [show, setShow] = useState(false);
  const [choosen, setChoosen] = useState({});
  const handleValider = () => {
    setShow(false);
    setShow(true);
    console.log("ptf", choosen);
  };
  const columns = useMemo(() => getColumns(choosen), [choosen]);
  const cards = useMemo(() => {
    return [
      {
        title: "Secteurs",
        icon: <Flag className="text-primary" size={22} />,
        value: countUniqueValues(choosen.data, "SECTEUR_ACTIVITE"),
      },
      {
        title: "Titres",
        icon: <Flag className="text-primary" size={22} />,
        value: choosen?.data?.length,
      },
    ];
  }, [choosen]);
  return (
    <div>
      <ConsultationPtfs {...{ handleValider, setChoosen }} />
      {show && (
        <Box className="my-4">
          <GridContainer>
            {cards.map((card, index) => {
              return (
                <GridItem cols={3} key={index} extraCss="md:col-span-4">
                  <Card {...card} />
                </GridItem>
              );
            })}
          </GridContainer>
          <AccordionBox
            title={`Portefeuille: ${choosen.name}`}
            isExpanded
            Icon={Wallet}
          >
            <PortefeuillePeriod params={choosen.params} />
            <span className="font-semibold mt-2 block">
              Créé le: {moment(choosen.createdAt).format("DD/MM/YYYY")}
            </span>
            <Table columns={columns} rows={choosen.data} pageSize={10} />
          </AccordionBox>
        </Box>
      )}
    </div>
  );
};

export default index;
