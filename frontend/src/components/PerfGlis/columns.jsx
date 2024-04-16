import moment from "moment";
import TextColor from "../Dashboard/TextColor";

const obb = {
  perf_1S: 0.000512144144775073,
  perf_1M: 0.0024467465096513763,
  perf_2M: 0.0049220526726008185,
  perf_3M: 0.0074114489769971925,
  perf_6M: 0.015964860377430723,
  perf_9M: 0.02385998899515962,
  perf_1AN: 0.033537242946741985,
  perf_YTD: 0.0068835120239267855,
  perf_2ANS: 0.04929665001496497,
  perf_3ANS: 0.06535687430681891,
  perf_4ANS: 0.08955924232232726,
  perf_5ANS: 0.11538584465929036,
  perf_3M_an: 0.029977004811876373,
  perf_6M_an: 0.032184597521732305,
  perf_1AN_an: 0.033537242946741985,
  perf_2ANS_an: 0.024351819452167023,
  perf_3ANS_an: 0.021327506076615155,
  perf_4ANS_an: 0.02167487240481414,
  perf_5ANS_an: 0.022080319103735535,
};
const columns1 = [
  "perf_1S",
  "perf_1M",
  "perf_2M",
  "perf_3M",
  "perf_6M",
  "perf_9M",
  "perf_1AN",
  "perf_YTD",
  "perf_2ANS",
  "perf_3ANS",
  "perf_4ANS",
  "perf_5ANS",
];
const columns2 = [
  "perf_3M_an",
  "perf_6M_an",
  "perf_1AN_an",
  "perf_2ANS_an",
  "perf_3ANS_an",
  "perf_4ANS_an",
  "perf_5ANS_an",
];

export const ref = {
  perf_1S: "1S",
  perf_1M: "1M",
  perf_2M: "2M",
  perf_3M: "3M",
  perf_6M: "6M",
  perf_9M: "9M",
  perf_1AN: "1AN",
  perf_YTD: "YTD",
  perf_2ANS: "2ANS",
  perf_3ANS: "3ANS",
  perf_4ANS: "4ANS",
  perf_5ANS: "5ANS",
  perf_3M_an: "3M an",
  perf_6M_an: "6M an",
  perf_1AN_an: "1AN",
  perf_2ANS_an: "2ANS",
  perf_3ANS_an: "3ANS",
  perf_4ANS_an: "4ANS",
  perf_5ANS_an: "5ANS",
};

function getMinMaxValues(data, keys) {
  let min = Infinity;
  let max = -Infinity;
  console.log("getMinMaxValues", data);
  data.forEach((item) => {
    keys.forEach((key) => {
      const value = item[key];
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    });
  });

  return { min, max };
}

export const getColumns = (data, isFirst) => {
  const keys = isFirst ? columns1 : columns2;
  const { min, max } = getMinMaxValues(data, keys);
  console.log("{ min, max }", { min, max });
  return [
    {
      field: "Seance",
      headerName: "Séance",
      renderCell: ({ row }) => (
        <span>{moment(row.Seance).format("DD/MM/YYYY")}</span>
      ),
      flex: 0.4,
    },
    {
      field: "INDICE",
      headerName: "Indice",
      flex: isFirst ? 0.8 : 0.7,
      renderCell: ({ row }) => {
        return <span className="font-semibold">{row.INDICE}</span>;
      },
    },
    ...keys.map((key) => ({
      field: key,
      headerName: ref[key],
      flex: isFirst ? 0.32 : 0.4,
      width: 100,
      renderCell: ({ row }) => {
        const value = parseFloat((row[key] * 100).toFixed(2));
        return (
          <TextColor
            value={row[key]}
            percentage
            textAlign="left"
            withoutArrow
          />
        );
      },
    })),
  ];
};
