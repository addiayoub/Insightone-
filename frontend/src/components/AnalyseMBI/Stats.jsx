import React, { useMemo } from "react";
import { Activity } from "react-feather";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import Card from "../Ui/Card";
import TextColor from "../Dashboard/TextColor";
const g = {
  duration: 45.12,
  moyDuration: 43.75,
  coupon: 3.04,
  ytm: 3.14,
};
const getPerfSign = (value) => {
  return (
    <span
      className={`${
        value == 0 ? "" : value > 0 ? "text-success" : "text-error"
      }`}
    >
      {value == 0 ? "" : value > 0 ? "+" : "-"}
    </span>
  );
};

const getCards = (data) => {
  return [
    {
      title: "Duration",
      icon: <Activity className="text-primary" size={22} />,
      value: data.duration + "%",
    },
    {
      title: "Duration moyenne",
      icon: <Activity className="text-primary" size={22} />,
      value: data.moyDuration + "%",
    },
    {
      title: "Coupon",
      icon: <Activity className="text-primary" size={22} />,
      value: data.coupon + "%",
    },
    {
      title: "YTM",
      icon: <Activity className="text-primary" size={22} />,
      value: data.ytm + "%",
    },
    {
      title: "Performance",
      icon: (
        <Activity
          className={`${data.perf > 0 ? "text-success" : "text-error"}`}
          size={22}
        />
      ),
      value: (
        <>
          {getPerfSign(data.perf)}
          <TextColor value={data.perf / 100} percentage />
        </>
      ),
    },
  ];
};

const Stats = ({ data }) => {
  const cards = useMemo(() => getCards(data), [data]);
  return (
    <GridContainer>
      {cards.map((card, index) => {
        return (
          <GridItem cols={3} key={index} extraCss="md:col-span-4">
            <Card {...card} />
          </GridItem>
        );
      })}
    </GridContainer>
  );
};

export default Stats;
