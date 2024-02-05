import React from "react";
import AccordionBox from "../AccordionBox";
import Table from "../Table";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { columns } from "./columns";
import { FileText } from "react-feather";

function Data({ data }) {
  return (
    <AccordionBox title={"Data"} isExpanded Icon={FileText}>
      <h3 className="text-right">{`${data.filteredData.length}/${
        data.data.length
      } (${calculatePercentage(
        data.filteredData.length,
        data.data.length
      )}%)`}</h3>
      <Table columns={columns} rows={data.filteredData} pageSize={10} />
    </AccordionBox>
  );
}

export default Data;
