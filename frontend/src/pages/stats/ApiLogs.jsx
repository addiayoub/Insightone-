import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/Table";
import { columns } from "./columns";
import { Box } from "@mui/material";
import { transformUsersData } from "../../utils/admin";
import ApiLogsChart from "../../components/charts/Stats/ApiLogsChart";
import ApiLogsByUserChart from "../../components/charts/Stats/ApiLogsByUserChart";
import ApiLogsByTypeChart from "../../components/charts/Stats/ApiLogsByTypeChart";

const ApiLogs = () => {
  const {
    stats: { data },
  } = useSelector((state) => state.admin);
  const rows = useMemo(
    () => transformUsersData(data.userApiLogs ?? []),
    [data]
  );
  return (
    <Box className="my-8">
      <Table rows={rows} columns={columns} pageSize={10} legend="ApiLogs" />

      {data?.apiLogsByUser?.length > 0 && (
        <ApiLogsByUserChart data={data.apiLogsByUser} />
      )}
      {data?.apiLogsByType && <ApiLogsByTypeChart data={data.apiLogsByType} />}
      {/* <ApiLogsChart /> */}
    </Box>
  );
};

export default ApiLogs;
