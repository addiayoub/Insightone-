import React from "react";

// const basePath = `${window.location.origin}/titres_pics/`;
const basePath = `/src/assets/images/titres_pics/`;

const getImg = (name) => {
  const src = `/src/assets/images/titres_pics/${name}.png`;
  return src;
};

const ArticleImage = ({ name, className }) => {
  return (
    <img
      src={`${getImg(name)}`}
      alt={name}
      loading="lazy"
      onError={(ev) => {
        ev.currentTarget.onerror = null;
        ev.target.src = `${basePath}bourse.webp`;
      }}
      className={`w-full h-full ${className}`}
    />
  );
};

export default ArticleImage;
