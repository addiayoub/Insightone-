import React, { useState } from "react";
import { BadgeHelp  } from "lucide-react";
import AccordionBox from "../Ui/AccordionBox";
import SingleSelect from "../SingleSelect";
import { SearchButton } from "../Ui/Buttons";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { Slider } from "@mui/material";
import { symboles, objectif, modelOptions } from "./Symboles";

const Tooltip1 = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      {isVisible && (
        <div className="absolute z-50 p-4 text-sm text-white bg-gray-800 rounded shadow-lg w-[400px]  bottom-full mb-2 left-0">
          <div className="whitespace-normal ">
            {text}
          </div>
        </div>
      )}
      <div
        className="inline-flex items-center cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        <BadgeHelp className="w-5 h-5 ml-2 text-gray-500" />
      </div>
    </div>
  );
};

const Tooltip2 = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      {isVisible && (
        <div className="absolute p-4 z-50 text-sm text-white bg-gray-800 rounded shadow-lg w-[800px] bottom-full mb-2 left-0">
          <div className="whitespace-normal ">
            {text}
          </div>
          <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      )}
      <div
        className="inline-flex cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        <BadgeHelp className="w-5 h-5 ml-2 text-gray-500" />
      </div>
    </div>
  );
};
const Filter = ({ setIsShow, onSubmit }) => {
  const [selectedModel, setSelectedModel] = useState("Modèles pré-définis");
  const [symbol, setSymbol] = useState("ADH");
  const [predictionDays, setPredictionDays] = useState(7);
  const [startDate, setStartDate] = useState(dayjs('2020-02-19'));
  const [endDate, setEndDate] = useState(dayjs());
  const [modelParams, setModelParams] = useState({
    lstm_units: 100,
    lstm_epochs: 10,
    lstm_batch_size: 32,
    objective: "reg:squarederror",
    n_estimators: 100,
    learning_rate: 0.1,
    max_depth: 3,
    subsample: 1,
    colsample_bytree: 1,
    gru_units: 100,
    gru_epochs: 10,
    gru_batch_size: 32,
    changepoint_prior_scale: 0.05,
    seasonality_prior_scale: 10,
    holidays_prior_scale: 10,
    seasonality_mode: "additive"
  });

  const [lastSubmittedValues, setLastSubmittedValues] = useState(null);

  const handleModelParamsChange = (newParams) => {
    setModelParams({ ...modelParams, ...newParams });
  };

  const handleSearch = () => {
    const currentValues = {
      selectedModel,
      symbol,
      predictionDays,
      startDate: startDate.format("DD/MM/YYYY"),
      endDate: endDate.format("DD/MM/YYYY"),
      modelParams
    };
    setLastSubmittedValues(currentValues);
    onSubmit(currentValues);
  };

  const renderModelParams = () => {
    switch (selectedModel) {
      case 'Nouveau modèle LSTM':
        return (
          <div className="space-y-4">
            <div>
              <Tooltip2 text="Indiquez le nombre d'unités de mémoire à utiliser dans le modèle LSTM. Plus le nombre est élevé, plus le modèle aura de capacité à apprendre des motifs complexes dans les données, mais cela peut également augmenter le temps d'entraînement et le risque de surapprentissage si le nombre est trop élevé pour le jeu de données.">
                <label className="block text-sm font-medium mb-2">
                Entrez le nombre d'unités LSTM: {modelParams.lstm_units}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.lstm_units}
                onChange={(_, value) => handleModelParamsChange({ lstm_units: value })}
                min={1}
                max={500}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez le nombre d'époques d'entraînement pour le modèle LSTM. Une époque correspond à une itération complète sur l'ensemble des données d'entraînement. Plus le nombre d'époques est élevé, plus le modèle aura l'opportunité d'apprendre des motifs complexes dans les données, mais cela peut également augmenter le temps d'entraînement et le risque de surapprentissage.">
                <label className="block text-sm font-medium mb-2">
                Entrez le nombre d'époques LSTM : {modelParams.lstm_epochs}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.lstm_epochs}
                onChange={(_, value) => handleModelParamsChange({ lstm_epochs: value })}
                min={1}
                max={100}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez la taille du lot (batch size) à utiliser lors de l'entraînement du modèle LSTM. Le lot est le nombre d'échantillons utilisés dans une seule itération d'entraînement. Une taille de lot optimale dépend souvent de la taille du jeu de données et des ressources disponibles. Pour de nombreux jeux de données, des valeurs courantes de taille de lot se situent entre 32 et 256.">
                <label className="block text-sm font-medium mb-2">
                Entrez la taille du lot LSTM : {modelParams.lstm_batch_size}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.lstm_batch_size}
                onChange={(_, value) => handleModelParamsChange({ lstm_batch_size: value })}
                min={1}
                max={256}
                step={1}
              />
            </div>
          </div>
        );

      case 'Modèle XGBoost':
        return (
          <div className="space-y-4">
            <div>
              <Tooltip2 text="Indiquez l'objectif de la tâche d'apprentissage pour le modèle XGBoost. L'objectif définit la fonction de perte à optimiser lors de l'entraînement du modèle. Par exemple, pour une tâche de régression, l'objectif peut être 'reg
                ', tandis que pour une tâche de classification binaire, il peut être 'binary
                '. Veuillez vous référer à la documentation XGBoost pour choisir l'objectif approprié en fonction de votre problème de modélisation spécifique.">
                <label className="block text-sm font-medium mb-2">
                Choisissez l'objectif du modèle XGBoost : {modelParams.objective}
                </label>
              </Tooltip2>
              <SingleSelect
                options={objectif}
                value={modelParams.objective}
                setValue={(value) => handleModelParamsChange({ objective: value })}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez le nombre d'estimateurs à utiliser dans le modèle XGBoost. Le nombre d'estimateurs correspond au nombre d'arbres à entraîner dans le modèle. Une valeur plus élevée peut conduire à un modèle plus complexe, mais peut également augmenter le risque de surapprentissage si elle est trop élevée.">
                <label className="block text-sm font-medium mb-2">
                Entrez le nombre d'estimateurs : {modelParams.n_estimators}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.n_estimators}
                onChange={(_, value) => handleModelParamsChange({ n_estimators: value })}
                min={1}
                max={1000}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez le taux d'apprentissage à utiliser dans le modèle XGBoost. Le taux d'apprentissage contrôle la contribution de chaque arbre à la mise à jour du modèle lors de l'entraînement. Une valeur plus basse peut conduire à une convergence plus lente mais plus stable, tandis qu'une valeur plus élevée peut accélérer la convergence mais augmenter le risque de surapprentissage.">
                <label className="block text-sm font-medium mb-2">
                Entrez le taux d'apprentissage : {modelParams.learning_rate}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.learning_rate * 100}
                onChange={(_, value) => handleModelParamsChange({ learning_rate: value / 100 })}
                min={1}
                max={100}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez la profondeur maximale des arbres à utiliser dans le modèle XGBoost. La profondeur maximale contrôle la profondeur maximale de chaque arbre de décision dans l'ensemble de modèles. Une valeur plus élevée peut conduire à un modèle plus complexe, mais peut également augmenter le risque de surapprentissage.">
                <label className="block text-sm font-medium mb-2">
                Entrez la profondeur maximale : {modelParams.max_depth}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.max_depth}
                onChange={(_, value) => handleModelParamsChange({ max_depth: value })}
                min={1}
                max={10}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez le sous-échantillonnage à utiliser dans le modèle XGBoost. Le sous-échantillonnage contrôle la proportion des échantillons à utiliser lors de la construction de chaque arbre. Une valeur inférieure à 1.0 indique le pourcentage des échantillons à utiliser. Une valeur de 1.0 signifie utiliser tous les échantillons.">
                <label className="block text-sm font-medium mb-2">
                Entrez le sous-échantillonnage : {modelParams.subsample}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.subsample * 100}
                onChange={(_, value) => handleModelParamsChange({ subsample: value / 100 })}
                min={10}
                max={100}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez le sous-échantillonnage par arbre à utiliser dans le modèle XGBoost. Le sous-échantillonnage par arbre contrôle la proportion des colonnes à utiliser lors de la construction de chaque arbre. Une valeur inférieure à 1.0 indique le pourcentage des colonnes à utiliser. Une valeur de 1.0 signifie utiliser toutes les colonnes.">
                <label className="block text-sm font-medium mb-2">
                Entrez le sous-échantillonnage par arbre : {modelParams.colsample_bytree}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.colsample_bytree * 100}
                onChange={(_, value) => handleModelParamsChange({ colsample_bytree: value / 100 })}
                min={10}
                max={100}
                step={1}
              />
            </div>
          </div>
        );

      case 'Modèle GRU':
        return (
          <div className="space-y-4">
            <div>
              <Tooltip2 text="Indiquez le nombre d'unités de mémoire à utiliser dans le modèle GRU. Plus le nombre est élevé, plus le modèle aura de capacité à apprendre des motifs complexes dans les données, mais cela peut également augmenter le temps d'entraînement et le risque de surapprentissage si le nombre est trop élevé pour le jeu de données.">
                <label className="block text-sm font-medium mb-2">
                Entrez le nombre d'unités dans le modèle GRU : {modelParams.gru_units}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.gru_units}
                onChange={(_, value) => handleModelParamsChange({ gru_units: value })}
                min={1}
                max={500}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez le nombre d'époques d'entraînement pour le modèle GRU. Une époque correspond à une itération complète sur l'ensemble des données d'entraînement. Plus le nombre d'époques est élevé, plus le modèle aura l'opportunité d'apprendre des motifs complexes dans les données, mais cela peut également augmenter le temps d'entraînement et le risque de surapprentissage.">
                <label className="block text-sm font-medium mb-2">
                Entrez le nombre d'époques d'entraînement pour le modèle GRU : {modelParams.gru_epochs}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.gru_epochs}
                onChange={(_, value) => handleModelParamsChange({ gru_epochs: value })}
                min={1}
                max={100}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez la taille du lot (batch size) à utiliser lors de l'entraînement du modèle GRU . Le lot est le nombre d'échantillons utilisés dans une seule itération d'entraînement. Une taille de lot optimale dépend souvent de la taille du jeu de données et des ressources disponibles. Pour de nombreux jeux de données, des valeurs courantes de taille de lot se situent entre 32 et 256.">
                <label className="block text-sm font-medium mb-2">
                Entrez la taille du lot pour l'entraînement du modèle GRU : {modelParams.gru_batch_size}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.gru_batch_size}
                onChange={(_, value) => handleModelParamsChange({ gru_batch_size: value })}
                min={1}
                max={256}
                step={1}
              />
            </div>
          </div>
        );

      case 'Modèle Prophet':
        return (
          <div className="space-y-4">
            <div>
              <Tooltip2 text="Indiquez l'échelle de priorité du changement à utiliser dans le modèle Prophet. Cette valeur contrôle la souplesse du modèle dans la détection des changements dans la tendance. Une valeur plus élevée rendra le modèle plus flexible pour détecter les changements, tandis qu'une valeur plus basse le rendra plus conservateur.">
                <label className="block text-sm font-medium mb-2">
                Entrez l'échelle de priorité du changement : {modelParams.changepoint_prior_scale}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.changepoint_prior_scale * 100}
                onChange={(_, value) => handleModelParamsChange({ changepoint_prior_scale: value / 100 })}
                min={1}
                max={100}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez l'échelle de priorité de saisonnalité à utiliser dans le modèle Prophet. Cette valeur contrôle l'ampleur de la saisonnalité dans le modèle. Une valeur plus élevée rendra le modèle plus flexible pour capturer les variations saisonnières, tandis qu'une valeur plus basse le rendra plus conservateur.">
                <label className="block text-sm font-medium mb-2">
                Entrez l'échelle de priorité de saisonnalité : {modelParams.seasonality_prior_scale}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.seasonality_prior_scale}
                onChange={(_, value) => handleModelParamsChange({ seasonality_prior_scale: value })}
                min={1}
                max={20}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez l'échelle de priorité des vacances à utiliser dans le modèle Prophet. Cette valeur contrôle l'impact des vacances sur les prédictions du modèle. Une valeur plus élevée accordera plus de poids aux vacances dans les prédictions, tandis qu'une valeur plus basse les négligera davantage.">
                <label className="block text-sm font-medium mb-2">
                Entrez l'échelle de priorité des vacances : {modelParams.holidays_prior_scale}
                </label>
              </Tooltip2>
              <Slider
                value={modelParams.holidays_prior_scale}
                onChange={(_, value) => handleModelParamsChange({ holidays_prior_scale: value })}
                min={1}
                max={20}
                step={1}
              />
            </div>
            <div>
              <Tooltip2 text="Indiquez le mode de saisonnalité à utiliser dans le modèle Prophet. Le mode additive est approprié lorsque la saisonnalité reste constante indépendamment du niveau des données, tandis que le mode multiplicatif est approprié lorsque la saisonnalité varie proportionnellement au niveau des données.">
                <label className="block text-sm font-medium mb-2">
                Choisissez le mode de saisonnalité : {modelParams.seasonality_mode}
                </label>
              </Tooltip2>
              <SingleSelect
                options={["additive", "multiplicative"]}
                value={modelParams.seasonality_mode}
                setValue={(value) => handleModelParamsChange({ seasonality_mode: value })}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <AccordionBox
      isExpanded
      title="Filtre"
      detailsClass="space-y-4"
    >
      <div className="flex gap-4 flex-wrap">
        <div>
          <Tooltip1 text="Sélectionnez le modèle que vous souhaitez utiliser pour effectuer la prédiction.">
            <SingleSelect 
              options={modelOptions}
              value={selectedModel}
              setValue={setSelectedModel}
              label="Choisissez le modèle"
            />
          </Tooltip1>
        </div>

        <div>
          <Tooltip1 text="Sélectionnez le symbole du titre sur lequel vous souhaitez effectuer la prédiction.">
            <SingleSelect 
              options={symboles}
              value={symbol}
              setValue={setSymbol}
              label="Choisissez le symbole"
            />
          </Tooltip1>
        </div>

        <div className="flex-1 min-w-[200px]">
          <Tooltip1 text="Indiquez le nombre de jours sur lesquels vous souhaitez effectuer la prédiction.">
            <label className="block text-sm mb-1">
              Nombre de jours: {predictionDays}
            </label>
          </Tooltip1>
          <Slider
            value={predictionDays}
            onChange={(_, value) => setPredictionDays(value)}
            min={1}
            max={20}
            step={1}
          />
        </div>

        <div>
          <Tooltip1 text="Date de début de la période d'entraînement">
            <DateComponent label="Date début" date={startDate} setDate={setStartDate} />
          </Tooltip1>
        </div>

        <div>
          <Tooltip1 text="Date de fin de la période d'entraînement">
            <DateComponent label="Date Fin" date={endDate} setDate={setEndDate} />
          </Tooltip1>
        </div>
      </div>

      {renderModelParams()}

      <SearchButton 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        onClick={handleSearch}
      >
        <span>Envoyer</span>
      </SearchButton>
    </AccordionBox>
  );
};

export default Filter;