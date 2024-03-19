const obj = {
  ORDRE: 5,
  Seance: "2024-03-15",
  INDICE: "MBI LT",
  CLASSE: "TAUX",
  CATEGORIE: "MBI",
  perf_1S: 0.0011669679988512982,
  perf_2S: 0.004211155573161429,
  perf_1M: 0.008507477514424044,
  perf_2M: 0.00958109494537962,
  perf_3M: 0.04780679469672,
  perf_6M: 0.08743564356583144,
  perf_1AN: 0.1559302465289003,
  perf_2ANS: -0.060051770169921914,
  perf_3ANS: -0.03442322255920438,
  perf_4ANS: 0.04293285237240596,
  perf_5ANS: 0.1572902171795647,
  perf_3M_an: 0.20538238769674688,
  perf_6M_an: 0.18251627889743394,
  perf_1AN_an: 0.1559302465289003,
  perf_2ANS_an: -0.030490727310935828,
  perf_3ANS_an: -0.011608635194726658,
  perf_4ANS_an: 0.010564614239846337,
  perf_5ANS_an: 0.02964723217041021,
};

const keys = [
  "perf_1S",
  "perf_2S",
  "perf_1M",
  "perf_2M",
  "perf_3M",
  "perf_6M",
  "perf_1AN",
  "perf_2ANS",
  "perf_3ANS",
  "perf_4ANS",
  "perf_5ANS",
  "perf_3M_an",
  "perf_6M_an",
  "perf_1AN_an",
  "perf_2ANS_an",
  "perf_3ANS_an",
  "perf_4ANS_an",
  "perf_5ANS_an",
];
function valueToColor(value) {
  let color = "rgb(21 128 61)";
  if (value <= 10) {
    color = "rgb(153 27 27)";
  } else if (value <= 20) {
    color = "rgb(185 28 28)";
  } else if (value <= 30) {
    color = "rgb(220 38 38)";
  } else if (value <= 40) {
    color = "rgb(239 68 68)";
  } else if (value <= 50) {
    color = "rgb(74 222 128)";
  } else if (value <= 60) {
    color = "rgb(34 197 94)";
  } else if (value <= 80) {
    color = "rgb(22 163 74)";
  }
  return color;
}
export const columns = [
  {
    field: "Seance",
    headerName: "Seance",
  },
  {
    field: "CLASSE",
    headerName: "Classe",
  },
  {
    field: "CATEGORIE",
    headerName: "Categorie",
  },
  {
    field: "INDICE",
    headerName: "Indice",
  },
  ...keys.map((key) => ({
    field: key,
    headerName: key,
    renderCell: ({ row }) => {
      const value = parseFloat((row[key] * 100).toFixed(2));
      return (
        <span
          className={`text-[#e2e8f0] min-w-[20px] w-full h-full flex justify-center items-center`}
          style={{ backgroundColor: valueToColor(value) }}
        >
          {value}%
        </span>
      );
    },
  })),
];
