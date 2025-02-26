import React, { useMemo } from "react";
import Table from "../Table"; // Utilise le composant Table existant

const BacktestTable = ({ backtestData }) => {
  // Vérifie si les données de backtest sont disponibles
  if (!backtestData || !backtestData.backtest_response || !backtestData.backtest_response.result_df) {
    return <div className="text-gray-500">Aucune donnée de backtest disponible</div>;
  }

  // Transforme les données pour le tableau
  const tableData = useMemo(() => {
    return backtestData.backtest_response.result_df.map((item, index) => ({
      id: index, // Assure un ID unique pour chaque ligne
      ...item
    }));
  }, [backtestData]);

  // Crée les colonnes basées sur les clés de la première entrée
  const columns = useMemo(() => {
    if (tableData.length === 0) return [];
    
    // Extrait les clés du premier objet
    const keys = Object.keys(tableData[0]).filter(key => key !== 'id');
    
    return keys.map(key => ({
      field: key,
      headerName: key,
      flex: 1,
      minWidth: 150,
      // Formatage conditionnel pour certains types de données
      valueFormatter: (params) => {
        // Si la valeur est un nombre et pas un entier, formater avec 2 décimales
        if (typeof params.value === 'number' && !Number.isInteger(params.value)) {
          return params.value.toFixed(2);
        }
        return params.value;
      }
    }));
  }, [tableData]);

  return (
    <div className="mt-4 p-4 border rounded ">
      <h3 className="text-xl font-bold mb-4">Statistiques du Backtest</h3>
      <Table 
        columns={columns}
        rows={tableData}
        showToolbar={true}
        pageSize={5}
        legend="Résultats détaillés de la stratégie"
        density="comfortable"
      />
    </div>
  );
};

export default React.memo(BacktestTable);