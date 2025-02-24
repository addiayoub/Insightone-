import React, { memo, useState } from "react";
import axios from "axios";
import AnalysePMM from "./AnalysePMM";
import VolumeAnalysis from "./VolumeAnalysis";
import Filter from "./Filter";
import MainLoader from "../loaders/MainLoader";
import CandlestickChart from "./CandlestickChart";

const AnalysePM = () => {
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async (params) => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.get(`http://192.168.11.2:30000/PREDICTION/BVC/POST/get_predictions/`, {
        params: {
          model_choice_friendly: params.selectedModel,
          date_deb: params.startDate,
          date_fin: params.endDate,
          index_choice: params.symbol,
          num_days: params.predictionDays,
          ...params.modelParams
        }
      });

      if (!response.data?.predictions_data?.historical_data) {
        throw new Error("Format de données invalide");
      }
  
      setData(response.data.predictions_data);
    } catch (error) {
      console.error("Erreur détaillée:", error);
      setError(error.message || "Une erreur est survenue lors de la récupération des données");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (filterParams) => {
    console.log('Filtres soumis avec paramètres:', filterParams);
    fetchData(filterParams);
  };

  return (
    <div className="space-y-4">
      {/* Un seul filtre pour les deux graphiques */}
      <Filter setIsShow={setIsShow} onSubmit={handleFilterSubmit} />
      
      {loading && (
        <div className="w-full">
          <MainLoader />
        </div>
      )}
      
      {error && (
        <div className="text-red-500 p-4 bg-red-100 rounded">
          Erreur: {error}
        </div>
      )}

      {data && !loading && (
        <div className="space-y-4">
        {/* Top row with two charts side by side */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <AnalysePMM data={data} />
          </div>
          <div className="w-1/2">
            <CandlestickChart data={data} />
          </div>
        </div>
        
        {/* Bottom row with volume analysis */}
        <div className="w-full">
          <VolumeAnalysis data={data} />
        </div>
      </div>
      )}
    </div>
  );
};

export default memo(AnalysePM);