import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import AnalysePMM from "./AnalysePMM";
import VolumeAnalysis from "./VolumeAnalysis";
import Filter from "./Filter";
import MainLoader from "../loaders/MainLoader";
import CandlestickChart from "./CandlestickChart";
import BacktestCharts from "./BacktestCharts";
import BacktestTable from "./BacktestTable";
import "./index.css"

const AnalysePM = () => {
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [backtestLoading, setBacktestLoading] = useState(false);
  const [backtestError, setBacktestError] = useState(null);
  const [backtestData, setBacktestData] = useState(null);
  const [backtestImage, setBacktestImage] = useState(null);
  
  const fetchData = async (params) => {
    try {
      setLoading(true);
      setError(null);
      // Réinitialiser les données de backtest lors d'une nouvelle recherche
      setBacktestData(null);
      setBacktestImage(null);
  
      const response = await axios.get(`http://192.168.11.2:30001/PREDICTION/BVC/POST/get_predictions/`, {
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
  
  const handleLaunchBacktest = async () => {
    if (!data || !data.historical_data) {
      console.error("Aucune donnée disponible pour le backtest");
      return;
    }

    try {
      setBacktestLoading(true);
      setBacktestError(null);

      // Extraire les paramètres nécessaires pour l'appel backtest
      const filterParams = {
        model_name: data.model_name || "prophetmodel", // Utiliser le modèle du premier appel
        date_deb: data.params?.date_deb,
        date_fin: data.params?.date_fin,
        index_choice: data.params?.index_choice,
        num_days: data.params?.num_days || 1,
        // Inclure tous les paramètres spécifiques au modèle
        changepoint_prior_scale: data.params?.changepoint_prior_scale || 0.05,
        seasonality_prior_scale: data.params?.seasonality_prior_scale || 10,
        holidays_prior_scale: data.params?.holidays_prior_scale || 10,
        seasonality_mode: data.params?.seasonality_mode || "additive"
      };

      const response = await axios.post(
        'http://192.168.11.2:30001/PREDICTION/BVC/POST/get_backtest/',
        {
          params: filterParams,
          historical_data: data.historical_data
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      // Traiter la réponse pour extraire l'image base64
      const responseData = response.data;
      
      // Stocker l'ensemble des données
      setBacktestData(responseData);
      
      // Extraire et formater l'image base64
      let imageBase64 = null;
      if (responseData.figure) {
        imageBase64 = responseData.figure;
      } else if (responseData.figure_base64) {
        imageBase64 = responseData.figure_base64;
      } else if (responseData.backtest_response && responseData.backtest_response.figure) {
        imageBase64 = responseData.backtest_response.figure;
      }
      
      if (imageBase64) {
        // S'assurer que le préfixe data:image/png;base64, est présent
        if (!imageBase64.startsWith('data:')) {
          imageBase64 = `data:image/png;base64,${imageBase64}`;
        }
        setBacktestImage(imageBase64);
      }
      
      console.log('Données de backtest reçues:', responseData);
    } catch (error) {
      console.error("Erreur lors du backtest:", error);
      setBacktestError(error.message || "Une erreur est survenue lors du backtest");
    } finally {
      setBacktestLoading(false);
    }
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
          
          {/* Bouton de backtest sous le graphique volume */}
          <div className="w-full flex justify-center mt-4">
            <button 
              onClick={handleLaunchBacktest}
              id="butbacktest"
              disabled={backtestLoading}
            >
              {backtestLoading ? 'Chargement...' : 'Lancer le backtest'}
            </button>
          </div>
          
          {/* Affichage du loader pendant le chargement du backtest */}
          {backtestLoading && (
            <div className="w-full">
              <MainLoader />
            </div>
          )}
          
          {/* Affichage des erreurs de backtest */}
          {backtestError && (
            <div className="text-red-500 p-4 bg-red-100 rounded">
              Erreur de backtest: {backtestError}
            </div>
          )}
          
          {/* Nouveaux graphiques du backtest */}
          {backtestData && (
            <BacktestCharts backtestData={backtestData} />
          )}
          
          {/* Résultats de backtest: image à gauche et tableau à droite */}
          {backtestData && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-4">Résultats du Backtest</h3>
              <div className="flex flex-row gap-4">
                {/* Image du backtest à gauche (40% de largeur) */}
                {backtestImage && (
                  <div className="w-2/5 p-4 border rounded">
                    <h4 className="text-lg font-semibold mb-2">Graphique du Backtest</h4>
                    <div className="flex justify-center">
                      <img 
                        src={backtestImage} 
                        alt="Résultat du backtest" 
                        className="w-full border border-gray-300 shadow-md" 
                      />
                    </div>
                  </div>
                )}
                
                {/* Tableau des données de backtest à droite (60% de largeur) */}
                <div className="w-3/5">
                  <BacktestTable backtestData={backtestData} />
                </div>
              </div>
            </div>
          )}
          
          {/* Si aucune image ni données formatées mais des résultats bruts (pour le débogage) */}
          {!backtestImage && !backtestData?.backtest_response?.result_df && backtestData && (
            <div className="mt-4 p-4 border rounded bg-white">
              <h3 className="text-xl font-bold mb-4">Données brutes du Backtest</h3>
              <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
                {JSON.stringify(backtestData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AnalysePM);