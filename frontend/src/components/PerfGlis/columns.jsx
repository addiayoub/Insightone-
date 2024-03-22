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

const columns1 = [
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

const headerNameRef = {
  perf_1S: "1S",
  perf_2S: "2S",
  perf_1M: "1M",
  perf_2M: "2M",
  perf_3M: "3M",
  perf_6M: "6M",
  perf_1AN: "AN",
  perf_2ANS: "2ANS",
  perf_3ANS: "3ANS",
  perf_4ANS: "4ANS",
  perf_5ANS: "5ANS",
  perf_3M_an: "3M",
  perf_6M_an: "6M",
  perf_1AN_an: "1AN",
  perf_2ANS_an: "2ANS",
  perf_3ANS_an: "3ANS",
  perf_4ANS_an: "4ANS",
  perf_5ANS_an: "5ANS",
};

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
function getColor(value, min, max) {
  // Normalize the value between 0 and 1
  let normalizedValue = (value - min) / (max - min);

  // Interpolate between red (255, 0, 0) and green (0, 255, 0)
  let red = Math.round(255 * (1 - normalizedValue));
  let green = Math.round(255 * normalizedValue);

  // Construct the RGB color string
  let color = `rgb(${red}, ${green}, 0)`;

  return color;
}
const geeg = (pct) => {
  const percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
  ];
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
};
function getValueColor(value, min, max) {
  // Clamp the value to be within the min-max range
  value = Math.min(Math.max(value, min), max);

  // Calculate the normalized value between 0 and 1
  let normalizedValue = (value - min) / (max - min);

  // Calculate the RGB values based on the normalized value
  let red = Math.floor((1 - normalizedValue) * 255);
  let green = Math.floor(normalizedValue * 255);

  // Construct the CSS color string
  let color = "rgb(" + red + "," + green + ",0)";

  return color;
}

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
export const getColumns2 = (data, isFirst) => {
  const keys = isFirst ? columns1 : columns2;
  return [
    {
      field: "Seance",
      headerName: "Séance",
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
      headerName: headerNameRef[key],
      flex: isFirst ? 0.32 : 0.4,
      width: 100,
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
};
export const getColumns = (data, isFirst) => {
  const keys = isFirst ? columns1 : columns2;
  const { min, max } = getMinMaxValues(data, keys);
  console.log("{ min, max }", { min, max });
  return [
    {
      field: "Seance",
      headerName: "Séance",
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
      headerName: headerNameRef[key],
      flex: isFirst ? 0.32 : 0.4,
      width: 100,
      renderCell: ({ row }) => {
        const value = parseFloat((row[key] * 100).toFixed(2));
        // const {min, max} = getMinMaxValues()
        return (
          <span
            className={`text-[#000] min-w-[20px] w-full h-full flex justify-center items-center`}
            // style={{ backgroundColor: valueToColor(value) }}
            // style={{ backgroundColor: getColor(value, min, max) }}
            // style={{ backgroundColor: geeg(value / 100) }}
            style={{ backgroundColor: getValueColor(value / 100, min, max) }}
          >
            {value}%
          </span>
        );
      },
    })),
  ];
};
