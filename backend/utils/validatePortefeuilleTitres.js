function validatePortefeuilleTitres(titresRef, portefeuilles) {
  const invalidTitres = [];
  const titres = titresRef.map((item) => item.TITRE.toLowerCase());
  portefeuilles.forEach((portefeuilleItem) => {
    const { data } = portefeuilleItem;

    data.forEach((item) => {
      const { titre } = item;
      if (!titres.includes(titre.toLowerCase())) {
        invalidTitres.push(titre);
      }
    });
  });

  return { invalidTitres, isValid: invalidTitres.length < 1 };
}

module.exports = validatePortefeuilleTitres;
