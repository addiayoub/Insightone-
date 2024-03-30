import React from "react";

const basePath = `/src/assets/images/titres_logo/`;

const ArticleImage = ({ name, className }) => {
  return (
    <img
      src={`${basePath}${name}`}
      alt={name}
      loading="lazy"
      onError={(ev) => {
        ev.currentTarget.onerror = null;
        ev.target.src = `${basePath}DEFAULT/1.png`;
      }}
      className={`w-full h-full ${className}`}
    />
  );
};

export default ArticleImage;
