import TextColor from "../Dashboard/TextColor";

export const performanceColumns = [
  {
    field: "perf",
    headerName: "perf",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.perf}</strong>,
  },
  {
    field: "perf_opc",
    headerName: "Fonds",
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row.perf_opc;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
  {
    field: "perf_bench",
    headerName: "Benchmark",
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row.perf_bench;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
  {
    field: "perf_classe",
    headerName: "Catégorie",
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row.perf_classe;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
];
