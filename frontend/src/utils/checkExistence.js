export default function checkExistence(selectedChoices, contrainteResult) {
  for (let i = 0; i < contrainteResult.length; i++) {
    for (let j = 0; j < selectedChoices.length; j++) {
      if (
        contrainteResult[i].indice === selectedChoices[j].indice &&
        contrainteResult[i].operateur === "="
      ) {
        return true;
      }
    }
  }
  return false;
}
