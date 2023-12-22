import React from "react";
import { Box } from "@mui/material";
import Gauge from "./Gauge";

function GuageCharts({ data }) {
  return (
    <div className="my-14">
      <Box className="flex items-center justify-center flex-wrap gap-y-10">
        <Box className="">
          <h2 className="text-xl/7 sm:text-3xl/8 font-bold text-[#181C21] !text-sm">
            <a
              href="#indicateurs-techniques"
              data-test="indicateurs-techniques"
              className="flex gap-3 items-center hover:underline justify-center"
            >
              <span className="min-w-fit">Indicateurs Techniques</span>
            </a>
          </h2>

          <Gauge
            value={data.resume.indecateurTech.resume.value}
            title={data.resume.indecateurTech.resume.text}
          />
        </Box>
        <Box className="">
          <h3 className="text-center">Résumé</h3>
          <Gauge
            value={data.resume.global.value}
            title={data.resume.global.text}
          />
        </Box>
        <Box className="">
          <h2 className="text-xl/7 sm:text-3xl/8 font-bold text-[#181C21] !text-sm">
            <a
              href="#moyennes-mobiles"
              data-test="moyennes-mobiles"
              className="flex gap-3 items-center hover:underline justify-center"
            >
              <span className="min-w-fit">Moyennes Mobiles</span>
            </a>
          </h2>
          <Gauge
            value={data.resume.moyMobileBVC.resume.value}
            title={data.resume.moyMobileBVC.resume.text}
          />
        </Box>
      </Box>
    </div>
  );
}

export default GuageCharts;
