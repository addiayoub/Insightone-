import React, { useState } from "react";

const SliderComponent = ({ weights, setWeights }) => {
  // Fonction pour gérer le changement de slider
  const handleSliderChange = (index, newValue) => {
    // Calculer la différence entre la nouvelle valeur et l'ancienne valeur du slider modifié
    const difference = newValue - weights[index].value;

    // Calculer la somme des valeurs des autres sliders
    const sumOfOthers = weights.reduce((sum, weight, i) => {
      return i !== index ? sum + weight.value : sum;
    }, 0);

    // Mettre à jour les valeurs des autres sliders
    const newWeights = weights.map((weight, i) => {
      if (i === index) {
        // Mettre à jour le slider qui a changé
        return { ...weight, value: newValue };
      } else {
        // Répartir la différence entre les autres sliders proportionnellement à leur poids actuel
        const newWeightValue =
          weight.value - difference * (weight.value / sumOfOthers);
        return { ...weight, value: Math.max(newWeightValue, 0) }; // Assurez-vous que le poids ne va pas en dessous de 0
      }
    });

    // Ajuster le dernier slider pour corriger toute imprécision due à la division
    const total = newWeights.reduce((sum, weight) => sum + weight.value, 0);
    if (total !== 100) {
      newWeights[newWeights.length - 1].value += 100 - total;
    }

    // Mettre à jour l'état avec les nouveaux poids
    setWeights(newWeights);
  };

  return (
    <div>
      {weights.map((weight, index) => (
        <div key={weight.name}>
          <label>
            {weight.name}: {weight.value.toFixed(2)}
          </label>
          <input
            type="range"
            value={weight.value}
            min="0"
            max="100"
            step="0.01"
            onChange={(e) => handleSliderChange(index, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

const ChangeSecteur = () => {
  // Initialiser l'état avec les poids par défaut
  const [weights, setWeights] = useState([
    { name: "BANK OF AFRICA", value: 28.4 },
    { name: "BCP", value: 23.79 },
    { name: "ATTIJARIWAFA BANK", value: 6.84 },
    // Ajoutez autant d'éléments que nécessaire
  ]);

  return (
    <div>
      <SliderComponent weights={weights} setWeights={setWeights} />
      <button onClick={() => console.log(weights)}>Print Weights</button>
    </div>
  );
};

export default ChangeSecteur;
