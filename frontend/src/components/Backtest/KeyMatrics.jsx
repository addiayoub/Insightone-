import React from "react";
import Table from "../Table";
import { generateKeyPerfColumns } from "../portefeuilles/Tables/columns";
const separateArrayByEmptyMetric = (inputArray) => {
  const resultArray = [];
  let currentGroup = [];

  inputArray.forEach((item) => {
    if (item["Metric"] === "") {
      // Empty Metric, start a new group
      if (currentGroup.length > 0) {
        resultArray.push(currentGroup);
        currentGroup = [];
      }
    } else {
      // Non-empty Metric, add to the current group
      currentGroup.push(item);
    }
  });

  // Add the last group if it's not empty
  if (currentGroup.length > 0) {
    resultArray.push(currentGroup);
  }

  return resultArray;
};
const KeyMatrics = ({ data }) => {
  const headers =
    data.length > 0
      ? Object.keys(data[0]).filter((ele) => ele !== "Metric")
      : [];
  console.log("headers is", headers);
  const keyPerfColumns = generateKeyPerfColumns(headers);
  const newData = separateArrayByEmptyMetric(data);
  return (
    <>
      {newData.map((tableRows, index) => {
        return (
          <Table
            rows={tableRows}
            key={index}
            columns={keyPerfColumns}
            className="h-fit"
          />
        );
      })}
    </>
  );
};

export default KeyMatrics;
