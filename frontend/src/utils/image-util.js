const getImageURL = (name) => {
  const basePath = new URL(`../assets/images/titres_pics/`, import.meta.url)
    .href;
  console.log(
    "IMAGE URL",
    name,
    new URL(`../assets/images/titres_pics/`, import.meta.url)
  );
  return `${basePath}/${name}`;
};

export { getImageURL };
